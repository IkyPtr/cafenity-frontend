import { useNavigate } from "react-router-dom";
import { FiLogOut, FiHome, FiUsers, FiBookOpen, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Ambil data admin dari localStorage
    const storedAdminData = localStorage.getItem('adminData');
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  const handleLogout = () => {
    navigate('/logout');
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
      className={`bg-white/90 backdrop-blur-sm border-r border-cyan-200/50 shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } min-h-screen flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-cyan-200/50">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo />
            </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-cyan-100/50 transition-colors"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
            </motion.div>
          </button>
        </div>
      </div>

      {/* Admin Info */}
      {!isCollapsed && adminData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 border-b border-cyan-200/50"
        >
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
              <FiUser className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-cyan-900 truncate">
                {adminData.nama_lengkap}
              </p>
              <p className="text-xs text-cyan-600 truncate">
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
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  item.active
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md'
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
      <div className="p-4 border-t border-cyan-200/50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-all duration-200 ${
            isCollapsed ? 'justify-center' : ''
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
          className="p-4 text-center border-t border-cyan-200/50"
        >
          <p className="text-xs text-cyan-600">
            © 2024 Cafenity Admin
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
