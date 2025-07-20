import React from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

const CoffeeLoading = React.lazy(() => import("./components/CoffeeLoading.jsx"));
const GuestLayout = React.lazy(() => import("./layouts/GuestLayout.jsx"));
const HomeGuest = React.lazy(() => import("./Pages/HomeGuest.jsx"));
const Contact = React.lazy(() => import("./Pages/Contact.jsx"));
const About = React.lazy(() => import("./Pages/AboutPage.jsx"));
const MenuPage = React.lazy(() => import("./Pages/MenuPage.jsx"));
const ReservationPage = React.lazy(() => import("./Pages/ReservationPage.jsx"));
const Dashboard = React.lazy(() => import("./Pages/Admin/Dashboard.jsx"));
const ReservasiPesanan = React.lazy(() => import("./Pages/Admin/ReservasiPesanan.jsx"));
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout.jsx"));
const KelolaKontak = React.lazy(() => import("./Pages/Admin/KelolaKontak.jsx"));
const CursorFollower = React.lazy(() => import("./components/CursorFollower.jsx"));
const Register = React.lazy(() => import("./Pages/Auth/Register.jsx"));
const Login = React.lazy(() => import("./Pages/Auth/Login.jsx"));
const ForgotPassword = React.lazy(() => import("./Pages/Auth/ForgotPasword.jsx"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout.jsx"));
const Logout = React.lazy(() => import("./Pages/Admin/Logout.jsx"));
import ProtectedRoute from './components/Admin/ProtectedRoute.jsx';

function App() {
  return (
    <Suspense fallback={<CoffeeLoading />}>
      <CursorFollower />
      <Routes>
        {/* Guest Layout - Halaman Publik */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HomeGuest />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservasi" element={<ReservationPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Auth Layout - Halaman Login/Register */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Route>

        {/* Admin Layout - SEMUA DILINDUNGI */}
        <Route element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservasiPesanan" element={<ReservasiPesanan />} />
          <Route path="/kontak" element={<KelolaKontak />} />
        </Route>

        {/* Logout Route - Tidak perlu proteksi */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Suspense>
  );
}

export default App;
