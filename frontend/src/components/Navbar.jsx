// frontend/src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const navigate = useNavigate();

  useEffect(() => {
    function onStorage() {
      setUser(JSON.parse(localStorage.getItem('user') || 'null'));
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-amber-50 shadow-sm sticky top-0 z-50 border-b border-amber-200">
      <div className="container mx-auto flex justify-between items-center py-4 px-8">
        <NavLink to="/" className="text-2xl font-bold tracking-wide flex items-center gap-2 text-amber-900">🦁 Virtual Zoo</NavLink>

        <ul className="hidden md:flex gap-8 font-semibold text-sm uppercase tracking-wider">
          <li><NavLink to="/" className={({isActive}) => isActive ? "text-orange-600 border-b-2 border-orange-600 pb-1" : "text-amber-900 hover:text-orange-600"}>Home</NavLink></li>
          <li><NavLink to="/categories" className={({isActive}) => isActive ? "text-orange-600 border-b-2 border-orange-600 pb-1" : "text-amber-900 hover:text-orange-600"}>Animals</NavLink></li>
          <li><NavLink to="/tour" className={({isActive}) => isActive ? "text-orange-600 border-b-2 border-orange-600 pb-1" : "text-amber-900 hover:text-orange-600"}>Virtual Tour</NavLink></li>
          <li><NavLink to="/quiz-categories" className={({isActive}) => isActive ? "text-orange-600 border-b-2 border-orange-600 pb-1" : "text-amber-900 hover:text-orange-600"}>Quiz</NavLink></li>
          <li><NavLink to="/feedback" className={({isActive}) => isActive ? "text-orange-600 border-b-2 border-orange-600 pb-1" : "text-amber-900 hover:text-orange-600"}>Feedback</NavLink></li>

          <li>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-amber-900">Hi, {user.name || user.email}</span>
                <button onClick={handleLogout} className="bg-orange-600 text-white px-4 py-1 rounded">Logout</button>
              </div>
            ) : (
              <NavLink to="/login" className="bg-amber-900 text-white px-4 py-1 rounded">Login</NavLink>
            )}
          </li>
        </ul>

        <button className="md:hidden text-3xl text-amber-900" onClick={()=>setOpen(!open)}>☰</button>
      </div>

      {open && (
        <ul className="md:hidden bg-amber-50 shadow-inner flex flex-col gap-4 px-8 py-6 text-amber-900 font-semibold uppercase">
          <li><NavLink to="/" onClick={()=>setOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/categories" onClick={()=>setOpen(false)}>Animals</NavLink></li>
          <li><NavLink to="/tour" onClick={()=>setOpen(false)}>Virtual Tour</NavLink></li>
          <li><NavLink to="/quiz-categories" onClick={()=>setOpen(false)}>Quiz</NavLink></li>
          <li><NavLink to="/feedback" onClick={()=>setOpen(false)}>Feedback</NavLink></li>
          <li>
            {user ? (
              <button onClick={()=>{ handleLogout(); setOpen(false); }} className="bg-orange-600 text-white px-4 py-2 rounded w-full">Logout</button>
            ) : (
              <NavLink to="/login" onClick={()=>setOpen(false)} className="bg-amber-900 text-white px-4 py-2 rounded w-full">Login</NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
