import { useState, useEffect } from 'react';
import { FiCoffee } from 'react-icons/fi';

export default function CoffeeLoading({ text = "Preparing your Cafenity experience..." }) {
  const [progress, setProgress] = useState(0);
  const [liquidLevel, setLiquidLevel] = useState(0);
  const [bubbles, setBubbles] = useState([]);
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

  // Generate random bubbles
  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setBubbles(prev => [
          ...prev.slice(-15), // Keep only last 15 bubbles
          {
            id: Date.now(),
            size: 4 + Math.random() * 6,
            left: 10 + Math.random() * 80,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2
          }
        ]);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [progress]);

  // Progress simulation with liquid fill effect
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        const increment = 1 + Math.random() * 4;
        setProgress(prev => Math.min(prev + increment, 100));
        setLiquidLevel(prev => Math.min(prev + (increment * 0.5), 50));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-cyan-900/70' 
        : 'bg-[#FFFBDE]/50'
    }`}>
      {/* Liquid glass container */}
      <div className={`relative backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-md mx-4 overflow-hidden transition-all duration-300 ${
        isDarkTheme
          ? 'bg-gray-800/40 border border-cyan-700/40'
          : 'bg-white/30 border border-white/40'
      }`}>
        {/* Animated liquid glass background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full backdrop-blur-sm transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-cyan-400/15'
                  : 'bg-[#90D1CA]/20'
              }`}
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(30px)',
                opacity: 0.4,
                animation: `float ${Math.random() * 10 + 5}s infinite alternate ease-in-out`,
                animationDelay: `${i * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Coffee Cup with Liquid Glass Effect */}
          <div className="relative w-40 h-40 mb-6">
            {/* Cup */}
            <div className={`absolute bottom-0 w-full h-3/4 rounded-b-[40px] border-2 shadow-inner transition-all duration-300 ${
              isDarkTheme
                ? 'bg-gradient-to-b from-gray-700 to-gray-800 border-cyan-600/70'
                : 'bg-gradient-to-b from-white to-[#FFFBDE] border-white/70'
            }`}>
              {/* Coffee liquid with realistic surface */}
              <div 
                className={`absolute bottom-0 w-full rounded-b-[36px] transition-all duration-1000 overflow-hidden ${
                  isDarkTheme
                    ? 'bg-gradient-to-b from-cyan-600 to-cyan-800'
                    : 'bg-gradient-to-b from-[#096B68] to-[#129990]'
                }`}
                style={{ height: `${liquidLevel}%` }}
              >
                {/* Bubbles */}
                {bubbles.map(bubble => (
                  <div 
                    key={bubble.id}
                    className={`absolute rounded-full transition-all duration-300 ${
                      isDarkTheme
                        ? 'bg-cyan-300/70'
                        : 'bg-[#90D1CA]/70'
                    }`}
                    style={{
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      bottom: '5px',
                      left: `${bubble.left}%`,
                      animation: `float-up ${bubble.duration}s infinite`,
                      animationDelay: `${bubble.delay}s`
                    }}
                  />
                ))}
              </div>
              
              {/* Cup rim */}
              <div className={`absolute top-0 w-full h-4 rounded-t-full border-t-2 transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-cyan-600/70'
                  : 'bg-gradient-to-r from-[#FFFBDE] to-white border-white/70'
              }`} />
            </div>
            
            {/* Handle */}
            <div className={`absolute right-0 top-1/4 h-1/2 w-1/4 rounded-r-2xl border-t-2 border-r-2 border-b-2 transition-all duration-300 ${
              isDarkTheme
                ? 'border-cyan-600/70 bg-gray-700'
                : 'border-white/70 bg-[#FFFBDE]'
            }`} />
            
            {/* Steam */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-full flex justify-center space-x-6">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className={`w-3 h-8 rounded-full transition-all duration-300 ${
                    isDarkTheme
                      ? 'bg-cyan-300/60'
                      : 'bg-white/80'
                  }`}
                  style={{
                    opacity: 0.5 - (i * 0.1),
                    animation: 'steam 2s infinite ease-out',
                    animationDelay: `${i * 0.4}s`,
                    filter: 'blur(2px)'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Saucer */}
          <div className={`w-44 h-3 rounded-full shadow-md border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-cyan-600/50'
              : 'bg-gradient-to-r from-[#FFFBDE] to-white border-white/50'
          }`} />
          
          {/* Progress indicator */}
          <div className="w-full max-w-xs mt-8">
            <div className="flex justify-between items-center mb-2">
              <FiCoffee className={`text-lg transition-colors duration-300 ${
                isDarkTheme ? 'text-cyan-400' : 'text-[#096B68]'
              }`} />
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isDarkTheme ? 'text-cyan-300' : 'text-[#096B68]'
              }`}>{progress}%</span>
            </div>
            <div className={`w-full rounded-full h-2.5 overflow-hidden transition-all duration-300 ${
              isDarkTheme
                ? 'bg-gray-700/70'
                : 'bg-[#FFFBDE]/70'
            }`}>
              <div 
                className={`h-full rounded-full transition-all duration-300 shadow-inner ${
                  isDarkTheme
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-600'
                    : 'bg-gradient-to-r from-[#90D1CA] to-[#096B68]'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Text with elegant typography */}
          <p className={`mt-6 text-center font-medium text-lg transition-colors duration-300 ${
            isDarkTheme ? 'text-cyan-200' : 'text-[#096B68]'
          }`}>
            {text}
            <span className="inline-block animate-pulse">
              {progress < 100 ? '...' : '!'}
            </span>
          </p>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-40px) scale(0.8); opacity: 0; }
        }
        @keyframes steam {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-15px) scale(1.2); opacity: 0.2; }
          100% { transform: translateY(-30px) scale(0.8); opacity: 0; }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
