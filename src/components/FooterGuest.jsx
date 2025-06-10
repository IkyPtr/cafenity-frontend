import { Link } from "react-router-dom";
import PartnerLogo from "/src/assets/partnerLogo.jpg"; // pastikan path ini sesuai struktur project-mu

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-700 mt-20 pt-12 pb-6 px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8">
        {/* Logo dan Deskripsi */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sedap<span className="text-blue-500">.</span>
          </h2>
          <p className="text-sm text-gray-500">
            Cita rasa khas Indonesia dengan sentuhan modern.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/guest" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
            <li><Link to="/guest/check-product" className="hover:text-blue-500">Products</Link></li>
            <li><Link to="/testimonial" className="hover:text-blue-500">Testimonials</Link></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Kontak</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:info@sedap.com" className="hover:text-blue-500">info@sedap.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/6281234567890" className="hover:text-blue-500">+62 812-3456-7890</a></li>
            <li>Lokasi: Jakarta, Indonesia</li>
          </ul>
        </div>

        {/* Media Sosial */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Ikuti Kami</h3>
          <div className="flex gap-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        {/* Partner Kami */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Partner Kami</h4>
          <img
            src={PartnerLogo}
            alt="Partner logo"
            className="h-12 w-auto mt-2 object-contain"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 mt-10 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Sedap. All rights reserved.
      </div>
    </footer>
  );
}
