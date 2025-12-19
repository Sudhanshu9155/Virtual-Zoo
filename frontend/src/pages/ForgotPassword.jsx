import { useState } from "react";
import { forgotPassword } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOTP = async () => {
    try {
      await forgotPassword(email);
      alert("OTP sent to your email");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
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
            Recovery
          </div>
          <h2 className="text-3xl font-extrabold text-amber-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your registered email to receive an OTP 🔑
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-[0.18em]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none text-sm bg-emerald-50/20"
            />
          </div>

          <button
            onClick={sendOTP}
            className="w-full mt-3 rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all
              bg-gradient-to-r from-emerald-600 to-amber-600
              hover:from-emerald-700 hover:to-amber-700
              shadow-md hover:shadow-lg"
          >
            Send OTP
          </button>
        </div>
      </div>
    </section>
  );
}
