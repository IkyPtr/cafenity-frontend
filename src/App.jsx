import React from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
const CoffeeLoading = React.lazy(() => import("./components/CoffeeLoading"));

const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));

const HomeGuest = React.lazy(() => import("./pages/HomeGuest"));


function App() {
  return (
    <Suspense fallback={<CoffeeLoading />}>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HomeGuest />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
