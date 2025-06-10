// GuestLayout.jsx
import { Outlet } from "react-router-dom";
import NavbarGuest from "/src/components/Guest/NavbarGuest";
import FooterGuest from "/src/components/Guest/FooterGuest";
// import HeroSection from "../components/Guest/HeroSection";

export default function GuestLayout() {
  return (
    <div className="font-poppins bg-blue text-gray-800">
      <NavbarGuest />
      <main>
        <Outlet />
      </main>
      <FooterGuest />
    </div>
  );
}