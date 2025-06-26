import React from "react";
import { NavLink } from "react-router-dom";
import { FiCoffee, FiCalendar, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import Logo from "../Logo";

const SidebarAdmin = () => {
  const menuClass = ({ isActive }) =>
    isActive
      ? "flex items-center p-3 rounded-lg bg-cyan-600/10 text-cyan-600 border-l-4 border-cyan-500 shadow-cyan-100 shadow-inner"
      : "flex items-center p-3 rounded-lg text-cyan-800/80 hover:bg-cyan-500/10 hover:text-cyan-600 transition-all";

  const menuItems = [
    { path: "/dashboard", icon: <FiCoffee className="text-lg" />, label: "Kelola Menu" },
    { path: "/reservasiPesanan", icon: <FiCalendar className="text-lg" />, label: "Kelola Reservasi" },
    { path: "/kontak", icon: <FiMail className="text-lg" />, label: "Kelola Kontak" }
  ];

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-gradient-to-b from-white to-cyan-50 flex flex-col p-5 border-r border-cyan-200/50"
    >
      <div className="mb-10 pl-2">
        <Logo />
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <NavLink to={item.path} className={menuClass}>
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-cyan-200/30">
        <div className="flex items-center p-3 rounded-lg hover:bg-cyan-100/30 transition-colors">
          <div className="relative mr-3">
            <img 
              src="https://i.pravatar.cc/40" 
              alt="Admin" 
              className="w-8 h-8 rounded-full border-2 border-cyan-400/30" 
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-teal-400 rounded-full border border-white"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-900">Admin Cafenity</p>
            <p className="text-xs text-cyan-600/60">Super Admin</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarAdmin;