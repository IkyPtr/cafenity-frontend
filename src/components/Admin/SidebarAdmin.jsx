import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineSetting } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Logo from "../Logo";

const SidebarAdmin = () => {
  const menuClass = ({ isActive }) =>
    isActive
      ? "flex items-center p-2 rounded bg-[#004c3f] text-white"
      : "flex items-center p-2 rounded hover:bg-[#004c3f] text-white";

  return (
    <aside className="w-64 bg-[#00332b] text-white flex flex-col p-4">
      <Logo />
      <div className="mt-10">
        <ul className="space-y-3">
          <li>
            <NavLink to="/dashboard" className={menuClass}>
              <MdFastfood className="mr-4 text-xl" />
              Kelola Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/reservasiPesanan" className={menuClass}>
              <AiOutlineHome className="mr-4 text-xl" />
              Kelola reservasi
            </NavLink>
          </li>
          <li>
            <NavLink to="/kontak" className={menuClass}>
              <MdFastfood className="mr-4 text-xl" />
              Kelola Kontak
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
