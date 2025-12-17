import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      // Save token + load user into context
      await login(res.data.token);

      // Go back to the page the user was trying to access, or home
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-emerald-50 to-sky-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-amber-100 p-8">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-[0.2em]">
            Welcome back
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-amber-900">
            Login to Virtual Zoo
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your credentials to explore quizzes and virtual tours.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Email
            </label>
            <input
              className="w-full rounded-xl border border-amber-200 px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Password
            </label>
            <input
              className="w-full rounded-xl border border-amber-200 px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition"
          >
            Login
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <Link
            to="/forgot-password"
            className="text-emerald-700 hover:text-emerald-800 font-medium"
          >
            Forgot Password?
          </Link>
          <p className="text-gray-600">
            New here?{" "}
            <Link
              to="/register"
              className="text-amber-700 font-semibold hover:text-amber-800"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
