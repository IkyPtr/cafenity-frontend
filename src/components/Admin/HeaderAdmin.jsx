// HeaderAdmin.jsx
import React, { useState } from "react";
import { FiSearch, FiBell, FiSun, FiMoon, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

const HeaderAdmin = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.header 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-lg shadow-sm p-4 flex justify-between items-center border-b border-cyan-200/40"
    >
      {/* Search Box */}
      <motion.div 
        animate={{
          width: searchFocused ? "400px" : "300px"
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        <input
          type="text"
          placeholder="Cari menu, pelanggan..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-cyan-300/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 bg-white/90 transition-all"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500" />
      </motion.div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-cyan-100/50 text-cyan-600 hover:bg-cyan-100 transition-colors"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </motion.button>

        {/* Notifications */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative p-2"
        >
          <FiBell className="text-cyan-600 text-lg" />
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
          >
            3
          </motion.span>
        </motion.div>

        {/* User Profile */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 pl-2 border-l border-cyan-200/40"
        >
          <div className="relative">
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
              className="w-9 h-9 rounded-full border-2 border-cyan-500/30"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-medium text-cyan-900">Admin Cafenity</span>
            <span className="text-xs text-cyan-600/80">Super Admin</span>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default HeaderAdmin;