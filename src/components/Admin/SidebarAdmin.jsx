import { useNavigate } from "react-router-dom";
import { FiLogOut, FiHome, FiUsers, FiBookOpen, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("adminData"));
    if (data) {
      setAdminData(data);
      const path = window.location.pathname;
      if (path.includes("reservasi")) setActiveItem("reservasi");
      else if (path.includes("kontak")) setActiveItem("kontak");
      else setActiveItem("dashboard");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminData");
    localStorage.removeItem("loginTime");
    navigate("/login");
  };

  const menuItems = [
    {
      id: "dashboard",
      icon: <FiHome className="text-lg" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "reservasi",
      icon: <FiBookOpen className="text-lg" />,
      label: "Reservasi",
      path: "/reservasiPesanan",
    },
    {
      id: "kontak",
      icon: <FiUsers className="text-lg" />,
      label: "Kelola Kontak",
      path: "/kontak",
    },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen w-64 bg-gradient-to-b from-[#f0f8ff] to-[#e0f7fa] flex flex-col border-r border-cyan-200/50"
    >
      {/* Logo */}
      <div className="p-4 border-b border-cyan-200/30">
        <div className="flex items-center justify-center px-4">
          <Logo />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate(item.path);
              setActiveItem(item.id);
            }}
            className={`w-full flex items-center rounded-lg p-3 transition-all ${
              activeItem === item.id
                ? "bg-cyan-100 text-cyan-700 shadow-inner"
                : "text-cyan-800/80 hover:bg-cyan-50"
            }`}
          >
            <div className={`${activeItem === item.id ? "text-cyan-600" : "text-cyan-500"}`}>
              {item.icon}
            </div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-3 font-medium"
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-cyan-200/30">
        <div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-cyan-50/50">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <FiUser className="text-cyan-600" />
              </div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-teal-400 rounded-full border border-white"></div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-3"
            >
              <p className="text-sm font-medium text-cyan-900 truncate max-w-[120px]">
                {adminData?.nama_lengkap || "Admin"}
              </p>
              <p className="text-xs text-cyan-600/60">Administrator</p>
            </motion.div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition px-4"
        >
          <FiLogOut />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 text-sm"
          >
            Logout
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
