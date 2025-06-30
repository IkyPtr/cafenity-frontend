import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut, FiCheck } from 'react-icons/fi';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Fungsi untuk logout
    const performLogout = () => {
      try {
        // Hapus semua data session admin
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminData');
        localStorage.removeItem('loginTime');
        
        // Optional: Hapus semua localStorage (jika diperlukan)
        // localStorage.clear();
        
        // Optional: Hapus sessionStorage juga
        sessionStorage.clear();
        
        console.log('Logout berhasil - Session cleared');
        
        // Redirect ke login setelah 2 detik
        setTimeout(() => {
          navigate('/login', { 
            replace: true,
            state: { message: 'Anda telah berhasil logout' }
          });
        }, 2000);
        
      } catch (error) {
        console.error('Error during logout:', error);
        // Tetap redirect meskipun ada error
        navigate('/login', { replace: true });
      }
    };

    // Jalankan logout
    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(20, 184, 166, 0.1))',
              filter: 'blur(30px)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 1
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-cyan-200/50 text-center"
        >
          {/* Logout Icon with Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-6"
            style={{
              background: 'linear-gradient(to right, #ef4444, #dc2626)',
              boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
            }}
          >
            <FiLogOut className="h-8 w-8 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-cyan-900 mb-4"
          >
            Logging Out...
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-cyan-700 mb-6"
          >
            Menghapus session dan mengalihkan ke halaman login
          </motion.p>

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full"
            />
            <span className="text-cyan-600 text-sm">Memproses logout...</span>
          </motion.div>

          {/* Success Checkmark (appears after 1 second) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
            className="mt-4"
          >
            <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center bg-green-100">
              <FiCheck className="h-6 w-6 text-green-600" />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-green-600 text-sm mt-2 font-medium"
            >
              Logout berhasil!
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6"
          >
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2 rounded-full"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-xs text-cyan-600 mt-2"
            >
              Mengalihkan ke halaman login...
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-cyan-600">
            Terima kasih telah menggunakan Cafenity Admin Panel
          </p>
        </motion.div>
      </div>
    </div>
  );
}
