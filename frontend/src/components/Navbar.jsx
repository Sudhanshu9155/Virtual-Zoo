// frontend/src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100/60 shadow-[0_4px_12px_rgba(15,118,110,0.08)]">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-4 md:px-0">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-amber-900 font-extrabold tracking-wide text-lg md:text-xl"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-2xl">
            🦁
          </span>
          <span>Virtual Zoo</span>
        </NavLink>

        <ul className="hidden md:flex gap-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-900">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                (isActive
                  ? "text-emerald-700"
                  : "text-amber-900 hover:text-emerald-700") +
                " pb-1 border-b-2 " +
                (isActive ? "border-emerald-600" : "border-transparent hover:border-emerald-400")
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                (isActive
                  ? "text-emerald-700"
                  : "text-amber-900 hover:text-emerald-700") +
                " pb-1 border-b-2 " +
                (isActive ? "border-emerald-600" : "border-transparent hover:border-emerald-400")
              }
            >
              Animals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tour"
              className={({ isActive }) =>
                (isActive
                  ? "text-emerald-700"
                  : "text-amber-900 hover:text-emerald-700") +
                " pb-1 border-b-2 " +
                (isActive ? "border-emerald-600" : "border-transparent hover:border-emerald-400")
              }
            >
              Virtual Tour
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/quiz-categories"
              className={({ isActive }) =>
                (isActive
                  ? "text-emerald-700"
                  : "text-amber-900 hover:text-emerald-700") +
                " pb-1 border-b-2 " +
                (isActive ? "border-emerald-600" : "border-transparent hover:border-emerald-400")
              }
            >
              Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                (isActive
                  ? "text-emerald-700"
                  : "text-amber-900 hover:text-emerald-700") +
                " pb-1 border-b-2 " +
                (isActive ? "border-emerald-600" : "border-transparent hover:border-emerald-400")
              }
            >
              Feedback
            </NavLink>
          </li>

          <li>
            {user ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/profile"
                  className="hidden sm:inline-flex items-center gap-2 text-amber-900 hover:text-emerald-700 text-xs"
                >
                  <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-semibold">
                    {(user.name || user.email || "?")
                      .toString()
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                  <span>Hi, {user.name || user.email}</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-emerald-600 text-white px-4 py-1.5 text-xs font-semibold shadow-sm hover:bg-emerald-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="rounded-full bg-amber-900 text-white px-4 py-1.5 text-xs font-semibold shadow-sm hover:bg-amber-800"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>

        <button
          className="md:hidden text-2xl text-amber-900 border border-amber-200 rounded-lg px-2 py-1 bg-white/80"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <ul className="md:hidden bg-white/95 backdrop-blur-md shadow-xl flex flex-col gap-3 px-6 py-5 text-amber-900 text-xs font-semibold uppercase tracking-[0.18em] border-t border-emerald-100">
          <li>
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" onClick={() => setOpen(false)}>
              Animals
            </NavLink>
          </li>
          <li>
            <NavLink to="/tour" onClick={() => setOpen(false)}>
              Virtual Tour
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz-categories" onClick={() => setOpen(false)}>
              Quiz
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" onClick={() => setOpen(false)}>
              Feedback
            </NavLink>
          </li>
          <li className="pt-2">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full w-full text-xs font-semibold"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-amber-900 text-white px-4 py-2 rounded-full w-full text-xs font-semibold text-center inline-block"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
