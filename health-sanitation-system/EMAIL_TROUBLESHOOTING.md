# Email Delivery Troubleshooting Guide
## Health Sanitation Management System

---

## 1. Immediate Diagnosis Checklist

### A. Verify the Backend Is Actually Sending the Email

**Check server logs:**
```bash
# In your backend terminal, look for:
[Password Reset] Reset link for user@example.com: /reset-password?token=...
```

**If you see the log but no email arrives:**  
→ The backend generated the token, but no email was sent. This confirms an email-sending issue, not a user-account issue.

**If you do NOT see the log:**  
→ The request never reached the backend, or the backend rejected it. Check:
- Browser DevTools → Network tab → `/api/auth/forgot-password` response
- Response body for error messages like `"Email is required"` or `"Server error"`

---

### B. Check the Frontend Request Payload

**In DevTools → Network → `/api/auth/forgot-password` → Payload:**
```json
{
  "email": "user@example.com"
}
```

**Common mistakes:**
- Typo in the email field
- Empty email field
- Wrong field name (e.g., sending `username` instead of `email`)

---

### C. Verify the Email Address Exists in the Database

**Check `server/data.json`:**
```json
{
  "users": [
    {
      "id": "...",
      "name": "John Doe",
      "email": "john@health.gov",
      ...
    }
  ]
}
```

**If the email is not in `data.json`:**
- The user registered with a different email
- The backend was restarted and data was lost (should be fixed with persistence)
- The user never completed registration

---

## 2. Common Causes of Email Non-Delivery

### A. Spam Filters (Most Common)

**Symptoms:**
- No delivery error, but email doesn't appear in inbox
- Email appears in spam/junk folder after 1-5 minutes
- Gmail, Outlook, or corporate filters block it

**Why it happens:**
- Sending from `localhost` or a bare IP address
- No SPF/DKIM/DMARC DNS records
- Generic or missing subject line
- High similarity to known spam patterns

**Diagnostic steps:**
1. Ask the user to check **Spam/Junk** folder
2. Check **All Mail** / **Archive** in Gmail
3. Try adding the sender to contacts/safe senders
4. Check Gmail's "Show original" for delivery headers

**Quick test:**
```javascript
// Temporarily log the reset token to the console instead of emailing
// This lets the user copy-paste the link directly
console.log(`[DEV MODE] Reset link: /reset-password?token=${resetToken}`);
res.json({ 
  message: 'Reset link generated (check server console in dev mode)',
  // WARNING: Remove this in production!
  debugToken: resetToken 
});
```

---

### B. Incorrect Email Address

**Symptoms:**
- Backend returns `"If an account with that email exists, a reset link has been sent"`
- No error, but no email arrives

**Why it happens:**
- User registered with `john@health.gov` but requests reset for `john@gmail.com`
- Typo in email during registration
- Case sensitivity issues (backend lowercases emails, but user types differently)

**Diagnostic steps:**
1. Ask the user to verify their registered email:
   ```javascript
   // Add a debug endpoint temporarily
   app.get('/api/auth/debug-users', (req, res) => {
     res.json({ users: users.map(u => ({ id: u.id, email: u.email, name: u.name })) });
   });
   ```
2. Visit `http://localhost:3001/api/auth/debug-users`
3. Confirm the exact email address in the database

---

### C. Server-Side Delays

**Symptoms:**
- Email arrives after 5-30 minutes instead of instantly
- Backend logs show "email sent" immediately

**Why it happens:**
- Using synchronous SMTP in the request handler
- No email queue (mail server overwhelmed)
- DNS resolution delays
- Rate limiting by email provider

**Current implementation problem:**
```javascript
// Current code has NO actual email sending!
// It only logs to console:
console.log(`[Password Reset] Reset link for ${email}: /reset-password?token=${resetToken}`);
```

**Solution:** Integrate a real email service (see Section 4).

---

### D. Development Environment Limitations

**Symptoms:**
- Works on localhost but not in production
- Emails blocked from `localhost`, `127.0.0.1`, or dynamic IPs

