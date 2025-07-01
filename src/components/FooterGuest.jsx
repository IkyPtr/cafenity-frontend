import { FaInstagram, FaTwitter, FaFacebookF, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#096B68] text-[#FFFBDE] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold font-serif">Cafenity</h2>
            <p className="text-sm opacity-80">Your perfect coffee experience</p>
            <div className="flex gap-4 mt-2">
              <a href="#" aria-label="Instagram" className="bg-[rgba(255,251,222,0.1)] text-[#FFFBDE] w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#90D1CA] hover:text-[#096B68] transition-all duration-300">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter" className="bg-[rgba(255,251,222,0.1)] text-[#FFFBDE] w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#90D1CA] hover:text-[#096B68] transition-all duration-300">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Facebook" className="bg-[rgba(255,251,222,0.1)] text-[#FFFBDE] w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#90D1CA] hover:text-[#096B68] transition-all duration-300">
                <FaFacebookF />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-medium mb-4 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#90D1CA]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['Home', 'Menu', 'About Us', 'Gallery', 'Reservations'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="opacity-80 hover:opacity-100 hover:text-[#90D1CA] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="group-hover:ml-1 transition-all duration-300">→</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-medium mb-4 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#90D1CA]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 opacity-80">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span>123 Coffee Street, Java City</span>
              </li>
              <li className="flex items-center gap-3 opacity-80">
                <FaPhone />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3 opacity-80">
                <FaEnvelope />
                <span>hello@cafenity.com</span>
              </li>
              <li className="flex items-center gap-3 opacity-80">
                <FaClock />
                <span>Mon-Sun: 7:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xl font-medium mb-4 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#90D1CA]">
              Newsletter
            </h3>
            <p className="mb-4 opacity-80">Subscribe for updates and special offers</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full px-4 py-3 bg-[rgba(255,251,222,0.1)] text-[#FFFBDE] rounded focus:outline-none focus:ring-2 focus:ring-[#90D1CA] placeholder-[rgba(255,251,222,0.6)]"
              />
              <button
                type="submit"
                className="w-full bg-[#90D1CA] text-[#096B68] font-semibold py-3 rounded hover:bg-[#FFFBDE] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[rgba(144,209,202,0.2)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} Cafenity. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/dashboard" className="text-sm opacity-80 hover:opacity-100 hover:text-[#90D1CA] transition-all duration-300">
              Admin
            </a>
            <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-[#90D1CA] transition-all duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-[#90D1CA] transition-all duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}