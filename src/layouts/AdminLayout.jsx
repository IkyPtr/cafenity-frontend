import { Outlet } from "react-router-dom";
import FooterGuest from "/src/components/FooterGuest";
export default function AdminLayout() {
  return (
    <div className="font-poppins bg-blue text-gray-800">
      <main>
        <Outlet />
      </main>
    </div>
  );
}