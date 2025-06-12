import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo"; // Pastikan path Logo benar

export default function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Di sini kamu bisa menyimpan tema ke localStorage jika perlu
  };

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isDarkTheme
          ? "bg-teal-900/70 text-white"
          : "bg-yellow-50/70 text-teal-900"
      } ${scrolled ? "shadow-md backdrop-blur-xl border-b border-teal-200/20" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="font-medium hover:text-teal-500 transition"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              isDarkTheme
                ? "bg-white/20 hover:bg-white/40 text-white"
                : "bg-teal-100 hover:bg-teal-200 text-teal-900"
            }`}
          >
            {isDarkTheme ? "LT" : "DT"}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden px-6 pb-4 space-y-3 ${
            isDarkTheme ? "bg-teal-900/80 text-white" : "bg-white text-teal-900"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block font-medium hover:text-teal-500 transition"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className={`block w-full text-center py-2 rounded-full font-semibold transition ${
              isDarkTheme
                ? "bg-white/20 hover:bg-white/40 text-white"
                : "bg-teal-100 hover:bg-teal-200 text-teal-900"
            }`}
          >
            {isDarkTheme ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      )}
    </header>
  );
}
