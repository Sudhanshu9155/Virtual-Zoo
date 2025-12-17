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
        newPassword
      });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-emerald-100 p-8">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-[0.2em]">
            Final step
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-amber-900">
            Set a new password
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter the OTP you received and choose a strong new password.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              OTP code
            </label>
            <input
              className="w-full rounded-xl border border-amber-200 px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              New password
            </label>
            <input
              className="w-full rounded-xl border border-amber-200 px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              type="password"
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleReset}
            className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition"
          >
            Reset Password
          </button>
        </div>
      </div>
    </section>
  );
}
