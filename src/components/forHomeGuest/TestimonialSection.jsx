import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function TestimonialSection() {
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Coffee Enthusiast",
      content: "Cafenity adalah tempat favorit saya untuk bekerja dan bersantai. Kopinya luar biasa dan suasananya sangat nyaman!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Ahmad Rizki",
      role: "Freelancer",
      content: "Pelayanan yang ramah dan kopi yang berkualitas. Tempat yang sempurna untuk meeting atau sekadar menikmati waktu sendiri.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Maria Santos",
      role: "Student",
      content: "WiFi cepat, tempat nyaman untuk belajar, dan menu yang beragam. Cafenity sudah seperti rumah kedua bagi saya!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-[#f0f8ff] to-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 font-poppins transition-colors duration-300 ${
            isDarkTheme ? 'text-white' : 'text-cyan-900'
          }`}>
            Apa Kata Mereka?
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-barlow transition-colors duration-300 ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Testimoni dari pelanggan setia Cafenity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 shadow-lg border transition-all duration-300 group hover:shadow-xl ${
                isDarkTheme
                  ? 'bg-gray-800/80 border-gray-600/40 hover:shadow-cyan-500/10 hover:bg-gray-800/90'
                  : 'bg-white border-cyan-400/20 hover:shadow-cyan-500/10 hover:bg-white/90'
              }`}
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                  isDarkTheme
                    ? 'border-cyan-400/50 group-hover:border-cyan-400/70'
                    : 'border-cyan-300/50 group-hover:border-cyan-400/70'
                }`}>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (index * 0.2) + (i * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <FiStar className={`w-5 h-5 fill-current transition-colors duration-300 ${
                      isDarkTheme ? 'text-cyan-400' : 'text-cyan-500'
                    }`} />
                  </motion.div>
                ))}
              </div>

              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDarkTheme
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'bg-cyan-100 text-cyan-600'
                }`}>
                  <span className="text-lg font-serif">"</span>
                </div>
              </div>

              {/* Testimonial Content */}
              <p className={`mb-6 font-barlow italic text-center leading-relaxed transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-300' : 'text-cyan-800/90'
              }`}>
                "{testimonial.content}"
              </p>

              {/* Customer Info */}
              <div className="text-center">
                <h4 className={`font-bold font-poppins mb-1 transition-colors duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-cyan-900'
                }`}>
                  {testimonial.name}
                </h4>
                <p className={`text-sm font-barlow transition-colors duration-300 ${
                  isDarkTheme ? 'text-gray-400' : 'text-cyan-700/80'
                }`}>
                  {testimonial.role}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="flex justify-center mt-6">
                <div className={`w-12 h-1 rounded-full transition-colors duration-300 ${
                  isDarkTheme
                    ? 'bg-gradient-to-r from-cyan-400/50 to-teal-400/50'
                    : 'bg-gradient-to-r from-cyan-400 to-teal-400'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className={`inline-flex items-center px-6 py-3 rounded-full border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-gray-800/60 border-gray-600/40 text-gray-300'
              : 'bg-white/60 border-cyan-300/40 text-cyan-800'
          }`}>
            <span className="text-sm font-medium">
              Bergabunglah dengan lebih dari{' '}
              <span className={`font-bold transition-colors duration-300 ${
                isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
              }`}>
                1000+
              </span>{' '}
              pelanggan puas
            </span>
          </div>
        </motion.div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full transition-colors duration-300 ${
                isDarkTheme
                  ? 'bg-gradient-to-br from-cyan-400/5 to-teal-400/5'
                  : 'bg-gradient-to-br from-cyan-400/10 to-teal-400/10'
              }`}
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(60px)',
              }}
              initial={{ opacity: 0 }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: i * 3
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
