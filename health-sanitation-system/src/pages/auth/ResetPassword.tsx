import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-emerald-700">Health & Sanitation</h1>
          <p className="text-gray-500 mt-1">Reset Password</p>
        </div>

        <div className="py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Not Available</h2>
          <p className="text-gray-500 text-sm">
            The password reset feature is currently disabled. Please contact your administrator for assistance.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-emerald-600 hover:underline font-medium">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
