import React from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
// import MenuPage from "./pages/MenuPage";
// import ReservationPage from "./pages/ReservationPage";
const CoffeeLoading = React.lazy(() => import("./components/CoffeeLoading"));

const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));

const HomeGuest = React.lazy(() => import("./pages/HomeGuest"));

const Contact = React.lazy(() => import("./Pages/Contact"));

const About = React.lazy(() => import("./Pages/AboutPage"));

const MenuPage = React.lazy(() => import("./pages/MenuPage"));

const ReservationPage = React.lazy(() => import("./Pages/ReservationPage"));

const Dashboard = React.lazy(() => import("./Pages/Admin/Dashboard"));

const ReservasiPesanan = React.lazy(() => import("./Pages/Admin/ReservasiPesanan"));

const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));

function App() {
  return (
    <Suspense fallback={<CoffeeLoading />}>
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
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
