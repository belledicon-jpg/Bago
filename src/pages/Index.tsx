import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Hospital, ClipboardCheck, Syringe, Droplets, Activity, Building2 } from "lucide-react";

const features = [
  {
    icon: Hospital,
    title: "Health Center Services",
    description: "Digital patient records, appointments, consultations, and healthcare management.",
    gradient: "from-emerald-500/10 to-green-500/10",
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: ClipboardCheck,
    title: "Sanitation Permit & Inspection",
    description: "Online permit applications, inspections, compliance monitoring, and approvals.",
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconBg: "bg-blue-100 text-blue-700",
  },
  {
    icon: Syringe,
    title: "Immunization & Nutrition Tracker",
    description: "Vaccination scheduling, nutrition monitoring, and growth tracking programs.",
    gradient: "from-violet-500/10 to-purple-500/10",
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    icon: Droplets,
    title: "Wastewater & Septic Services",
    description: "Septic service requests, wastewater monitoring, and environmental sanitation management.",
    gradient: "from-teal-500/10 to-cyan-500/10",
    iconBg: "bg-teal-100 text-teal-700",
  },
  {
    icon: Activity,
    title: "Health Surveillance System",
    description: "Disease monitoring, outbreak tracking, public health alerts, and epidemiological reporting.",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-100 text-amber-700",
  },
  {
    icon: Building2,
    title: "Multi-Department Integration",
    description: "Integrated collaboration between Health Office, Sanitation Office, RHU, and Barangay Health Workers.",
    gradient: "from-rose-500/10 to-pink-500/10",
    iconBg: "bg-rose-100 text-rose-700",
  },
];

const stats = [
  { value: "50K+", label: "Patients Served" },
  { value: "80K+", label: "Immunizations Recorded" },
  { value: "12K+", label: "Sanitation Permits Processed" },
  { value: "24/7", label: "Disease Monitoring" },
];

function FloatingShape({ delay, duration, size, left, top, color }: { delay: number; duration: number; size: number; left: string; top: string; color: string }) {
  return (
    <div
      className="absolute rounded-full opacity-60 pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100" />
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #059669 1px, transparent 1px), linear-gradient(to bottom, #059669 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {mounted && (
        <>
          <FloatingShape delay={0} duration={6} size={300} left="10%" top="20%" color="rgba(16, 185, 129, 0.15)" />
          <FloatingShape delay={1} duration={8} size={400} left="70%" top="10%" color="rgba(20, 184, 166, 0.12)" />
          <FloatingShape delay={2} duration={7} size={250} left="50%" top="60%" color="rgba(132, 204, 22, 0.1)" />
          <FloatingShape delay={3} duration={9} size={350} left="20%" top="70%" color="rgba(16, 185, 129, 0.1)" />
        </>
      )}

      <header className="relative z-20 pt-6 pb-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-700 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c4.97 0 9-4.03 9-9-4.5 0-9-6.5-9-13-4.5 6.5-9 13-9 13 0 4.97 4.03 9 9 9z" />
                <path d="M12 6v12M8 10l4-4 4 4" />
              </svg>
            </div>
            <span className="text-lg font-bold text-emerald-900 tracking-tight">HealthGuard</span>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full hover:bg-emerald-100 transition-colors"
          >
            Staff Portal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Municipal Health & Sanitation Platform
            </div>
          </div>

          <div className="text-center mb-12">
            <h1
              className="font-semibold text-gray-900 tracking-tight mb-5"
              style={{
                fontSize: "clamp(30px, 5vw, 60px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Smarter Healthcare & Sanitation{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                for Every Community
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Digital platform for health services, sanitation permits, immunization tracking,
              wastewater management, and disease surveillance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 text-white font-medium rounded-2xl hover:bg-emerald-800 transition-colors shadow-xl shadow-emerald-200 text-base"
                style={{ minHeight: "56px" }}
              >
                Access Public Portal
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-medium rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors text-base"
                style={{ minHeight: "56px" }}
              >
                Staff Portal Login
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group relative bg-gradient-to-br ${feature.gradient} rounded-2xl border border-gray-200/80 p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className={`w-10 h-10 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 shadow-sm`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/60">
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-gray-200/60 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-700 rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c4.97 0 9-4.03 9-9-4.5 0-9-6.5-9-13-4.5 6.5-9 13-9 13 0 4.97 4.03 9 9 9z" />
                <path d="M12 6v12M8 10l4-4 4 4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">HealthGuard</span>
          </div>
          <p className="text-xs text-gray-500">© 2026 Health & Sanitation Management System. Secure Municipal Healthcare Platform.</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
