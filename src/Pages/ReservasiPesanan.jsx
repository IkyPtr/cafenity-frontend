import React from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import MenuAdmin from "../components/MenuAdmin";

export default function Dashboard() {
  return (
    <MenuAdmin>
      <div className="p-5">

        {/* Tambahan header langsung disini */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Reservasi Pesanan</h1>
          <p className="text-gray-400">Home/Reservasi Pesanan</p>
        </div>
      </div>
    </MenuAdmin>
  );
}
