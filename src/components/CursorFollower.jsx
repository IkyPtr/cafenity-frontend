import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const cursorSize = 20;
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const scale = useMotionValue(1);
  
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 300 });
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX - cursorSize / 2);
      mouseY.set(clientY - cursorSize / 2);
    };

    const handleMouseEnter = () => scale.set(1.5);
    const handleMouseLeave = () => scale.set(1);

    window.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects to interactive elements
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY, scale]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          scale: smoothScale,
        }}
      >
        {/* Main cursor dot */}
        <motion.div
          className="w-5 h-5 rounded-full bg-white"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 border-2 border-white rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Micro-interaction particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: Math.cos(i * Math.PI/2) * 15,
              y: Math.sin(i * Math.PI/2) * 15,
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Custom styles to hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}