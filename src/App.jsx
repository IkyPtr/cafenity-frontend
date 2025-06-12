import React from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import MenuPage from "./pages/MenuPage";
import ReservationPage from "./pages/ReservationPage";
const CoffeeLoading = React.lazy(() => import("./components/CoffeeLoading"));

const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));

const HomeGuest = React.lazy(() => import("./pages/HomeGuest"));


function App() {
  return (
    <Suspense fallback={<CoffeeLoading />}>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HomeGuest />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservasi" element={<ReservationPage />} />


        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
