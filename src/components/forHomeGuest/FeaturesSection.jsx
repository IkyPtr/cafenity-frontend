import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiMapPin } from 'react-icons/fi';

export default function FeaturesSection() {
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

  const features = [
    {
      icon: <FiCoffee className="w-8 h-8" />,
      title: "Premium Coffee",
      description: "Biji kopi pilihan terbaik dari berbagai daerah di Indonesia",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Pelayanan Terbaik",
      description: "Tim barista profesional yang siap melayani dengan ramah",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: "Lokasi Strategis",
      description: "Berada di pusat kota dengan akses mudah dan parkir luas",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]'
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
            Mengapa Memilih{' '}
            <span className={`text-transparent bg-clip-text transition-all duration-300 ${
              isDarkTheme
                ? 'bg-gradient-to-r from-cyan-400 to-teal-400'
                : 'bg-gradient-to-r from-cyan-600 to-teal-600'
            }`}>
              Cafenity?
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-barlow transition-colors duration-300 ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Kami berkomitmen memberikan pengalaman terbaik untuk setiap tamu
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 text-center group transition-all duration-300 transform hover:-translate-y-2 border ${
                isDarkTheme
                  ? 'bg-gray-800/60 backdrop-blur-lg border-gray-600/30 hover:bg-gray-800/80 shadow-lg hover:shadow-xl hover:shadow-cyan-400/10'
                  : 'bg-white/50 backdrop-blur-lg border-cyan-400/20 hover:bg-white/70 shadow-md hover:shadow-xl hover:shadow-cyan-500/10'
              }`}
            >
              {/* Icon Container */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white transition-all duration-300 group-hover:scale-110 ${
                isDarkTheme
                  ? 'bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/25'
                  : 'bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/30'
              }`}>
                {feature.icon}
                
                {/* Glow Effect */}
                <div className={`absolute w-20 h-20 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                  isDarkTheme
                    ? 'bg-gradient-to-br from-cyan-400 to-teal-400'
                    : 'bg-gradient-to-br from-cyan-500 to-teal-500'
                } blur-xl`} />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-4 font-poppins transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-cyan-900'
              }`}>
                {feature.title}
              </h3>
              
              <p className={`font-barlow leading-relaxed transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
              }`}>
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className="flex justify-center mt-6">
                <div className={`w-12 h-1 rounded-full transition-all duration-300 group-hover:w-16 ${
                  isDarkTheme
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-400'
                    : 'bg-gradient-to-r from-cyan-500 to-teal-500'
                }`} />
              </div>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-cyan-400/10 via-transparent to-teal-400/10'
                  : 'bg-gradient-to-r from-cyan-500/10 via-transparent to-teal-500/10'
              }`} />
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className={`inline-flex items-center px-6 py-3 rounded-full border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-gray-800/60 border-gray-600/40 text-gray-300'
              : 'bg-white/60 border-cyan-300/40 text-cyan-800'
          }`}>
            <FiCoffee className={`w-5 h-5 mr-3 transition-colors duration-300 ${
              isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
            }`} />
            <span className="text-sm font-medium">
              Dipercaya oleh lebih dari{' '}
              <span className={`font-bold transition-colors duration-300 ${
                isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
              }`}>
                5000+
              </span>{' '}
              pelanggan setia
            </span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { number: "100%", label: "Organic Coffee", icon: "🌱" },
            { number: "24/7", label: "Fresh Roasted", icon: "☕" },
            { number: "15+", label: "Coffee Origins", icon: "🌍" },
            { number: "4.9★", label: "Customer Rating", icon: "⭐" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              viewport={{ once: true }}
              className={`text-center p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDarkTheme
                  ? 'bg-gray-800/40 border-gray-600/30 hover:bg-gray-800/60'
                  : 'bg-white/40 border-cyan-200/30 hover:bg-white/60'
              }`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-xl font-bold font-poppins mb-1 transition-colors duration-300 ${
                isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
              }`}>
                {stat.number}
              </div>
              <div className={`text-xs font-barlow transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-400' : 'text-cyan-700'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full transition-colors duration-300 ${
              isDarkTheme
                ? 'bg-gradient-to-br from-cyan-400/5 to-teal-400/5'
                : 'bg-gradient-to-br from-cyan-400/10 to-teal-400/10'
            }`}
            style={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
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
              delay: i * 2
            }}
          />
        ))}
      </div>
    </section>
  );
}