**Why it happens:**
- Most email providers (Gmail, Outlook) block emails from unknown/dev IPs
- No reverse DNS (PTR) record for your server
- Sender domain has no SPF/DKIM records

**Solution:** Use a transactional email service (Section 4).

---

## 3. Step-by-Step Troubleshooting Flow

```
User reports: "I didn't receive the reset email"
       |
       v
[1] Check browser DevTools Network tab
       |
       ├─ Request failed (4xx/5xx)?
       │     └─ Fix frontend/backend error first
       |
       └─ Request succeeded (200)?
             |
             v
       [2] Check backend console logs
             |
             ├─ No log entry?
             │     └─ Backend not reached → check proxy/CORS
             |
             └─ Log entry present?
                   |
                   v
             [3] Check server/data.json for user email
                   |
                   ├─ Email not found?
                   │     └─ User registered with different email
                   │
                   └─ Email found?
                         |
                         v
                   [4] Check spam/junk folder
                         |
                         ├─ Found in spam?
                         │     └─ Improve sender reputation (Section 4)
                         |
                         └─ Not in spam?
                               |
                               v
                   [5] Check email service logs
                               |
                               ├─ No email service configured?
                               │     └─ Implement email sending (Section 4)
                               |
                               └─ Service logs show error?
                                     └─ Fix SMTP/API credentials
```

---

## 4. Improving Email Delivery Reliability

### Option A: Use Nodemailer with SMTP (Quick Start)

**Install:**
```bash
npm install nodemailer
```

