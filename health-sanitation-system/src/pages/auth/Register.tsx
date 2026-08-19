import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await register(name, email, password);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      setErrors({ form: err instanceof Error ? err.message : "Registration failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-emerald-700">Health & Sanitation</h1>
          <p className="text-gray-500 mt-1">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {errors.form && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{errors.form}</div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="John Doe" />
            {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="admin@health.gov" />
            {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="At least 6 characters" />
            {errors.password && <p className="text-red-500 text-xs mt-1" role="alert">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Re-enter your password" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1" role="alert">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-lg font-medium text-white transition bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50">
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-emerald-600 hover:underline font-medium">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

