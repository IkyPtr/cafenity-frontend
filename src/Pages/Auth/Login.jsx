import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiLogIn, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import '../../assets/Register.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ambil halaman yang ingin diakses sebelum login
  const from = location.state?.from || '/dashboard';

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

  // Test koneksi Supabase
  const testSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('admin')
        .select('count')
        .limit(1);
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Connection test failed:', error);
      return { success: false, error };
    }
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
      // Test koneksi terlebih dahulu
      const connectionTest = await testSupabaseConnection();
      if (!connectionTest.success) {
        throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
      }

      // Lakukan query dengan timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 detik timeout
      });

      const queryPromise = supabase
        .from('admin')
        .select('id, nama_lengkap, email, username, no_hp, created_at')
        .eq('username', formData.username.trim())
        .eq('password', formData.password)
        .single();

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

      if (error) {
        console.error('Database error:', error);
        
        if (error.code === 'PGRST116') {
          setLoginAttempts(prev => prev + 1);
          setErrors({ 
            general: 'Username atau password salah. Silakan coba lagi.' 
          });
        } else if (error.message && error.message.includes('Failed to fetch')) {
          setErrors({ 
            general: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.' 
          });
        } else {
          setErrors({ 
            general: 'Terjadi kesalahan sistem. Silakan coba lagi.' 
          });
        }
        return;
      }

      // Login berhasil
      console.log('Login berhasil:', data);
      
      // Simpan data admin ke localStorage
      const adminData = {
        id: data.id,
        nama_lengkap: data.nama_lengkap,
        email: data.email,
        username: data.username,
        no_hp: data.no_hp,
        created_at: data.created_at
      };

      localStorage.setItem('adminData', JSON.stringify(adminData));
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('loginTime', new Date().toISOString());

      setLoginAttempts(0);
      setSuccessMessage(`Selamat datang, ${data.nama_lengkap}! Mengalihkan...`);
      
      setFormData({
        username: '',
        password: ''
      });

      // Redirect ke halaman yang ingin diakses atau dashboard
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      
      // Handle berbagai jenis error
      if (error.message === 'Request timeout') {
        setErrors({ 
          general: 'Koneksi timeout. Silakan coba lagi.' 
        });
      } else if (error.message && error.message.includes('Failed to fetch')) {
        setErrors({ 
          general: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.' 
        });
      } else if (error.message && error.message.includes('NetworkError')) {
        setErrors({ 
          general: 'Terjadi kesalahan jaringan. Silakan coba lagi.' 
        });
      } else {
        setErrors({ 
          general: error.message || 'Terjadi kesalahan saat login. Silakan coba lagi.' 
        });
      }
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
          {/* Tampilkan pesan jika user diarahkan dari halaman admin */}
          {location.state?.from && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-amber-600 mt-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200"
            >
              🔒 Silakan login untuk mengakses halaman admin
            </motion.p>
          )}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
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
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-cyan-700">
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot"
                  className="font-medium text-cyan-600 hover:text-cyan-500 transition-colors"
                >
                  Lupa password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <motion.button
                type="submit"
                disabled={isLoading || loginAttempts >= 5}
                className="register-button"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Memproses...
                  </div>
                ) : (
                                    <div className="flex items-center justify-center">
                    <FiLogIn className="h-5 w-5 mr-2" />
                    Masuk
                  </div>
                )}
              </motion.button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-cyan-700">
              Belum punya akun admin?{' '}
              <a
                href="/register"
                className="font-medium text-cyan-600 hover:text-cyan-500 transition-colors"
              >
                Daftar di sini
              </a>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-cyan-600">
            © 2024 Cafenity. Semua hak dilindungi.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
