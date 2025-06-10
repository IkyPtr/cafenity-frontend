import { useState, useEffect } from 'react';

export default function CoffeeLoading({ text = "Brewing your coffee..." }) {
  const [steamPuffs, setSteamPuffs] = useState([0, 1, 2]);
  const [progress, setProgress] = useState(0);
  
  // Steam animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSteamPuffs(prev => prev.map(i => (i + 1) % 4));
    }, 800);
    return () => clearInterval(interval);
  }, []);
  
  // Progress simulation
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + Math.random() * 10, 100));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* Coffee Cup */}
      <div className="relative w-32 h-32">
        {/* Cup */}
        <div className="absolute bottom-0 w-full h-3/4 rounded-b-lg bg-gradient-to-b from-amber-100 to-amber-50 border-2 border-amber-300">
          {/* Coffee liquid with "brewing" animation */}
          <div 
            className="absolute bottom-0 w-full bg-gradient-to-b from-amber-800 to-amber-600 rounded-b-lg transition-all duration-1000"
            style={{ height: `${30 + (progress * 0.5)}%` }}
          />
          
          {/* Surface bubbles */}
          <div className="absolute top-0 left-0 w-full h-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-amber-200 opacity-70"
                style={{
                  width: `${3 + Math.random() * 4}px`,
                  height: `${3 + Math.random() * 4}px`,
                  top: '2px',
                  left: `${10 + (i * 20)}%`,
                  animation: `float-up ${2 + Math.random() * 3}s infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Handle */}
        <div className="absolute right-0 top-1/4 h-1/2 w-1/4 rounded-r-lg border-t-2 border-r-2 border-b-2 border-amber-300 bg-amber-50" />
        
        {/* Steam */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-full flex justify-center space-x-4">
          {steamPuffs.map((opacity, i) => (
            <div 
              key={i}
              className="w-2 h-6 bg-white rounded-full opacity-40"
              style={{
                transform: `translateY(${-opacity * 5}px)`,
                opacity: 0.6 - (opacity * 0.15),
                animation: 'steam 1.5s infinite',
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Saucer */}
      <div className="w-36 h-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200" />
      
      {/* Progress bar */}
      <div className="w-full max-w-xs bg-amber-100 rounded-full h-2.5 mt-4">
        <div 
          className="bg-gradient-to-r from-amber-600 to-amber-800 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Text with typing effect */}
      <div className="text-amber-900 font-medium mt-2 h-6">
        {text}
        <span className="animate-pulse">...</span>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-10px); opacity: 0; }
        }
        @keyframes steamy {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-10px) scale(1.1); opacity: 0.2; }
          100% { transform: translateY(-20px) scale(0.9); opacity: 0; }
        }
      `}</style>
    </div>
  );
}