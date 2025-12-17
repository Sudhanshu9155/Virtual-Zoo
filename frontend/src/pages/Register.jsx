import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-amber-50 to-sky-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-emerald-100 p-8">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-[0.2em]">
            Join the adventure
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-amber-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Register to unlock quizzes, badges, and immersive virtual tours.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Name
            </label>
            <input
              className="w-full rounded-xl border border-amber-200 px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            className="mt-2 w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-700 font-semibold hover:text-emerald-800"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
