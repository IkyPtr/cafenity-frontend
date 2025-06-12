// GuestLayout.jsx
import { Outlet } from "react-router-dom";
import NavbarGuest from "/src/components/NavbarGuest";
import FooterGuest from "/src/components/FooterGuest";
// import HomeGuest from "/src/components/Guest/HomeGuest";

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
