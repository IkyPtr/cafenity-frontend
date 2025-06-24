import React from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

const CoffeeLoading = React.lazy(() => import("./components/CoffeeLoading"));

const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));

const HomeGuest = React.lazy(() => import("./Pages/HomeGuest"));

const Contact = React.lazy(() => import("./Pages/Contact"));

const About = React.lazy(() => import("./Pages/AboutPage"));

const MenuPage = React.lazy(() => import("./Pages/MenuPage"));

const ReservationPage = React.lazy(() => import("./pages/ReservationPage"));

const Dashboard = React.lazy(() => import("./Pages/Admin/Dashboard"));

const ReservasiPesanan = React.lazy(() => import("./Pages/Admin/ReservasiPesanan"));

const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));

const KelolaKontak = React.lazy(() => import("./Pages/Admin/KelolaKontak"));

const CursorFollower = React.lazy(() => import("./components/CursorFollower"));

function App() {
  return (
    <Suspense fallback={<CoffeeLoading />}>
      <CursorFollower />
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HomeGuest />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservasi" element={<ReservationPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservasiPesanan" element={<ReservasiPesanan />} />
          <Route path="/kontak" element={<KelolaKontak />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
