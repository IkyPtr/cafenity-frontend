import React from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* <Route path="*" element={<ErrorPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} /> 
          <Route path="/notes" element={<Notes/>} />
        </Route> */}

        {/* <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route> */}

        <Route element={<GuestLayout />}>
          <Route path="/guest" element={<HomeGuest />} />
          <Route path="/guest/check-product" element={<CheckProduct />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/testimonial" element={<TestimonialSection />} />
          {/* <Route path="/product" element={<OtherMenu />} /> */}

        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
