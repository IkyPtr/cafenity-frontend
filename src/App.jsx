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
const ReservationPage = React.lazy(() => import("./Pages/ReservationPage"));
const Dashboard = React.lazy(() => import("./Pages/Admin/Dashboard"));
const ReservasiPesanan = React.lazy(() => import("./Pages/Admin/ReservasiPesanan"));
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const KelolaKontak = React.lazy(() => import("./Pages/Admin/KelolaKontak"));
const CursorFollower = React.lazy(() => import("./components/CursorFollower"));
const Register = React.lazy(() => import("./Pages/Auth/Register"));
const Login = React.lazy(() => import("./Pages/Auth/Login"));
const ForgotPassword = React.lazy(() => import("./Pages/Auth/ForgotPasword"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Logout = React.lazy(() => import("./Pages/Admin/Logout"));
import ProtectedRoute from './components/Admin/ProtectedRoute';

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
