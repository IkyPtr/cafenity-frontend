import React from "react";
import {
  AiOutlineSearch,
  AiOutlineCopy,
  AiOutlineLink,
  AiOutlineStar,
  AiOutlineBell,
} from "react-icons/ai";
import { BsMoon } from "react-icons/bs";

const HeaderAdmin = () => {
  return (
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
        <div className="bg-gray-100 p-2 rounded-full">
          <AiOutlineCopy className="text-purple-500 text-lg" />
        </div>
        <div className="bg-gray-100 p-2 rounded-full">
          <AiOutlineLink className="text-purple-500 text-lg" />
        </div>
        <div className="bg-gray-100 p-2 rounded-full">
          <AiOutlineStar className="text-purple-500 text-lg" />
        </div>
        <div className="bg-gray-100 p-2 rounded-full">
          <BsMoon className="text-purple-500 text-lg" />
        </div>

        <div className="relative bg-gray-100 p-2 rounded-full">
          <AiOutlineBell className="text-blue-500 text-lg" />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full px-1">
            5
          </span>
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
  );
};

export default HeaderAdmin;
