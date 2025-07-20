// HeaderAdmin.jsx
import React, { useState, useEffect } from "react";
import { FiSearch, FiBell, FiSun, FiMoon, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

const HeaderAdmin = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Sync dengan dark mode dari localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }

    // Listen untuk perubahan dark mode dari sidebar
    const handleStorageChange = (e) => {
      if (e.key === 'darkMode') {
        setDarkMode(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Listen untuk perubahan dalam tab yang sama
    const handleDarkModeChange = () => {
      const currentDarkMode = localStorage.getItem('darkMode');
      if (currentDarkMode) {
        setDarkMode(JSON.parse(currentDarkMode));
      }
    };

    // Custom event listener untuk perubahan dalam tab yang sama
    window.addEventListener('darkModeChanged', handleDarkModeChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('darkModeChanged', handleDarkModeChange);
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    
    // Dispatch custom event untuk sync dengan sidebar
    window.dispatchEvent(new CustomEvent('darkModeChanged'));
    
    // Apply to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${
        darkMode 
          ? 'bg-gray-900/80 border-gray-700/40' 
          : 'bg-white/80 border-cyan-200/40'
      } backdrop-blur-lg shadow-sm p-4 flex justify-between items-center border-b transition-all duration-300`}
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
          className={`w-full pl-10 pr-4 py-2 rounded-full border focus:ring-1 transition-all ${
            darkMode
              ? 'border-gray-600/50 focus:border-cyan-400 focus:ring-cyan-400/30 bg-gray-800/90 text-gray-100 placeholder-gray-400'
              : 'border-cyan-300/50 focus:border-cyan-500 focus:ring-cyan-500/30 bg-white/90 text-gray-900 placeholder-gray-500'
          }`}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          darkMode ? 'text-cyan-400' : 'text-cyan-500'
        }`} />
      </motion.div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full transition-colors ${
            darkMode
              ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-cyan-400'
              : 'bg-cyan-100/50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700'
          }`}
        >
          <FiBell className="h-5 w-5" />
        </motion.button>

        {/* Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors ${
            darkMode
              ? 'bg-gray-800/50 text-yellow-400 hover:bg-gray-700/50 hover:text-yellow-300'
              : 'bg-cyan-100/50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700'
          }`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <motion.div
            initial={false}
            animate={{ rotate: darkMode ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
          </motion.div>
        </motion.button>

        {/* User Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-2 rounded-full ${
            darkMode
              ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
              : 'bg-gradient-to-r from-cyan-500 to-teal-500'
          }`}
        >
          <FiUser className="h-5 w-5 text-white" />
        </motion.div>

        {/* Brand Info */}
        <div className="ml-2">
          <h2 className={`text-lg font-bold ${
            darkMode ? 'text-gray-100' : 'text-cyan-900'
          }`}>
            Cafenity
          </h2>
          <p className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-cyan-600'
          }`}>
            Admin Panel
          </p>
        </div>
      </div>
    </motion.header>
  );
};

export default HeaderAdmin;
