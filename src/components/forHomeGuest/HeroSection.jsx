import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/coffee.jpg')"
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#bd9f67]/10 backdrop-blur-xl"
            initial={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 10 - 5],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 2
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#243137]/80 backdrop-blur-lg border border-[#bd9f67]/30 rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-[#bd9f67] rounded-full flex items-center justify-center mr-4"
              >
                <FiCoffee className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#bd9f67] font-poppins">
                Cafenity
              </h1>
            </div>
            <p className="text-[#bd9f67] text-sm uppercase tracking-[0.3em] font-barlow">
              Universe of UI
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-6 font-poppins"
          >
            Selamat Datang di Cafenity ☕
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-300 text-lg mb-8 font-barlow"
          >
            Rasakan ketenangan, aroma kopi, dan keindahan desain dalam setiap tegukan
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-[#bd9f67] hover:bg-[#bd9f67]/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Lihat Menu
            </button>
            <button className="border-2 border-[#bd9f67] text-[#bd9f67] hover:bg-[#bd9f67] hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
              Reservasi Meja
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}