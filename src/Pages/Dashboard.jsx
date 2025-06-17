import React from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import MenuAdmin from "../components/MenuAdmin";

export default function Dashboard() {
  return (
    <MenuAdmin>
      <div className="p-5">

        {/* Tambahan header langsung disini */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Home/Dashboard / Home Detail</p>
        </div>

        <div id="dashboard-grid" className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
            <div className="bg-green-500 rounded-full p-4 text-white"><FaShoppingCart /></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">75</span>
              <span className="text-gray-400">Total Orders</span>
            </div>
          </div>
        </div>

      </div>
    </MenuAdmin>
  );
}
