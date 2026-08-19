import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { User, Lock, ClipboardCheck, Droplet, Thermometer, Building2 } from "lucide-react";

interface FeatureProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

function Feature({ title, subtitle, icon }: FeatureProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-800 text-green-300">
        {icon}
      </div>
      <h3 className="font-bold text-green-100">{title}</h3>
      <p className="text-xs text-green-300">{subtitle}</p>
    </div>
  );
}

const features = [
  {
    title: "ENSURES DISEASE",
    subtitle: "SURVEILLANCE & PREVENTION",
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
  {
    title: "MANAGES WATER",
    subtitle: "QUALITY & SYSTEMS",
    icon: <Droplet className="h-5 w-5" />,
  },
  {
    title: "MAINTAINS SANITARY",
    subtitle: "STANDARDS & CONTROL",
    icon: <Thermometer className="h-5 w-5" />,
  },
  {
    title: "BUILDS RESILIENT",
    subtitle: "PUBLIC HEALTH",
    icon: <Building2 className="h-5 w-5" />,
  },
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await login(username, password);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      setErrors({ form: err instanceof Error ? err.message : "Login failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F8F5EA] via-[#F4F6EC] to-[#DCEFD6]">
      {/* Top Left Leaves */}
      <svg
        className="absolute top-0 left-0 w-72"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.8">
          <path d="M0 0 C40 20, 80 10, 120 40 C160 70, 200 50, 240 80 C280 110, 300 90, 300 120 L300 0 Z" fill="#15803d" />
          <path d="M0 0 C30 30, 70 40, 110 70 C150 100, 190 80, 230 110 C270 140, 300 130, 300 160 L300 0 Z" fill="#16a34a" />
          <path d="M0 20 C50 50, 100 60, 150 90 C200 120, 250 100, 300 130 L300 0 Z" fill="#22c55e" />
        </g>
      </svg>

      {/* Top Right Leaves */}
      <svg
        className="absolute top-0 right-0 w-72"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.8">
          <path d="M300 0 C260 20, 220 10, 180 40 C140 70, 100 50, 60 80 C20 110, 0 90, 0 120 L0 0 Z" fill="#15803d" />
          <path d="M300 0 C270 30, 230 40, 190 70 C150 100, 110 80, 70 110 C30 140, 0 130, 0 160 L0 0 Z" fill="#16a34a" />
          <path d="M300 20 C250 50, 200 60, 150 90 C100 120, 50 100, 0 130 L0 0 Z" fill="#22c55e" />
        </g>
      </svg>

      {/* Floating Leaves Top Center */}
      <svg
        className="absolute top-8 left-1/2 -translate-x-1/2 w-64"
        viewBox="0 0 400 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="80" cy="40" rx="25" ry="12" fill="#22c55e" opacity="0.7" transform="rotate(-20 80 40)" />
        <ellipse cx="160" cy="30" rx="20" ry="10" fill="#16a34a" opacity="0.6" transform="rotate(10 160 30)" />
        <ellipse cx="240" cy="45" rx="22" ry="11" fill="#22c55e" opacity="0.7" transform="rotate(-15 240 45)" />
        <ellipse cx="320" cy="35" rx="18" ry="9" fill="#16a34a" opacity="0.6" transform="rotate(15 320 35)" />
      </svg>

      {/* Green Ribbons */}
      <div className="absolute top-0 left-0 h-40 w-80 rounded-br-full bg-green-600 opacity-80" />
      <div className="absolute top-0 right-0 h-40 w-80 rounded-bl-full bg-green-600 opacity-80" />

      {/* Header */}
      <div className="relative z-10 pt-16 text-center">
        {/* Logo */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center">
          <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Water droplet */}
            <path d="M32 8 C32 8 16 28 16 40 C16 50.1 23.4 56 32 56 C40.6 56 48 50.1 48 40 C48 28 32 8 32 8 Z" fill="#5E9C3C" opacity="0.9" />
            {/* Leaves */}
            <path d="M20 36 C20 36 12 32 8 36 C4 40 12 44 20 36 Z" fill="#1E5B33" />
            <path d="M44 36 C44 36 52 32 56 36 C60 40 52 44 44 36 Z" fill="#1E5B33" />
            {/* Medical cross */}
            <rect x="28" y="30" width="8" height="14" rx="2" fill="white" />
            <rect x="23" y="35" width="18" height="6" rx="2" fill="white" />
          </svg>
        </div>

        <h1 className="mt-4 text-4xl font-bold text-green-900">
          HEALTH SANITATION MANAGEMENT
        </h1>
      </div>

      {/* Login Card */}
      <div className="relative z-10 mt-8 flex justify-center">
        <div className="relative">
          <div className="absolute -inset-4 blur-3xl bg-green-300/30 rounded-full" />
          <div className="relative w-[360px] rounded-[28px] border border-white/40 bg-white/35 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <h2 className="text-center text-5xl font-semibold text-green-900">
              SANISYSTEM
            </h2>

            <p className="mt-1 text-center text-2xl text-gray-600">
              Welcome Back
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              {errors.form && (
                <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-700">
                  {errors.form}
                </div>
              )}

              {/* Username */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Username</label>
                <div className="flex h-12 items-center rounded-2xl border border-green-500 bg-white px-4 shadow-sm">
                  <User className="h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="your.username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="ml-2 w-full bg-transparent text-base outline-none"
                  />
                </div>
                {errors.username && (
                  <p className="text-left text-xs text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Password</label>
                <div className="flex h-12 items-center rounded-2xl border border-green-500 bg-white px-4 shadow-sm">
                  <Lock className="h-5 w-5 text-gray-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ml-2 w-full bg-transparent text-base outline-none"
                  />
                </div>
                {errors.password && (
                  <p className="text-left text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-500 text-xl font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-4 flex justify-between text-sm text-gray-700">
              <span className="text-green-700">Forgot Password?</span>
              <Link to="/register" className="font-semibold text-green-800 hover:text-green-900">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scenery */}
      <svg
        className="absolute bottom-20 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 200 L0 120 C200 80, 400 140, 600 100 C800 60, 1000 120, 1200 80 C1350 50, 1440 90, 1440 100 L1440 200 Z" fill="#166534" opacity="0.25" />
        <path d="M0 200 L0 150 C300 120, 500 160, 800 130 C1100 100, 1300 140, 1440 120 L1440 200 Z" fill="#15803d" opacity="0.3" />
        <path d="M0 200 L0 170 C400 150, 700 180, 1000 160 C1200 145, 1440 170, 1440 170 L1440 200 Z" fill="#22c55e" opacity="0.25" />
      </svg>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 flex h-24 w-full items-center justify-around bg-green-900 text-white">
        {features.map((item) => (
          <Feature
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}
