import { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaFacebookF, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export default function Footer() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Sync dengan dark mode dari NavbarGuest
  useEffect(() => {
    // Ambil initial state dari localStorage jika ada
    const storedTheme = localStorage.getItem('isDarkTheme');
    if (storedTheme) {
      setIsDarkTheme(JSON.parse(storedTheme));
    }

    // Listen untuk perubahan theme dari ThemeButton
    const handleThemeChange = (event) => {
      setIsDarkTheme(event.detail.isDark);
    };

    window.addEventListener('themeChanged', handleThemeChange);

    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  return (
    <footer className={`py-12 px-4 md:px-8 transition-all duration-300 ${
      isDarkTheme
        ? "bg-cyan-900 text-white"
        : "bg-[#096B68] text-[#FFFBDE]"
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <h2 className={`text-3xl font-bold font-serif ${
              isDarkTheme ? 'text-white' : 'text-[#FFFBDE]'
            }`}>
              Cafenity
            </h2>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkTheme ? 'text-white/70' : 'opacity-80'
            }`}>
              Your perfect coffee experience
            </p>
            <div className="flex gap-4 mt-2">
              <a 
                href="#" 
                aria-label="Instagram" 
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDarkTheme
                    ? 'bg-cyan-800/50 text-white hover:bg-cyan-700 hover:text-cyan-100'
                    : 'bg-[rgba(255,251,222,0.1)] text-[#FFFBDE] hover:bg-[#90D1CA] hover:text-[#096B68]'
                }`}
              >
                <FaInstagram />
              </a>
              <a 
                href="#" 
                aria-label="Twitter" 
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDarkTheme
                    ? 'bg-cyan-800/50 text-white hover:bg-cyan-700 hover:text-cyan-100'
                    : 'bg-[rgba(255,251,222,0.1)] text-[#FFFBDE] hover:bg-[#90D1CA] hover:text-[#096B68]'
                }`}
              >
                <FaTwitter />
              </a>
              <a 
                href="#" 
                aria-label="Facebook" 
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDarkTheme
                    ? 'bg-cyan-800/50 text-white hover:bg-cyan-700 hover:text-cyan-100'
                    : 'bg-[rgba(255,251,222,0.1)] text-[#FFFBDE] hover:bg-[#90D1CA] hover:text-[#096B68]'
                }`}
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className={`text-xl font-medium mb-4 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 transition-colors duration-300 ${
              isDarkTheme 
                ? 'text-white after:bg-cyan-600' 
                : 'text-[#FFFBDE] after:bg-[#90D1CA]'
            }`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['Home', 'Menu', 'About Us', 'Gallery', 'Reservations'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className={`flex items-center gap-2 group transition-all duration-300 ${
                      isDarkTheme
                        ? 'text-white/70 hover:text-cyan-200'
                        : 'opacity-80 hover:opacity-100 hover:text-[#90D1CA]'
                    }`}
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
            <h3 className={`text-xl font-medium mb-4 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 transition-colors duration-300 ${
              isDarkTheme 
                ? 'text-white after:bg-cyan-600' 
                : 'text-[#FFFBDE] after:bg-[#90D1CA]'
            }`}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className={`flex items-start gap-3 transition-colors duration-300 ${
                isDarkTheme ? 'text-white/70' : 'opacity-80'
              }`}>
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span>123 Coffee Street, Java City</span>
              </li>
              <li className={`flex items-center gap-3 transition-colors duration-300 ${
                isDarkTheme ? 'text-white/70' : 'opacity-80'
              }`}>
                <FaPhone />
                <span>(123) 456-7890</span>
              </li>
              <li className={`flex items-center gap-3 transition-colors duration-300 ${
                isDarkTheme ? 'text-white/70' : 'opacity-80'
              }`}>
                <FaEnvelope />
                <span>hello@cafenity.com</span>
              </li>
              <li className={`flex items-center gap-3 transition-colors duration-300 ${
                isDarkTheme ? 'text-white/70' : 'opacity-80'
              }`}>
                <FaClock />
                <span>Mon-Sun: 7:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className={`text-xl font-medium mb-4 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 transition-colors duration-300 ${
              isDarkTheme 
                ? 'text-white after:bg-cyan-600' 
                : 'text-[#FFFBDE] after:bg-[#90D1CA]'
            }`}>
              Newsletter
            </h3>
            <p className={`mb-4 transition-colors duration-300 ${
              isDarkTheme ? 'text-white/70' : 'opacity-80'
            }`}>
              Subscribe for updates and special offers
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                required
                className={`w-full px-4 py-3 rounded focus:outline-none focus:ring-2 transition-all duration-300 ${
                  isDarkTheme
                    ? 'bg-cyan-800/40 text-white focus:ring-cyan-500/50 placeholder-white/50 focus:bg-cyan-800/60'
                    : 'bg-[rgba(255,251,222,0.1)] text-[#FFFBDE] focus:ring-[#90D1CA] placeholder-[rgba(255,251,222,0.6)]'
                }`}
              />
              <button
                type="submit"
                className={`w-full font-semibold py-3 rounded transition-all duration-300 ${
                  isDarkTheme
                    ? 'bg-cyan-700 text-white hover:bg-cyan-600'
                    : 'bg-[#90D1CA] text-[#096B68] hover:bg-[#FFFBDE]'
                }`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300 ${
          isDarkTheme 
            ? 'border-cyan-700/50' 
            : 'border-[rgba(144,209,202,0.2)]'
        }`}>
          <p className={`text-sm transition-colors duration-300 ${
            isDarkTheme ? 'text-white/70' : 'opacity-80'
          }`}>
            &copy; {new Date().getFullYear()} Cafenity. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a 
              to="/dashboard" 
              className={`text-sm transition-all duration-300 ${
                isDarkTheme
                  ? 'text-white/70 hover:text-cyan-200'
                  : 'opacity-80 hover:opacity-100 hover:text-[#90D1CA]'
              }`}
            >
              Admin
            </a>
            <a 
              href="#" 
              className={`text-sm transition-all duration-300 ${
                isDarkTheme
                  ? 'text-white/70 hover:text-cyan-200'
                  : 'opacity-80 hover:opacity-100 hover:text-[#90D1CA]'
              }`}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className={`text-sm transition-all duration-300 ${
                isDarkTheme
                  ? 'text-white/70 hover:text-cyan-200'
                  : 'opacity-80 hover:opacity-100 hover:text-[#90D1CA]'
              }`}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