**Update `server/index.cjs`:**
```javascript
const nodemailer = require('nodemailer');

// Create a transporter using a free SMTP service
// Option 1: Gmail (less secure, for testing only)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // Use App Password, not regular password
  }
});

// Option 2: Ethereal Email (free, fake SMTP for testing)
// Visit https://ethereal.email to create a test account
const testAccount = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass
  }
});

async function sendResetEmail(toEmail, resetLink) {
  try {
    const info = await transporter.sendMail({
      from: '"Health Sanitation System" <noreply@health.gov>',
      to: toEmail,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #15803d;">Health Sanitation Management</h2>
          <p>You requested a password reset. Click the link below:</p>
          <a href="${resetLink}" style="background: #15803d; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
            Reset Password
          </a>
          <p style="color: #666; font-size: 12px;">This link expires in 1 hour.</p>
        </div>
      `
    });
    console.log(`[Email] Reset email sent to ${toEmail}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`[Email] Failed to send to ${toEmail}:`, error);
    return false;
  }
}
```

**Update the forgot-password route:**
```javascript
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const user = getUserByEmail(email);
    const resetToken = jwt.sign(
      { id: user ? user.id : 'guest', email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    resetTokens.push({ token: resetToken, email, createdAt: Date.now() });
    saveData();

    const resetLink = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`;
    
    // Send email
    const emailSent = await sendResetEmail(email, resetLink);
    
    if (!emailSent) {
      console.error(`[Email] Failed to send reset email to ${email}`);
    }

    console.log(`[Password Reset] Reset link for ${email}: ${resetLink}`);
    res.json({ 
      message: 'If an account with that email exists, a reset link has been sent.' 
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
```

---

### Option B: Use a Transactional Email Service (Production-Ready)

**Recommended services:**
- **SendGrid** (free tier: 100 emails/day)
- **Mailgun** (free tier: 5,000 emails/month)
- **AWS SES** (free tier: 62,000 emails/month)
- **Postmark** (free tier: 100 emails/month)

**Example with SendGrid:**
```bash
npm install @sendgrid/mail
```

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendResetEmail(toEmail, resetLink) {
  try {
    await sgMail.send({
      from: 'noreply@health.gov',
      to: toEmail,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });
    return true;
  } catch (error) {
    console.error('SendGrid error:', error);
    return false;
  }
}
```

---

## 5. Best Practices for Email Security

### A. Token Security

**Current implementation:**
```javascript
const resetToken = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: '1h' });
```

**Improvements:**
1. **Short expiration**: Already set to 1 hour ✓
2. **Single-use tokens**: Implemented (token removed after use) ✓
3. **Store hashed tokens**: In production, hash tokens before storing:
   ```javascript
   const crypto = require('crypto');
   const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
   resetTokens.push({ tokenHash, email, createdAt: Date.now() });
   ```

### B. Rate Limiting

**Prevent abuse:**
```javascript
const rateLimit = require('express-rate-limit');

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 requests per window
  message: { message: 'Too many reset attempts. Try again later.' }
});

app.post('/api/auth/forgot-password', resetLimiter, async (req, res) => {
  // ... existing code
});
```

### C. Email Verification on Signup

**Add email verification during registration:**
```javascript
// Generate verification token
const verifyToken = jwt.sign(
  { id: user.id, email: user.email, purpose: 'email-verification' },
  JWT_SECRET,
  { expiresIn: '24h' }
);

// Send verification email
await sendVerificationEmail(user.email, verifyToken);

// Store pending users separately
pendingUsers.push({ ...user, verifyToken, verified: false });
```

### D. Prevent Enumeration Attacks

**Current response is already good:**
```javascript
res.json({ 
  message: 'If an account with that email exists, a reset link has been sent.' 
});
```

This doesn't reveal whether an email exists in the system ✓

### E. Audit Logging

**Track password reset attempts:**
```javascript
const auditLog = [];

function logEvent(event, details) {
  auditLog.push({
    event,
    details,
    timestamp: new Date().toISOString(),
    ip: req.ip
  });
  saveData(); // Persist to data.json
}

// Usage:
logEvent('PASSWORD_RESET_REQUESTED', { email });
logEvent('PASSWORD_RESET_SUCCESS', { userId: user.id });
```

---

## 6. Quick Diagnostic Commands

### Check if backend is running:
```bash
curl http://localhost:3001/api/auth/me -H "Authorization: Bearer YOUR_TOKEN"
```

### Test forgot-password endpoint:
```bash
curl -X POST http://localhost:3001/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### List all registered users (debug only - remove in production):
```bash
curl http://localhost:3001/api/auth/debug-users
```

### Check backend logs:
Look for:
- `[Password Reset] Reset link for ...`
- `[Email] Reset email sent to ...`
- `[Email] Failed to send to ...`

---

## 7. Production Checklist

Before deploying to production:

- [ ] Replace `console.log` email sending with real SMTP/API
- [ ] Use environment variables for email credentials
- [ ] Set up SPF/DKIM/DMARC DNS records for your domain
- [ ] Use a dedicated transactional email service (SendGrid, Mailgun, AWS SES)
- [ ] Implement rate limiting on `/forgot-password` endpoint
- [ ] Add email verification on signup
- [ ] Hash reset tokens before storing in database
- [ ] Set up monitoring/alerts for email delivery failures
- [ ] Test email delivery across major providers (Gmail, Outlook, Yahoo)
- [ ] Add fallback message if email fails: "If you don't receive the email within 5 minutes, check your spam folder or contact support."

---

## 8. Testing Email Locally (Dev Mode)

### Use Ethereal Email (Fake SMTP):
```javascript
// Visit https://ethereal.email
// Create a test account, copy credentials
const testAccount = await nodemailer.createTestAccount({
  user: 'your-ethereal-user',
  pass: 'your-ethereal-pass'
});
```

### Use Mailcatcher (Local SMTP server):
```bash
# Install
gem install mailcatcher

# Run
mailcatcher

# View emails at http://localhost:1080
```

### Log to console (Development only):
```javascript
app.post('/api/auth/forgot-password', (req, res) => {
  console.log('=== PASSWORD RESET REQUEST ===');
  console.log('Email:', req.body.email);
  console.log('Reset Link:', `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`);
  console.log('===============================');
  res.json({ message: 'Check server console for reset link (dev mode)' });
});
```

---

## Summary

The most likely cause of your email issues is:
1. **No email service configured** (backend only logs to console)
2. **User registered with different email** than expected
3. **Backend restarted** and data was lost (fixed with persistence)

**Immediate actions:**
1. Check `server/data.json` for the user's email
2. Check backend console for reset token logs
3. Implement Nodemailer or SendGrid for actual email sending
4. Test with a known-good email address
