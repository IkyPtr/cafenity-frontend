import { useNavigate } from "react-router-dom";
import { FiLogOut, FiHome, FiUsers, FiBookOpen, FiUser, FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Ambil data admin dari localStorage
    const storedAdminData = localStorage.getItem('adminData');
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }

    // Ambil dark mode preference dari localStorage
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }

    // Listen untuk perubahan dark mode dari header
    const handleDarkModeChange = () => {
      const currentDarkMode = localStorage.getItem('darkMode');
      if (currentDarkMode) {
        setIsDarkMode(JSON.parse(currentDarkMode));
      }
    };

    window.addEventListener('darkModeChanged', handleDarkModeChange);

    return () => {
      window.removeEventListener('darkModeChanged', handleDarkModeChange);
    };
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    navigate('/logout');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));

    // Dispatch custom event untuk sync dengan header
    window.dispatchEvent(new CustomEvent('darkModeChanged'));
  };

  const menuItems = [
    {
      path: '/dashboard',
      icon: <FiHome className="h-5 w-5" />,
      label: 'Dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      path: '/reservasiPesanan',
      icon: <FiBookOpen className="h-5 w-5" />,
      label: 'Reservasi',
      active: location.pathname === '/reservasiPesanan'
    },
    {
      path: '/kontak',
      icon: <FiUsers className="h-5 w-5" />,
      label: 'Kelola Kontak',
      active: location.pathname === '/kontak'
    }
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`${isDarkMode
          ? 'bg-gray-900/95 border-gray-700/50'
          : 'bg-white/90 border-cyan-200/50'
        } backdrop-blur-sm border-r shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
        } min-h-screen flex flex-col`}
    >
      {/* Header */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-cyan-200/50'
        }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo />
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg transition-colors ${isDarkMode
                ? 'hover:bg-gray-800/50 text-gray-300'
                : 'hover:bg-cyan-100/50 text-cyan-700'
              }`}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
            </motion.div>
          </button>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-cyan-200/50'
        }`}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-cyan-900'
              }`}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          )}
          <motion.button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode
                ? 'bg-cyan-600 focus:ring-cyan-500'
                : 'bg-gray-300 focus:ring-cyan-500'
              }`}
            whileTap={{ scale: 0.95 }}
            title={isCollapsed ? (isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode') : ''}
          >
            <motion.span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              <div className="flex items-center justify-center h-full w-full">
                {isDarkMode ? (
                  <FiMoon className="h-2.5 w-2.5 text-cyan-600" />
                ) : (
                  <FiSun className="h-2.5 w-2.5 text-yellow-500" />
                )}
              </div>
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Admin Info */}
      {!isCollapsed && adminData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-cyan-200/50'
            }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isDarkMode
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
                : 'bg-gradient-to-r from-cyan-500 to-teal-500'
              }`}>
              <FiUser className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-100' : 'text-cyan-900'
                }`}>
                {adminData.nama_lengkap}
              </p>
              <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-cyan-600'
                }`}>
                {adminData.email}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.active
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md'
                      : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-800/50 hover:text-gray-100'
                      : 'text-cyan-700 hover:bg-cyan-100/50 hover:text-cyan-900'
                  }`}
                title={isCollapsed ? item.label : ''}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-cyan-200/50'
        }`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isCollapsed ? 'justify-center' : ''
            } ${isDarkMode
              ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
              : 'text-red-600 hover:text-red-800 hover:bg-red-50'
            }`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <FiLogOut className="h-5 w-5" />
          {!isCollapsed && (
            <span className="font-medium">Logout</span>
          )}
        </motion.button>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`p-4 text-center border-t ${isDarkMode ? 'border-gray-700/50' : 'border-cyan-200/50'
            }`}
        >
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-cyan-600'
            }`}>
            © 2024 Cafenity Admin
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
