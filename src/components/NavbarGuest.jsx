import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/src/components/Logo";
import { FiMenu, FiX } from "react-icons/fi";

// Dummy user object untuk simulasi login
const dummyUser = {
  name: "John Doe",
  avatar: "https://i.pravatar.cc/40" // contoh avatar bulat
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Ganti ini jadi null kalau tidak ada user login
  const user = dummyUser; // atau null jika tidak login

  const navLinks = [
    { name: "About", to: "/about" },
    { name: "Menu", to: "/menu" },
    { name: "Reservasi", to: "/reservasi" },
    { name: "Kontak", to: "/kontak" },
  ];

  // Warna primary dari oklch(71.996% 0.123 62.756) -> bisa konversi ke hex atau pakai Tailwind custom warna
  // Untuk contoh kita gunakan warna biru yang mendekati
  const primaryColor = "rgb(17, 99, 255)"; // bisa sesuaikan sesuai kebutuhan

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300 ${
        isDark ? "bg-neutral-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`hover:text-[${primaryColor}] transition-colors duration-200`}
            >
              {link.name}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle Light/Dark Theme"
            className={`mx-2 px-3 py-1 rounded font-medium border-2 transition-colors duration-300 ${
              isDark
                ? "border-white text-white hover:bg-white hover:text-black"
                : `border-[${primaryColor}] text-[${primaryColor}] hover:bg-[${primaryColor}] hover:text-white`
            }`}
          >
            {isDark ? "DT" : "LT"}
          </button>

          {/* Login or Profile */}
          {user ? (
            <Link
              to="/profile"
              className="ml-4 block w-10 h-10 rounded-full overflow-hidden border-2 border-[rgb(17,99,255)]"
              title={user.name}
            >
              <img
                src={user.avatar}
                alt={`${user.name} avatar`}
                className="w-full h-full object-cover"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="ml-4 bg-[rgb(17,99,255)] hover:bg-[rgb(12,65,168)] text-white px-4 py-2 rounded-full font-semibold transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-200 text-2xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden px-6 pb-4 space-y-3 shadow transition-colors duration-300 ${
            isDark ? "bg-neutral-900 text-white" : "bg-white text-gray-800"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block font-semibold hover:text-[${primaryColor}] transition-colors duration-200`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              setIsDark(!isDark);
              setIsOpen(false);
            }}
            className={`w-full text-center px-3 py-1 rounded font-medium border-2 mb-2 transition-colors duration-300 ${
              isDark
                ? "border-white text-white hover:bg-white hover:text-black"
                : `border-[${primaryColor}] text-[${primaryColor}] hover:bg-[${primaryColor}] hover:text-white`
            }`}
          >
            {isDark ? "DT" : "LT"}
          </button>

          {user ? (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="inline-block w-10 h-10 rounded-full overflow-hidden border-2 border-[rgb(17,99,255)]"
              title={user.name}
            >
              <img
                src={user.avatar}
                alt={`${user.name} avatar`}
                className="w-full h-full object-cover"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="inline-block w-full text-center bg-[rgb(17,99,255)] hover:bg-[rgb(12,65,168)] text-white py-2 rounded-full font-semibold transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
