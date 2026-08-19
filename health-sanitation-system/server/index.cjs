const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'health-sanitation-super-secret-key-2024';
const DATA_FILE = path.join(__dirname, 'data.json');
const CODE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const RESET_TOKEN_EXPIRY = '15m';

// Email configuration
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.ethereal.email';
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587', 10);
const EMAIL_SECURE = process.env.EMAIL_SECURE === 'true';
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Health Sanitation System <noreply@health.gov>';
const DEV_MODE = process.env.NODE_ENV !== 'production';

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

let transporter = null;

async function initEmail() {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log('[Email] No credentials configured. Running in console-log mode.');
    return;
  }

  try {
    transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_SECURE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const verified = await transporter.verify();
    if (verified) {
      console.log('[Email] Transporter verified successfully');
    }
  } catch (error) {
    console.error('[Email] Failed to initialize transporter:', error.message);
    transporter = null;
  }
}

async function sendEmail(to, subject, html) {
  if (!transporter) {
    console.log(`[Email][DEV MODE] To: ${to}`);
    console.log(`[Email][DEV MODE] Subject: ${subject}`);
    console.log(`[Email][DEV MODE] Body: ${html.replace(/<[^>]+>/g, '').trim()}`);
    return true;
  }

  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });
    console.log(`[Email] Sent to ${to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`[Email] Failed to send to ${to}:`, error.message);
    return false;
  }
}

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const data = JSON.parse(raw);
      return {
        users: data.users || [],
        verificationCodes: data.verificationCodes || [],
        resetTokens: data.resetTokens || [],
      };
    }
  } catch {
    // ignore corrupt file
  }
  return { users: [], verificationCodes: [], resetTokens: [] };
}

function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ users, verificationCodes, resetTokens }, null, 2));
  } catch {
    // ignore write errors
  }
}

const initial = loadData();
let users = initial.users;
let verificationCodes = initial.verificationCodes;
let resetTokens = initial.resetTokens;

function generateId() {
  return Date.now().toString(36) + crypto.randomBytes(6).toString('hex');
}

function getUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function generateVerificationCode() {
  return crypto.randomInt(100000, 999999).toString();
}

function getValidCode(email, code) {
  const now = Date.now();
  return verificationCodes.find(
    (vc) =>
      vc.email.toLowerCase() === email.toLowerCase() &&
      vc.code === code &&
      vc.expiresAt > now &&
      !vc.used
  );
}

function cleanupExpiredCodes() {
  const now = Date.now();
  const before = verificationCodes.length;
  verificationCodes = verificationCodes.filter((vc) => vc.expiresAt > now && !vc.used);
  if (verificationCodes.length !== before) {
    saveData();
  }
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (getUserByEmail(email)) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: generateId(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveData();

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  res.status(503).json({ message: 'Password reset is currently disabled' });
});

app.post('/api/auth/verify-code', async (req, res) => {
  res.status(503).json({ message: 'Password reset is currently disabled' });
});

app.post('/api/auth/reset-password', async (req, res) => {
  res.status(503).json({ message: 'Password reset is currently disabled' });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

// Debug endpoint - remove in production
app.get('/api/auth/debug-users', (req, res) => {
  res.json({
    count: users.length,
    users: users.map((u) => ({ id: u.id, name: u.name, email: u.email })),
  });
});

app.listen(PORT, async () => {
  await initEmail();
  console.log(`Server running on http://localhost:${PORT}`);
});
