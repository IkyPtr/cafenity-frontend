import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";

export default function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", to: "/about" },
    { name: "Contact Us", to: "/contact" },
    { name: "Menu", to: "/menu" },
    { name: "Reservasi", to: "/reservasi" },
  ];

  const linkBaseStyle =
    "relative font-medium px-4 py-2 rounded-full transition-all duration-300 overflow-hidden group";
  const hoverLayer =
    "absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isDarkTheme
          ? "bg-teal-950/80 text-white"
          : "bg-yellow-50/80 text-teal-900"
      } ${scrolled ? "shadow-lg backdrop-blur-xl border-b border-teal-300/20" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`${linkBaseStyle} ${
                isDarkTheme
                  ? "text-white hover:text-teal-200"
                  : "text-teal-900 hover:text-white"
              }`}
            >
              <span
                className={`${hoverLayer} ${
                  isDarkTheme
                    ? "bg-white/10"
                    : "bg-teal-500/20"
                }`}
              ></span>
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className={`${linkBaseStyle} ${
              isDarkTheme
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-teal-200 text-teal-900 hover:bg-teal-300"
            }`}
          >
            <span
              className={`${hoverLayer} ${
                isDarkTheme ? "bg-white/20" : "bg-white/30"
              }`}
            ></span>
            <span className="relative z-10">
              {isDarkTheme ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl focus:outline-none transition"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        } ${isDarkTheme ? "bg-teal-950/90 text-white" : "bg-white text-teal-900"} px-6`}
      >
        <div className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`${linkBaseStyle} ${
                isDarkTheme
                  ? "text-white hover:text-teal-200"
                  : "text-teal-900 hover:text-white"
              }`}
            >
              <span
                className={`${hoverLayer} ${
                  isDarkTheme
                    ? "bg-white/10"
                    : "bg-teal-500/20"
                }`}
              ></span>
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className={`${linkBaseStyle} w-full text-center ${
              isDarkTheme
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-teal-200 text-teal-900 hover:bg-teal-300"
            }`}
          >
            <span
              className={`${hoverLayer} ${
                isDarkTheme ? "bg-white/20" : "bg-white/30"
              }`}
            ></span>
            <span className="relative z-10">
              {isDarkTheme ? "Switch to Light" : "Switch to Dark"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
