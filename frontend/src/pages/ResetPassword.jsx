import { useState } from "react";
import { resetPassword } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    try {
      await resetPassword({
        email: state.email,
        otp,
        newPassword,
      });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 via-emerald-50 to-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-white/95 rounded-3xl shadow-xl p-8 md:p-10 border border-emerald-100 overflow-hidden">

        {/* Decorative Accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-100/60 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center mb-6">
          <div className="inline-flex items-center justify-center mb-3 rounded-2xl bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 uppercase tracking-[0.25em]">
            Reset
          </div>
          <h2 className="text-3xl font-extrabold text-amber-900 mb-2">
            Set New Password
          </h2>
          <p className="text-gray-600 text-sm">
            Enter the OTP and create a strong new password 🔐
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-[0.18em]">
              OTP Code
            </label>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none text-sm bg-emerald-50/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-[0.18em]">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none text-sm bg-emerald-50/20"
            />
          </div>

          <button
            onClick={handleReset}
            className="w-full mt-3 rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all
              bg-gradient-to-r from-emerald-600 to-amber-600
              hover:from-emerald-700 hover:to-amber-700
              shadow-md hover:shadow-lg"
          >
            Reset Password
          </button>
        </div>
      </div>
    </section>
  );
}
