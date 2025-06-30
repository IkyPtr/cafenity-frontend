import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiLogIn, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import '../../assets/Register.css';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username harus diisi';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username minimal 3 karakter';
    }

    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  if (loginAttempts >= 5) {
    setErrors({
      general: 'Terlalu banyak percobaan login. Silakan tunggu beberapa menit.'
    });
    return;
  }

  setIsLoading(true);
  setErrors({});
  setSuccessMessage('');

  try {
    const username = formData.username.trim();
    const password = formData.password;

    const { data: adminData, error } = await supabase
      .from('admin')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !adminData) {
      setLoginAttempts(prev => prev + 1);
      setErrors({ general: 'Username atau password salah. Silakan coba lagi.' });
      return;
    }

    // Login sukses
    localStorage.setItem('adminData', JSON.stringify(adminData));
    localStorage.setItem('isAdminLoggedIn', 'true');
    localStorage.setItem('loginTime', new Date().toISOString());

    setLoginAttempts(0);
    setSuccessMessage(`Selamat datang, ${adminData.nama_lengkap}! Mengalihkan ke dashboard...`);

    setFormData({ username: '', password: '' });

    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);

  } catch (error) {
    console.error('Login error:', error);
    setErrors({
      general: 'Terjadi kesalahan saat login. Silakan coba lagi.'
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa] py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 250 + 100}px`,
              height: `${Math.random() * 250 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(20, 184, 166, 0.1))',
              filter: 'blur(30px)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div 
            className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-6"
            style={{
              background: 'linear-gradient(to right, #0891b2, #0d9488)',
              boxShadow: '0 10px 25px rgba(8, 145, 178, 0.3)'
            }}
          >
            <FiLogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-cyan-900 mb-2">
            Login Admin
          </h2>
          <p className="text-base text-cyan-700">
            Masuk ke panel administrasi Cafenity
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-cyan-200/50"
        >
          {errors.general && (
            <div className="error-message">
              <FiAlertCircle className="inline h-4 w-4 mr-2" />
              {errors.general}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          {loginAttempts > 0 && loginAttempts < 5 && (
            <div className="warning-message">
              Percobaan login: {loginAttempts}/5
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-cyan-900 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-cyan-500" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`register-input ${errors.username ? 'error' : ''}`}
                  placeholder="Masukkan username"
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cyan-900 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-cyan-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`register-input ${errors.password ? 'error' : ''}`}
                  style={{ paddingRight: '2.5rem' }}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-cyan-500 hover:text-cyan-700" />
                  ) : (
                    <FiEye className="h-5 w-5 text-cyan-500 hover:text-cyan-700" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-cyan-700">
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <a 
                  href="#" 
                  className="font-medium text-cyan-600 hover:text-cyan-500 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Fitur reset password belum tersedia. Hubungi administrator.');
                  }}
                >
                  Lupa password?
                </a>
              </div>
            </div>

                       {/* Submit Button */}
            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading || loginAttempts >= 5}
                className={`register-button ${isLoading || loginAttempts >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FiLogIn className={`h-5 w-5 ${isLoading ? 'text-gray-300' : 'text-cyan-300'}`} />
                </span>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Masuk...
                  </div>
                ) : (
                  'Masuk'
                )}
              </motion.button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-cyan-600">
              Hanya admin yang memiliki akses ke sistem ini
            </p>
          </div>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-cyan-700">
              Belum punya akun admin?{' '}
              <a 
                href="/register" 
                className="font-medium text-cyan-600 hover:text-cyan-500 hover:underline"
              >
                Daftar di sini
              </a>
            </p>
          </div>
        </motion.div>

        {/* Floating Elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              fontSize: `${Math.random() * 12 + 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: 'rgba(6, 182, 212, 0.15)'
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 1
            }}
          >
            ☕
          </motion.div>
        ))}
      </div>
    </div>
  );
}
