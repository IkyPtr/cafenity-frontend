import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiUsers, FiMinus, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Framer Motion Variants untuk animasi yang elegan
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function ReservationPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reservation_date: '',
    reservation_time: '',
    guest_count: 2,
    special_requests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [countdown, setCountdown] = useState(7);

  // Set tanggal minimum ke hari ini
  const today = new Date().toISOString().split('T')[0];

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

  // Countdown timer untuk auto-close success message
  useEffect(() => {
    let timer;
    if (submitSuccess && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (submitSuccess && countdown === 0) {
      handleCloseSuccess();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [submitSuccess, countdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleGuestChange = (amount) => {
      setFormData(prev => ({
          ...prev,
          guest_count: Math.max(1, Math.min(12, prev.guest_count + amount)) // Batasi antara 1 dan 12
      }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const { data, error } = await supabase.from('reservations').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          reservation_date: formData.reservation_date,
          reservation_time: formData.reservation_time,
          guest_count: parseInt(formData.guest_count, 10),
          special_requests: formData.special_requests || null,
        },
      ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setCountdown(7); // Reset countdown
    } catch (error) {
      setSubmitError('Terjadi kesalahan. Pastikan semua data terisi dengan benar dan coba lagi.');
      console.error('Error submitting reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setSubmitSuccess(false);
    setCountdown(7);
    // Reset form data
    setFormData({
      name: '',
      email: '',
      phone: '',
      reservation_date: '',
      reservation_time: '',
      guest_count: 2,
      special_requests: '',
    });
  };

  if (submitSuccess) {
    return (
        <section className={`min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDarkTheme 
            ? 'bg-gradient-to-br from-gray-900/90 to-gray-800/90' 
            : 'bg-gradient-to-br from-teal-50/50 to-cyan-50/50'
        }`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`relative text-center p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg mx-auto transition-all duration-300 ${
                  isDarkTheme
                    ? 'bg-gray-800/50 backdrop-blur-2xl shadow-cyan-500/20'
                    : 'bg-white/50 backdrop-blur-2xl shadow-cyan-500/10'
                }`}
            >
                {/* Close Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    onClick={handleCloseSuccess}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                      isDarkTheme
                        ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70 hover:text-white'
                        : 'bg-white/50 text-gray-600 hover:bg-white/80 hover:text-gray-800'
                    }`}
                    title="Tutup"
                >
                    <FiX className="w-5 h-5" />
                </motion.button>

                {/* Countdown Timer */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                      isDarkTheme
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                    }`}
                >
                    Auto tutup: {countdown}s
                </motion.div>

                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${
                  isDarkTheme
                    ? 'bg-gradient-to-br from-teal-500 to-cyan-600 shadow-cyan-500/40'
                    : 'bg-gradient-to-br from-teal-400 to-cyan-500 shadow-cyan-500/30'
                }`}>
                    <motion.svg
                        className="w-16 h-16 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </motion.svg>
                </div>
                
                <h2 className={`text-3xl font-bold mb-3 ${
                  isDarkTheme
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600'
                }`}>
                    Reservasi Berhasil!
                </h2>
                
                <p className={`mb-6 text-lg ${
                  isDarkTheme ? 'text-gray-300' : 'text-teal-700/80'
                }`}>
                    Terima kasih, {formData.name}. Meja Anda telah kami siapkan.
                </p>
                
                <div className={`text-left p-4 rounded-xl border space-y-2 mb-6 ${
                  isDarkTheme
                    ? 'bg-gray-700/70 border-gray-600/50 text-gray-200'
                    : 'bg-teal-50/70 border-teal-200/50 text-teal-800'
                }`}>
                    <p><FiCalendar className="inline mr-2" /> <strong>Tanggal:</strong> {new Date(formData.reservation_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><FiClock className="inline mr-2" /> <strong>Waktu:</strong> {formData.reservation_time}</p>
                    <p><FiUsers className="inline mr-2" /> <strong>Jumlah Tamu:</strong> {formData.guest_count} orang</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCloseSuccess}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                          isDarkTheme
                            ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg shadow-teal-500/25'
                            : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/25'
                        }`}
                    >
                        Buat Reservasi Lagi
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.location.href = '/menu'}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold border-2 transition-all duration-300 ${
                          isDarkTheme
                            ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
                            : 'border-teal-500 text-teal-600 hover:bg-teal-50'
                        }`}
                    >
                        Lihat Menu
                    </motion.button>
                </div>

                <p className={`text-sm ${
                  isDarkTheme ? 'text-gray-400' : 'text-teal-500'
                }`}>
                  Sebuah email konfirmasi akan segera dikirimkan. Sampai jumpa!
                </p>

                {/* Progress Bar */}
                <div className={`mt-4 w-full h-1 rounded-full overflow-hidden ${
                  isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                    <motion.div
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: 7, ease: 'linear' }}
                        className={`h-full transition-colors duration-300 ${
                          isDarkTheme
                            ? 'bg-gradient-to-r from-cyan-400 to-teal-400'
                            : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                        }`}
                    />
                </div>
            </motion.div>
        </section>
    );
  }

  return (
    <section className={`min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900/90 to-gray-800/90' 
        : 'bg-gradient-to-br from-teal-50/50 to-cyan-50/50'
    }`}>
        {/* Animated background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div className={`absolute top-0 -left-24 w-72 h-72 rounded-full filter blur-3xl opacity-50 animate-blob ${
              isDarkTheme ? 'bg-cyan-600/20' : 'bg-cyan-200/30'
            }`} />
            <motion.div className={`absolute top-1/2 -right-24 w-72 h-72 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000 ${
              isDarkTheme ? 'bg-teal-600/20' : 'bg-teal-200/30'
            }`} />
            <motion.div className={`absolute bottom-0 left-1/4 w-72 h-72 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000 ${
              isDarkTheme ? 'bg-cyan-500/20' : 'bg-cyan-100/30'
            }`} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div 
                className="text-center mb-12"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight ${
                  isDarkTheme
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600'
                }`}>
                    Reservasi Meja
                </h1>
                <motion.p 
                    variants={itemVariants}
                    className={`text-lg md:text-xl max-w-2xl mx-auto ${
                      isDarkTheme ? 'text-gray-300' : 'text-teal-700/80'
                    }`}
                >
                    Nikmati pengalaman kuliner terbaik dengan reservasi yang mudah dan cepat
                </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`p-8 rounded-3xl shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
                      isDarkTheme
                        ? 'bg-gray-800/50 border-gray-600/30 shadow-cyan-500/10'
                        : 'bg-white/50 border-white/30 shadow-teal-500/10'
                    }`}
                >
                    <h2 className={`text-2xl font-bold mb-6 ${
                      isDarkTheme ? 'text-white' : 'text-teal-800'
                    }`}>
                        Detail Reservasi
                    </h2>

                    {submitError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-6 p-4 rounded-xl border transition-colors duration-300 ${
                              isDarkTheme
                                ? 'bg-red-900/20 border-red-500/30 text-red-400'
                                : 'bg-red-50 border-red-200 text-red-600'
                            }`}
                        >
                            <div className="flex items-center">
                                <FiX className="w-5 h-5 mr-2" />
                                {submitError}
                            </div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <motion.div variants={itemVariants}>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                            }`}>
                                <FiUser className="inline mr-2" />
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                                  isDarkTheme
                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500'
                                    : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500'
                                }`}
                                placeholder="Masukkan nama lengkap"
                            />
                        </motion.div>

                        {/* Email Field */}
                        <motion.div variants={itemVariants}>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                            }`}>
                                <FiMail className="inline mr-2" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                                  isDarkTheme
                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500'
                                    : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500'
                                }`}
                                placeholder="nama@email.com"
                            />
                        </motion.div>

                        {/* Phone Field */}
                        <motion.div variants={itemVariants}>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                            }`}>
                                <FiPhone className="inline mr-2" />
                                Nomor Telepon
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                                  isDarkTheme
                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500'
                                    : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500'
                                }`}
                                placeholder="08xxxxxxxxxx"
                            />
                        </motion.div>

                        {/* Date and Time Row */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Date Field */}
                            <motion.div variants={itemVariants}>
                                <label className={`block text-sm font-medium mb-2 ${
                                  isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                                }`}>
                                    <FiCalendar className="inline mr-2" />
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    name="reservation_date"
                                    value={formData.reservation_date}
                                    onChange={handleChange}
                                    min={today}
                                    required
                                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                                      isDarkTheme
                                        ? 'bg-gray-700/50 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500'
                                        : 'bg-white/70 border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                    }`}
                                />
                            </motion.div>

                            {/* Time Field */}
                            <motion.div variants={itemVariants}>
                                <label className={`block text-sm font-medium mb-2 ${
                                  isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                                }`}>
                                    <FiClock className="inline mr-2" />
                                    Waktu
                                </label>
                                <input
                                    type="time"
                                    name="reservation_time"
                                    value={formData.reservation_time}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                                      isDarkTheme
                                        ? 'bg-gray-700/50 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500'
                                        : 'bg-white/70 border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                    }`}
                                />
                            </motion.div>
                        </div>

                        {/* Guest Count */}
                        <motion.div variants={itemVariants}>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                            }`}>
                                <FiUsers className="inline mr-2" />
                                Jumlah Tamu
                            </label>
                            <div className="flex items-center space-x-4">
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleGuestChange(-1)}
                                    className={`p-2 rounded-full transition-all duration-300 ${
                                      isDarkTheme
                                        ? 'bg-gray-700 text-cyan-400 hover:bg-gray-600'
                                        : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                                    }`}
                                >
                                    <FiMinus className="w-4 h-4" />
                                </motion.button>
                                <span className={`text-xl font-semibold min-w-[3rem] text-center ${
                                  isDarkTheme ? 'text-white' : 'text-teal-800'
                                }`}>
                                    {formData.guest_count}
                                </span>
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleGuestChange(1)}
                                    className={`p-2 rounded-full transition-all duration-300 ${
                                      isDarkTheme
                                        ? 'bg-gray-700 text-cyan-400 hover:bg-gray-600'
                                        : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                                    }`}
                                >
                                    <FiPlus className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Special Requests */}
                        <motion.div variants={itemVariants}>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                            }`}>
                                Permintaan Khusus (Opsional)
                            </label>
                            <textarea
                                name="special_requests"
                                value={formData.special_requests}
                                onChange={handleChange}
                                rows={3}
                                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 resize-none ${
                                  isDarkTheme
                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500'
                                    : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500'
                                }`}
                                placeholder="Contoh: Meja dekat jendela, kursi bayi, dll."
                            />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                              isDarkTheme
                                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-lg shadow-cyan-500/25'
                                : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/25'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                    />
                                    Memproses Reservasi...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <FiCheck className="w-5 h-5 mr-2" />
                                    Konfirmasi Reservasi
                                </div>
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-6"
                >
                    {/* Restaurant Info Card */}
                    <div className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                      isDarkTheme
                        ? 'bg-gray-800/50 border-gray-600/30'
                        : 'bg-white/50 border-white/30'
                    }`}>
                        <h3 className={`text-xl font-bold mb-4 ${
                          isDarkTheme ? 'text-white' : 'text-teal-800'
                        }`}>
                            Informasi Penting
                        </h3>
                                                <div className="space-y-3">
                            <div className={`flex items-start space-x-3 ${
                              isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                            }`}>
                                <FiClock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium">Jam Operasional</p>
                                    <p className="text-sm opacity-80">
                                        Senin - Jumat: 07:00 - 22:00<br />
                                        Sabtu - Minggu: 08:00 - 23:00
                                    </p>
                                </div>
                            </div>
                            <div className={`flex items-start space-x-3 ${
                              isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                            }`}>
                                <FiUsers className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium">Kapasitas Meja</p>
                                    <p className="text-sm opacity-80">
                                        Maksimal 12 orang per reservasi
                                    </p>
                                </div>
                            </div>
                            <div className={`flex items-start space-x-3 ${
                              isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                            }`}>
                                <FiPhone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium">Kontak Darurat</p>
                                    <p className="text-sm opacity-80">
                                        (021) 1234-5678<br />
                                        WhatsApp: +62 812-3456-7890
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Policies Card */}
                    <div className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                      isDarkTheme
                        ? 'bg-gray-800/50 border-gray-600/30'
                        : 'bg-white/50 border-white/30'
                    }`}>
                        <h3 className={`text-xl font-bold mb-4 ${
                          isDarkTheme ? 'text-white' : 'text-teal-800'
                        }`}>
                            Kebijakan Reservasi
                        </h3>
                        <div className={`space-y-2 text-sm ${
                          isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                        }`}>
                            <p>• Reservasi dapat dibatalkan maksimal 2 jam sebelum waktu kedatangan</p>
                            <p>• Toleransi keterlambatan maksimal 15 menit</p>
                            <p>• Meja akan dilepas jika tamu tidak hadir tanpa konfirmasi</p>
                            <p>• Konfirmasi reservasi akan dikirim via email dan WhatsApp</p>
                            <p>• Untuk grup lebih dari 8 orang, harap hubungi langsung</p>
                        </div>
                    </div>

                    {/* Special Offers Card */}
                    <div className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                      isDarkTheme
                        ? 'bg-gradient-to-br from-cyan-900/30 to-teal-900/30 border-cyan-500/30'
                        : 'bg-gradient-to-br from-cyan-50/50 to-teal-50/50 border-cyan-200/50'
                    }`}>
                        <h3 className={`text-xl font-bold mb-4 ${
                          isDarkTheme
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600'
                        }`}>
                            Penawaran Spesial
                        </h3>
                        <div className={`space-y-3 ${
                          isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                        }`}>
                            <div className={`p-3 rounded-lg ${
                              isDarkTheme ? 'bg-cyan-500/10' : 'bg-cyan-100/50'
                            }`}>
                                <p className="font-medium">Happy Hour</p>
                                <p className="text-sm opacity-80">Diskon 20% untuk minuman (14:00-17:00)</p>
                            </div>
                            <div className={`p-3 rounded-lg ${
                              isDarkTheme ? 'bg-teal-500/10' : 'bg-teal-100/50'
                            }`}>
                                <p className="font-medium">Weekend Special</p>
                                <p className="text-sm opacity-80">Free dessert untuk reservasi 4+ orang</p>
                            </div>
                        </div>
                    </div>

                    {/* Location Preview */}
                    <div className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                      isDarkTheme
                        ? 'bg-gray-800/50 border-gray-600/30'
                        : 'bg-white/50 border-white/30'
                    }`}>
                        <h3 className={`text-xl font-bold mb-4 ${
                          isDarkTheme ? 'text-white' : 'text-teal-800'
                        }`}>
                            Lokasi Kami
                        </h3>
                        <div className={`aspect-video rounded-lg overflow-hidden mb-4 ${
                          isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                            <img
                                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Cafenity Location"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className={`text-sm ${
                          isDarkTheme ? 'text-gray-300' : 'text-teal-700'
                        }`}>
                            <p className="font-medium mb-1">Jl. Kopi Nikmat No. 123</p>
                            <p className="opacity-80">Jakarta Selatan, 12345</p>
                            <p className="opacity-80 mt-2">
                                Mudah diakses dengan transportasi umum dan tersedia parkir gratis
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
            @keyframes blob {
                0% {
                    transform: translate(0px, 0px) scale(1);
                }
                33% {
                    transform: translate(30px, -50px) scale(1.1);
                }
                66% {
                    transform: translate(-20px, 20px) scale(0.9);
                }
                100% {
                    transform: translate(0px, 0px) scale(1);
                }
            }
            .animate-blob {
                animation: blob 7s infinite;
            }
            .animation-delay-2000 {
                animation-delay: 2s;
            }
            .animation-delay-4000 {
                animation-delay: 4s;
            }
        `}</style>
    </section>
  );
}
