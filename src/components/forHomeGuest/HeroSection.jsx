import { motion } from 'framer-motion';
import { FiCoffee, FiArrowRight } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Premium Liquid Metal Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-[#bd9f67]/5 to-[#bd9f67]/20 backdrop-blur-3xl"
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
              opacity: [0, 0.4, 0],
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

      {/* Metallic Grid Pattern */}
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px]" />

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
              <div className="absolute inset-0 bg-[#bd9f67] rounded-full blur-lg opacity-30 animate-pulse" />
              <div className="relative px-6 py-2 bg-gradient-to-r from-[#bd9f67]/10 to-[#bd9f67]/20 border border-[#bd9f67]/30 rounded-full backdrop-blur-sm">
                <span className="text-[#bd9f67] text-sm font-medium tracking-widest">PREMIUM COFFEE EXPERIENCE</span>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5d7a1] via-[#bd9f67] to-[#8a6d3b] animate-gradient-x">
              Crafting Coffee
            </span>
            <br />
            <span className="text-white">Masterpieces</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 font-light"
          >
            Where every cup is a canvas and every sip tells a story. Experience the pinnacle of coffee artistry in an ambiance designed for connoisseurs.
          </motion.p>

          {/* Animated CTA Buttons */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden group px-8 py-4 rounded-full bg-gradient-to-r from-[#bd9f67] to-[#8a6d3b] text-white font-medium text-lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Menu <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#bd9f67]/80 to-[#8a6d3b]/80 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden group px-8 py-4 rounded-full bg-transparent border-2 border-[#bd9f67] text-[#bd9f67] font-medium text-lg"
            >
              <span className="relative z-10">Book Experience</span>
              <span className="absolute inset-0 bg-[#bd9f67]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>

          {/* Animated Coffee Cup Icon */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-[#bd9f67]/10 backdrop-blur-md animate-pulse" />
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
                className="relative p-6 bg-[#bd9f67]/10 backdrop-blur-sm border border-[#bd9f67]/20 rounded-full"
              >
                <FiCoffee className="w-12 h-12 text-[#bd9f67]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Coffee Beans */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#bd9f67] opacity-20"
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
    </section>
  );
}