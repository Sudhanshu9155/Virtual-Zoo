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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-amber-50 to-emerald-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-100 p-8">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-sky-600 uppercase tracking-[0.2em]">
            Reset access
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-amber-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your registered email and we&apos;ll send you an OTP to reset
            your password.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Registered email
            </label>
            <input
              className="w-full rounded-xl border border-amber-200 px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={sendOTP}
            className="mt-2 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition"
          >
            Send OTP
          </button>
        </div>
      </div>
    </section>
  );
}
