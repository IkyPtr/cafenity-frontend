import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { FiCoffee } from "react-icons/fi";
import { useEffect } from "react";

export default function Logo() {
  const controls = useAnimation();
  const steamControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await steamControls.start({
        y: [-2, -8, -12, -8, -2],
        opacity: [0.8, 1, 0.8, 0.5, 0.8],
        transition: { duration: 3, repeat: Infinity }
      });
    };
    sequence();
  }, [steamControls]);

  const handleHoverStart = () => {
    controls.start({
      scale: 1.05,
      transition: { type: "spring", stiffness: 500 }
    });
    steamControls.start({
      y: [-2, -8, -12, -15, -12, -8, -2],
      opacity: [0.8, 1, 0.8, 0.5, 0.3, 0.8],
      transition: { duration: 1.5 }
    });
  };

  const handleHoverEnd = () => {
    controls.start({
      scale: 1,
      transition: { type: "spring", stiffness: 500 }
    });
  };

  return (
    <Link 
      to="/" 
      className="flex flex-col leading-tight select-none group relative"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(6,182,212,0.1) 70%, transparent 100%)"
        }}
      />

      <motion.div 
        className="flex items-baseline relative z-10"
        animate={controls}
      >
        {/* Titik Uap Sebelum Logo */}
        <div className="relative mr-2 flex items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-3 rounded-sm absolute"
              initial={{ y: 0, opacity: 0.8 }}
              animate={steamControls}
              custom={i}
              style={{
                background: "linear-gradient(135deg, #06b6d4, #10b981)",
                left: `${i * 4}px`,
                borderRadius: "2px", // agar bentuknya lebih seperti batang uap, bukan bulat
              }}
            />
          ))}
        </div>

        {/* Main Logo Text */}
        <motion.h1 
          className="text-3xl font-bold relative"
          initial={{ backgroundSize: "200% 200%" }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: "linear-gradient(90deg, #0891b2, #0d9488, #059669, #0d9488, #0891b2)",
            backgroundSize: "300% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: "0 2px 4px rgba(8, 145, 178, 0.1)"
          }}
        >
          Cafenity
          
        </motion.h1>

        {/* Animated Coffee Cup */}
        <motion.div
          className="ml-2 relative"
          animate={{
            y: [0, -4, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiCoffee 
            className="text-teal-400 drop-shadow-sm" 
            size={20} 
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full rounded-full"
            initial={{ boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.4)" }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.4)",
                "0 0 0 4px rgba(16, 185, 129, 0.4)",
                "0 0 0 8px rgba(16, 185, 129, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </motion.div>
      </motion.div>

      {/* Advanced Tagline */}
      <motion.div
        className="flex items-center mt-1 relative z-10"
        initial={{ opacity: 0, y: 5 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.3 } 
        }}
      >
        <motion.div
          className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-400"
          initial={{ width: 0 }}
          animate={{ 
            width: "100%",
            transition: { delay: 0.5, duration: 0.8 }
          }}
        />
        <motion.div
          className="h-px flex-1 bg-gradient-to-l from-transparent to-teal-400"
          initial={{ width: 0 }}
          animate={{ 
            width: "100%",
            transition: { delay: 0.5, duration: 0.8 }
          }}
        />
      </motion.div>

      {/* Micro-interaction indicator */}
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 bg-teal-400 rounded-full"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}