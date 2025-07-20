import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiArrowRight } from 'react-icons/fi';

export default function HeroSection() {
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
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]'
    }`}>
      {/* Liquid background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full backdrop-blur-xl transition-colors duration-300 ${
              isDarkTheme
                ? 'bg-gradient-to-br from-cyan-400/15 to-teal-400/15'
                : 'bg-gradient-to-br from-cyan-400/20 to-teal-400/20'
            }`}
            initial={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
              opacity: 0
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, isDarkTheme ? 0.3 : 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 3
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        isDarkTheme ? 'opacity-5' : 'opacity-10'
      } [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px]`} />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          {/* Premium Animated Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className={`absolute inset-0 rounded-full blur-lg animate-pulse transition-colors duration-300 ${
                isDarkTheme ? 'bg-cyan-400 opacity-20' : 'bg-cyan-500 opacity-30'
              }`} />
              <div className={`relative px-6 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-cyan-400/10 to-teal-400/10 border-cyan-400/40'
                  : 'bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border-cyan-400/30'
              }`}>
                <span className={`text-sm font-medium tracking-widest transition-colors duration-300 ${
                  isDarkTheme ? 'text-cyan-300' : 'text-cyan-700'
                }`}>
                  PREMIUM COFFEE EXPERIENCE
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading with Animated Gradient */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className={`text-transparent bg-clip-text animate-gradient-x transition-all duration-300 ${
              isDarkTheme
                ? 'bg-gradient-to-r from-cyan-400 to-teal-400'
                : 'bg-gradient-to-r from-cyan-600 to-teal-600'
            }`}>
              Crafting Coffee
            </span>
            <br />
            <span className={`transition-colors duration-300 ${
              isDarkTheme ? 'text-white' : 'text-cyan-900'
            }`}>
              Masterpieces
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 font-light transition-colors duration-300 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
            }`}
          >
            Where every cup is a canvas and every sip tells a story. Experience the pinnacle of coffee artistry in an ambiance designed for connoisseurs.
          </motion.p>

          {/* Animated Coffee Cup Icon */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16"
          >
            <div className="relative">
              <div className={`absolute -inset-4 rounded-full backdrop-blur-md animate-pulse transition-colors duration-300 ${
                isDarkTheme ? 'bg-cyan-400/10' : 'bg-cyan-500/10'
              }`} />
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                className={`relative p-6 backdrop-blur-sm border rounded-full transition-all duration-300 ${
                  isDarkTheme
                    ? 'bg-cyan-400/10 border-cyan-400/30'
                    : 'bg-cyan-500/10 border-cyan-400/20'
                }`}
              >
                <FiCoffee className={`w-12 h-12 transition-colors duration-300 ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Coffee Beans */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute transition-colors duration-300 ${
            isDarkTheme ? 'text-cyan-400/20' : 'text-cyan-600/30'
          }`}
          style={{
            fontSize: `${Math.random() * 20 + 10}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20],
            x: [0, Math.random() * 40 - 20],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 2
          }}
        >
          •
        </motion.div>
      ))}

      {/* Additional Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className={`absolute w-1 h-1 rounded-full transition-colors duration-300 ${
              isDarkTheme ? 'bg-cyan-400/30' : 'bg-cyan-500/40'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -150],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
        isDarkTheme
          ? 'bg-gradient-to-t from-gray-900/20 via-transparent to-gray-900/10'
          : 'bg-gradient-to-t from-[#f0f8ff]/20 via-transparent to-[#e0f7fa]/10'
      }`} />

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
