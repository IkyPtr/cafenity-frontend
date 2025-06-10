import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/src/components/Logo";

import { FiMenu, FiX } from "react-icons/fi";

export default function NavbarGuest() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/guest" },
    { name: "About", to: "/about" },
    { name: "Check Products", to: "/guest/check-product" },
    { name: "Testimonials", to: "/testimonial" },
    // { name: "Other Products", to: "/product" },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-200"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 text-2xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white shadow">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold transition-all duration-200"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}

