import { Outlet } from "react-router-dom";
import FooterGuest from "/src/components/FooterGuest";
// import HomeGuest from "/src/components/Guest/HomeGuest";

// import HeroSection from "../components/Guest/HeroSection";

export default function AdminLayout() {
  return (
    <div className="font-poppins bg-blue text-gray-800">
      <main>
        <Outlet />
      </main>
    </div>
  );
}