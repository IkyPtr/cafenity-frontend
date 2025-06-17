import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineSetting, AiOutlineSearch, AiOutlineLink, AiOutlineCopy, AiOutlineStar, AiOutlineBell } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import Logo from "./Logo";

const MenuAdmin = ({ children }) => {
  const menuClass = ({ isActive }) =>
    isActive
      ? "flex items-center p-2 rounded bg-[#004c3f] text-white"
      : "flex items-center p-2 rounded hover:bg-[#004c3f] text-white";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#00332b] text-white flex flex-col p-4">
        <Logo />
        <div className="mt-10">
          <ul className="space-y-3">
            <li>
              <NavLink to="/dashboard" className={menuClass}>
              <AiOutlineHome className="mr-4 text-xl" />
              Dashboard</NavLink>
              </li>
            <li>
              <li>
              <NavLink to="/reservasiPesanan" className={menuClass}>
              <AiOutlineHome className="mr-4 text-xl" />
              Reservasi Pesanan</NavLink>
              </li>
            <li></li>
              <NavLink to="/admin/menu" className={menuClass}>
              <MdFastfood className="mr-4 text-xl" />
              Kelola Menu</NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders" className={menuClass}>
              <AiOutlineShoppingCart className="mr-4 text-xl" />
              Kelola Pesanan</NavLink>
            </li>
            <li>
              <NavLink to="/admin/customers" className={menuClass}>
              <FaUsers className="mr-4 text-xl" />
              Data Pelanggan</NavLink>
            </li>
            <li>
              <NavLink to="/admin/settings" className={menuClass}>
              <AiOutlineSetting className="mr-4 text-xl" />
              Pengaturan</NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* Search Box */}
          <div className="flex items-center w-1/3">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search Here..." 
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none bg-[#f5f5f5]"
              />
              <AiOutlineSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Icon Section */}
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full"><AiOutlineCopy className="text-purple-500 text-lg" /></div>
            <div className="bg-gray-100 p-2 rounded-full"><AiOutlineLink className="text-purple-500 text-lg" /></div>
            <div className="bg-gray-100 p-2 rounded-full"><AiOutlineStar className="text-purple-500 text-lg" /></div>
            <div className="bg-gray-100 p-2 rounded-full"><BsMoon className="text-purple-500 text-lg" /></div>

            <div className="relative bg-gray-100 p-2 rounded-full">
              <AiOutlineBell className="text-blue-500 text-lg" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full px-1">5</span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2 ml-2">
              <img 
                src="https://i.pravatar.cc/40" 
                alt="User" 
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold">Cafenity</span>
                <span className="text-gray-400">UI Designer</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default MenuAdmin;
