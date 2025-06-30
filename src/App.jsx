import React from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

const CoffeeLoading = React.lazy(() => import("./components/CoffeeLoading"));
const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
const HomeGuest = React.lazy(() => import("./Pages/HomeGuest"));
const Contact = React.lazy(() => import("./pages/Contact"));
const About = React.lazy(() => import("./pages/AboutPage"));
const MenuPage = React.lazy(() => import("./pages/MenuPage"));
const ReservationPage = React.lazy(() => import("./pages/ReservationPage"));
const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"));
const ReservasiPesanan = React.lazy(() => import("./pages/Admin/ReservasiPesanan"));
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const KelolaKontak = React.lazy(() => import("./pages/Admin/KelolaKontak"));
const CursorFollower = React.lazy(() => import("./components/CursorFollower"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const ForgotPassword = React.lazy(() => import("./pages/Auth/ForgotPasword"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Logout = React.lazy(() => import("./pages/Admin/Logout"));
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
