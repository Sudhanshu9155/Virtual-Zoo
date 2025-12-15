import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-16">
      <div className="bg-[#15252E] text-white">
        <div className="container mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#e3b46d] to-[#f2d16b] bg-clip-text text-transparent mb-4">
                🐾 Virtual Zoo
              </h2>

              <p className="text-[#d6d6d6] max-w-md leading-relaxed mb-5">
                Explore wildlife, learn about nature, and connect with animals through a modern virtual experience.
              </p>

              <div className="flex gap-4">
                {["📘", "🐦", "📷"].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#1E3743] hover:bg-[#1faf6b] flex items-center justify-center transition-all"
                  >
                    <span className="text-lg">{icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-[#e3b46d] mb-4 border-b border-[#1e3743] pb-2">
                Quick Links
              </h3>

              <ul className="space-y-2">
                {[
                  { name: "Home", link: "/" },
                  { name: "Animals", link: "/categories" },
                  { name: "Virtual Tour", link: "/tour" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.link}
                      className="text-[#d6d6d6] hover:text-[#f2d16b] transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#1faf6b]">›</span> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-[#e3b46d] mb-4 border-b border-[#1e3743] pb-2">
                Resources
              </h3>

              <ul className="space-y-2">
                {[
                  { name: "Quiz", link: "/quiz-categories" },
                  { name: "Feedback", link: "/feedback" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.link}
                      className="text-[#d6d6d6] hover:text-[#f2d16b] transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#1faf6b]">›</span> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1e3743] bg-[#15252E]">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#d6d6d6] gap-2">
              <p>© 2025 Virtual Zoo. All rights reserved.</p>
              <p className="flex items-center gap-2">Explore · Learn · Protect 🐘</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
