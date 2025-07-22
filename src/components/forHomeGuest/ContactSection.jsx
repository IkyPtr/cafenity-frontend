import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';

export default function ContactSection() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validasi form
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Semua field harus diisi');
      }

      // Insert data ke Supabase
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim()
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Gagal mengirim pesan ke database');
      }

      console.log('Message sent successfully:', data);
      setSubmitMessage('Pesan berhasil dikirim! Terima kasih atas feedback Anda.');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage(error.message || 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`py-20 transition-colors duration-300 ${isDarkTheme
        ? 'bg-gradient-to-b from-gray-900 to-gray-800'
        : 'bg-gradient-to-b from-white to-[#e0f7fa]'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 font-poppins transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-cyan-900'
            }`}>
            Kunjungi Kami
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-barlow transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
            }`}>
            Temukan kami di lokasi yang mudah dijangkau
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Alamat */}
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-colors duration-300 ${isDarkTheme
                  ? 'bg-gradient-to-br from-cyan-500 to-teal-500'
                  : 'bg-gradient-to-br from-cyan-500 to-teal-500'
                }`}>
                <FiMapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 font-poppins transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-cyan-900'
                  }`}>
                  Alamat
                </h3>
                <p className={`font-barlow transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-800/90'
                  }`}>
                  Jl. Kopi Nikmat No. 123<br />
                  Jakarta Selatan, 12345
                </p>
              </div>
            </div>

            {/* Jam Buka */}
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-colors duration-300 ${isDarkTheme
                  ? 'bg-gradient-to-br from-cyan-500 to-teal-500'
                  : 'bg-gradient-to-br from-cyan-500 to-teal-500'
                }`}>
                <FiClock className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 font-poppins transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-cyan-900'
                  }`}>
                  Jam Buka
                </h3>
                <p className={`font-barlow transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-800/90'
                  }`}>
                  Senin - Jumat: 07:00 - 22:00<br />
                  Sabtu - Minggu: 08:00 - 23:00
                </p>
              </div>
            </div>

            {/* Kontak */}
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-colors duration-300 ${isDarkTheme
                  ? 'bg-gradient-to-br from-cyan-500 to-teal-500'
                  : 'bg-gradient-to-br from-cyan-500 to-teal-500'
                }`}>
                <FiPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 font-poppins transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-cyan-900'
                  }`}>
                  Kontak
                </h3>
                <p className={`font-barlow transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-800/90'
                  }`}>
                  Telepon: (021) 1234-5678<br />
                  WhatsApp: +62 812-3456-7890
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-colors duration-300 ${isDarkTheme
                  ? 'bg-gradient-to-br from-cyan-500 to-teal-500'
                  : 'bg-gradient-to-br from-cyan-500 to-teal-500'
                }`}>
                <FiMail className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 font-poppins transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-cyan-900'
                  }`}>
                  Email
                </h3>
                <p className={`font-barlow transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-800/90'
                  }`}>
                  info@cafenity.com<br />
                  reservation@cafenity.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 shadow-lg border transition-all duration-300 ${isDarkTheme
                ? 'bg-gray-800/80 backdrop-blur-md border-gray-600/40'
                : 'bg-white/60 backdrop-blur-md border-cyan-400/20'
              }`}
          >
            <h3 className={`text-2xl font-bold mb-6 font-poppins transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-cyan-900'
              }`}>
              Kirim Pesan
            </h3>

            {/* Submit Message */}
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg ${submitMessage.includes('berhasil')
                    ? isDarkTheme
                      ? 'bg-green-800/30 text-green-300 border border-green-600/30'
                      : 'bg-green-100 text-green-800 border border-green-300'
                    : isDarkTheme
                      ? 'bg-red-800/30 text-red-300 border border-red-600/30'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
              >
                {submitMessage}
              </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Nama Lengkap */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-800'
                  }`}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nama Lengkap"
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-barlow ${isDarkTheme
                      ? 'bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700'
                      : 'bg-white/70 border-gray-300 text-cyan-900 placeholder-cyan-800/70 focus:bg-white'
                    }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-800'
                  }`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-barlow ${isDarkTheme
                      ? 'bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700'
                      : 'bg-white/70 border-gray-300 text-cyan-900 placeholder-cyan-800/70 focus:bg-white'
                    }`}
                />
              </div>

              {/* Pesan */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-800'
                  }`}>
                  Pesan
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Pesan Anda"
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-barlow resize-none ${isDarkTheme
                      ? 'bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700'
                      : 'bg-white/70 border-gray-300 text-cyan-900 placeholder-cyan-800/70 focus:bg-white'
                    }`}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isDarkTheme
    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 shadow-lg hover:shadow-cyan-500/25'
    : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-700 hover:to-teal-700 shadow-lg hover:shadow-cyan-600/25'
  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mengirim...
                  </div>
                ) : (
                  'Kirim Pesan'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Map Section - Updated to match ReservationPage style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className={`rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 ${isDarkTheme
              ? 'bg-gray-800/80 border-gray-600/40'
              : 'bg-white/60 border-cyan-400/20'
            }`}>
            <div className="p-6">
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
              <p className={`font-barlow transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
                }`}>
                Temukan kami di jantung kota dengan akses mudah dan parkir yang luas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {/* Parking Info */}
          <div className={`p-6 rounded-xl shadow-md border transition-all duration-300 ${isDarkTheme
              ? 'bg-gray-800/60 border-gray-600/30 hover:bg-gray-800/80'
              : 'bg-white/50 border-white/30 hover:bg-white/70'
            }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${isDarkTheme
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-cyan-100 text-cyan-600'
              }`}>
              🚗
            </div>
            <h4 className={`font-bold mb-2 transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-cyan-900'
              }`}>
              Parkir Gratis
            </h4>
            <p className={`text-sm transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-700'
              }`}>
              Area parkir luas dan aman tersedia untuk semua pengunjung
            </p>
          </div>

          {/* WiFi Info */}
          <div className={`p-6 rounded-xl shadow-md border transition-all duration-300 ${isDarkTheme
              ? 'bg-gray-800/60 border-gray-600/30 hover:bg-gray-800/80'
              : 'bg-white/50 border-white/30 hover:bg-white/70'
            }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${isDarkTheme
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-cyan-100 text-cyan-600'
              }`}>
              📶
            </div>
            <h4 className={`font-bold mb-2 transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-cyan-900'
              }`}>
              WiFi Gratis
            </h4>
            <p className={`text-sm transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-700'
              }`}>
              Koneksi internet cepat untuk bekerja atau bersantai
            </p>
          </div>

          {/* Accessibility Info */}
          <div className={`p-6 rounded-xl shadow-md border transition-all duration-300 ${isDarkTheme
              ? 'bg-gray-800/60 border-gray-600/30 hover:bg-gray-800/80'
              : 'bg-white/50 border-white/30 hover:bg-white/70'
            }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${isDarkTheme
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-cyan-100 text-cyan-600'
              }`}>
              ♿
            </div>
            <h4 className={`font-bold mb-2 transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-cyan-900'
              }`}>
              Akses Mudah
            </h4>
            <p className={`text-sm transition-colors duration-300 ${isDarkTheme ? 'text-gray-300' : 'text-cyan-700'
              }`}>
              Fasilitas ramah untuk semua kalangan dan penyandang disabilitas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
