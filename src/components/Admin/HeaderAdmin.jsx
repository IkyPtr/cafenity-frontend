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
        <FiUser />
        <div>
          <h2 className="text-lg font-bold text-cyan-900">Cafenity</h2>
          <p className="text-xs text-cyan-600">Admin Panel</p>
        </div>



      </div>
    </motion.header>
  );
};

export default HeaderAdmin;