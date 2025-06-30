import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiUserPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import '../../assets/Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    no_hp: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validasi nama lengkap
    if (!formData.nama_lengkap.trim()) {
      newErrors.nama_lengkap = 'Nama lengkap harus diisi';
    } else if (formData.nama_lengkap.trim().length < 2) {
      newErrors.nama_lengkap = 'Nama lengkap minimal 2 karakter';
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Validasi username
    if (!formData.username.trim()) {
      newErrors.username = 'Username harus diisi';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username minimal 3 karakter';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username hanya boleh mengandung huruf, angka, dan underscore';
    }

    // Validasi password
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    // Validasi confirm password
    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Password tidak cocok';
    }

    // Validasi no hp
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!formData.no_hp.trim()) {
      newErrors.no_hp = 'Nomor HP harus diisi';
    } else if (!phoneRegex.test(formData.no_hp)) {
      newErrors.no_hp = 'Format nomor HP tidak valid';
    } else if (formData.no_hp.replace(/[^0-9]/g, '').length < 10) {
      newErrors.no_hp = 'Nomor HP minimal 10 digit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      // Insert ke database tanpa hashing password
      const { data, error } = await supabase
        .from('admin')
        .insert([
          {
            nama_lengkap: formData.nama_lengkap.trim(),
            email: formData.email.toLowerCase().trim(),
            username: formData.username.trim(),
            password: formData.password, // Password disimpan plain text
            no_hp: formData.no_hp.trim()
          }
        ])
        .select();

      if (error) {
        if (error.code === '23505') {
          // Handle unique constraint violation
          if (error.message.includes('email')) {
            setErrors({ email: 'Email sudah terdaftar' });
          } else if (error.message.includes('username')) {
            setErrors({ username: 'Username sudah digunakan' });
          }
        } else {
          console.error('Error:', error);
          setErrors({ general: 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.' });
        }
        return;
      }

      // Registrasi berhasil
      console.log('Registrasi berhasil:', data[0]);
      
      // Simpan data admin ke localStorage
      localStorage.setItem('adminData', JSON.stringify(data[0]));
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('loginTime', new Date().toISOString());

      setSuccessMessage('Admin berhasil didaftarkan! Mengalihkan ke dashboard...');
      
      // Reset form
      setFormData({
        nama_lengkap: '',
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        no_hp: ''
      });

      // Redirect ke dashboard setelah 2 detik
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa] py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-cyan-400/10 to-teal-400/10 backdrop-blur-xl"
            initial={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              opacity: 0
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 2
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
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center mb-4">
            <FiUserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-cyan-900">Daftar Admin</h2>
          <p className="mt-2 text-sm text-cyan-700">Buat akun admin baru untuk sistem</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-cyan-200/50"
        >
          {errors.general && (
            <div className="error-message">
              {errors.general}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nama Lengkap */}
            <div>
              <label htmlFor="nama_lengkap" className="block text-sm font-medium text-cyan-900 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-cyan-500" />
                </div>
                <input
                  id="nama_lengkap"
                  name="nama_lengkap"
                  type="text"
                  value={formData.nama_lengkap}
                  onChange={handleInputChange}
                  className={`register-input ${errors.nama_lengkap ? 'error' : ''}`}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              {errors.nama_lengkap && (
                <p className="mt-1 text-sm text-red-600">{errors.nama_lengkap}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyan-900 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-cyan-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`register-input ${errors.email ? 'error' : ''}`}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

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
                  placeholder="username_admin"
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
                  placeholder="Minimal 6 karakter"
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-cyan-900 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-cyan-500" />
                </div>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  className={`register-input ${errors.confirm_password ? 'error' : ''}`}
                  style={{ paddingRight: '2.5rem' }}
                  placeholder="Ulangi password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                                    {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5 text-cyan-500 hover:text-cyan-700" />
                  ) : (
                    <FiEye className="h-5 w-5 text-cyan-500 hover:text-cyan-700" />
                  )}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-red-600">{errors.confirm_password}</p>
              )}
            </div>

            {/* No HP */}
            <div>
              <label htmlFor="no_hp" className="block text-sm font-medium text-cyan-900 mb-2">
                Nomor HP
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-cyan-500" />
                </div>
                <input
                  id="no_hp"
                  name="no_hp"
                  type="tel"
                  value={formData.no_hp}
                  onChange={handleInputChange}
                  className={`register-input ${errors.no_hp ? 'error' : ''}`}
                  placeholder="08123456789"
                />
              </div>
              {errors.no_hp && (
                <p className="mt-1 text-sm text-red-600">{errors.no_hp}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`register-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FiUserPlus className={`h-5 w-5 ${isLoading ? 'text-gray-300' : 'text-cyan-300'}`} />
                </span>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Mendaftar...
                  </div>
                ) : (
                  'Daftar Admin'
                )}
              </motion.button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-cyan-600">
              Pastikan semua data yang dimasukkan sudah benar
            </p>
          </div>
        </motion.div>

        {/* Floating Elements */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/20"
            style={{
              fontSize: `${Math.random() * 15 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 1.5
            }}
          >
            •
          </motion.div>
        ))}
      </div>
    </div>
  );
}
