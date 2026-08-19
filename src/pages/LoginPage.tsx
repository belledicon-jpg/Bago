import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Clipboard,
  Droplets,
  Leaf,
  Building2,
} from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-teal-100 via-emerald-50 to-orange-50">
      {/* Top leafy branches */}
      <div className="absolute top-0 left-0 w-72 h-72 pointer-events-none">
        <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="none">
          <g fill="none" stroke="#065F46" strokeWidth="2" opacity="0.6">
            <path d="M0,0 Q60,40 120,20 T240,60" />
            <path d="M0,0 Q50,60 100,50 T200,100" />
          </g>
          <g fill="#059669" opacity="0.7">
            <ellipse cx="80" cy="40" rx="18" ry="10" transform="rotate(-30 80 40)" />
            <ellipse cx="120" cy="30" rx="16" ry="9" transform="rotate(-15 120 30)" />
            <ellipse cx="160" cy="50" rx="20" ry="11" transform="rotate(10 160 50)" />
            <ellipse cx="100" cy="70" rx="14" ry="8" transform="rotate(-40 100 70)" />
            <ellipse cx="140" cy="80" rx="17" ry="10" transform="rotate(20 140 80)" />
            <ellipse cx="50" cy="60" rx="15" ry="9" transform="rotate(-20 50 60)" />
          </g>
          <g fill="#10B981" opacity="0.6">
            <ellipse cx="70" cy="55" rx="12" ry="7" transform="rotate(15 70 55)" />
            <ellipse cx="110" cy="65" rx="13" ry="7" transform="rotate(-10 110 65)" />
            <ellipse cx="150" cy="45" rx="14" ry="8" transform="rotate(30 150 45)" />
            <ellipse cx="190" cy="70" rx="12" ry="7" transform="rotate(-25 190 70)" />
          </g>
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none">
        <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="none">
          <g fill="none" stroke="#065F46" strokeWidth="2" opacity="0.6">
            <path d="M300,0 Q240,40 180,20 T60,60" />
            <path d="M300,0 Q250,60 200,50 T100,100" />
          </g>
          <g fill="#059669" opacity="0.7">
            <ellipse cx="220" cy="40" rx="18" ry="10" transform="rotate(30 220 40)" />
            <ellipse cx="180" cy="30" rx="16" ry="9" transform="rotate(15 180 30)" />
            <ellipse cx="140" cy="50" rx="20" ry="11" transform="rotate(-10 140 50)" />
            <ellipse cx="200" cy="70" rx="14" ry="8" transform="rotate(40 200 70)" />
            <ellipse cx="160" cy="80" rx="17" ry="10" transform="rotate(-20 160 80)" />
            <ellipse cx="250" cy="60" rx="15" ry="9" transform="rotate(20 250 60)" />
          </g>
          <g fill="#10B981" opacity="0.6">
            <ellipse cx="230" cy="55" rx="12" ry="7" transform="rotate(-15 230 55)" />
            <ellipse cx="190" cy="65" rx="13" ry="7" transform="rotate(10 190 65)" />
            <ellipse cx="150" cy="45" rx="14" ry="8" transform="rotate(-30 150 45)" />
            <ellipse cx="110" cy="70" rx="12" ry="7" transform="rotate(25 110 70)" />
          </g>
        </svg>
      </div>

      {/* Background hills */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 400" className="w-full h-auto" preserveAspectRatio="none">
          <path fill="#6EE7B7" d="M0,250 C200,200 400,280 600,220 C800,160 1000,240 1200,180 C1350,140 1440,200 1440,220 L1440,400 L0,400 Z" />
          <path fill="#34D399" d="M0,280 C300,240 500,300 800,250 C1100,200 1300,280 1440,260 L1440,400 L0,400 Z" />
          <path fill="#10B981" d="M0,320 C400,280 700,340 1000,300 C1200,270 1440,320 1440,320 L1440,400 L0,400 Z" />
          <path fill="#059669" d="M0,360 C400,320 700,380 1000,340 C1200,310 1440,360 1440,360 L1440,400 L0,400 Z" />
        </svg>
      </div>

      {/* Water streams */}
      <div className="absolute bottom-20 left-0 right-0 pointer-events-none opacity-40">
        <svg viewBox="0 0 1440 100" className="w-full h-auto" preserveAspectRatio="none">
          <path fill="#06B6D4" d="M0,20 Q180,0 360,30 T720,20 T1080,40 T1440,20 L1440,80 Q1260,60 1080,80 T720,70 T360,90 T0,70 Z" />
          <path fill="#0891B2" d="M0,50 Q200,30 400,60 T800,50 T1200,70 T1440,50 L1440,100 L0,100 Z" opacity="0.6" />
        </svg>
      </div>

      {/* Simple trees */}
      <div className="absolute bottom-48 left-8 md:left-16 pointer-events-none opacity-80">
        <svg width="60" height="120" viewBox="0 0 60 120">
          <rect x="26" y="60" width="8" height="60" fill="#78350F" />
          <circle cx="30" cy="45" r="25" fill="#059669" />
          <circle cx="20" cy="35" r="18" fill="#10B981" />
          <circle cx="40" cy="35" r="18" fill="#10B981" />
          <circle cx="30" cy="25" r="20" fill="#34D399" />
        </svg>
      </div>
      <div className="absolute bottom-48 right-8 md:right-24 pointer-events-none opacity-80">
        <svg width="50" height="100" viewBox="0 0 50 100">
          <rect x="21" y="50" width="8" height="50" fill="#78350F" />
          <circle cx="25" cy="38" r="22" fill="#059669" />
          <circle cx="16" cy="30" r="15" fill="#10B981" />
          <circle cx="34" cy="30" r="15" fill="#10B981" />
          <circle cx="25" cy="22" r="18" fill="#34D399" />
        </svg>
      </div>
      <div className="absolute bottom-48 left-24 md:left-40 pointer-events-none opacity-60">
        <svg width="40" height="80" viewBox="0 0 40 80">
          <rect x="16" y="40" width="8" height="40" fill="#78350F" />
          <circle cx="20" cy="30" r="18" fill="#059669" />
          <circle cx="12" cy="24" r="12" fill="#10B981" />
          <circle cx="28" cy="24" r="12" fill="#10B981" />
          <circle cx="20" cy="18" r="15" fill="#34D399" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-20 pt-6 px-6 md:px-10 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <circle cx="24" cy="24" r="22" fill="#059669" stroke="#047857" strokeWidth="2" />
            <path d="M24 12 L24 24 L32 32" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="24" cy="12" r="3" fill="white" />
            <path d="M16 20 Q20 16 24 20 Q28 16 32 20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M14 26 Q18 22 22 26 Q26 22 30 26 Q34 22 38 26" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
          </svg>
          <h1 className="text-lg md:text-2xl font-bold text-emerald-950 tracking-wider uppercase leading-tight">
            Health Sanitation Management
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-8" style={{ minHeight: "calc(100vh - 320px)" }}>
        <div className="w-full max-w-md">
          <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border border-white/70 shadow-2xl shadow-emerald-900/10 p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-emerald-800 tracking-wide">SANISYSTEM</h2>
              <p className="text-emerald-600 mt-2 text-lg font-medium">Welcome Back</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-emerald-800 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="your.username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/70 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-emerald-900 placeholder-emerald-300 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500"
                  />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/70 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-emerald-900 placeholder-emerald-300 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-200 text-lg"
              >
                Log In
              </button>

              <div className="flex items-center justify-between text-sm pt-1">
                <Link
                  to="/forgot-password"
                  className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
                <Link
                  to="/signup"
                  className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 bg-emerald-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-emerald-800 rounded-xl flex-shrink-0">
              <Clipboard className="text-emerald-300" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-100 text-sm">Disease Prevention</h3>
              <p className="text-xs text-emerald-300 mt-1 leading-relaxed">
                Ensures Disease Surveillance & Prevention
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-emerald-800 rounded-xl flex-shrink-0">
              <Droplets className="text-emerald-300" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-100 text-sm">Water Quality</h3>
              <p className="text-xs text-emerald-300 mt-1 leading-relaxed">
                Manages Water Quality & Systems
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-emerald-800 rounded-xl flex-shrink-0">
              <Leaf className="text-emerald-300" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-100 text-sm">Sanitation Control</h3>
              <p className="text-xs text-emerald-300 mt-1 leading-relaxed">
                Maintains Sanitary Standards & Control
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-emerald-800 rounded-xl flex-shrink-0">
              <Building2 className="text-emerald-300" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-100 text-sm">Public Infrastructure</h3>
              <p className="text-xs text-emerald-300 mt-1 leading-relaxed">
                Builds Resilient Public Health Infrastructure
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
