import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiUsers, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
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

  // Set tanggal minimum ke hari ini
  const today = new Date().toISOString().split('T')[0];

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
    } catch (error) {
      setSubmitError('Terjadi kesalahan. Pastikan semua data terisi dengan benar dan coba lagi.');
      console.error('Error submitting reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
        <section className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50/50 to-cyan-50/50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-center bg-white/50 backdrop-blur-2xl p-8 md:p-12 rounded-3xl shadow-2xl shadow-cyan-500/10 max-w-lg mx-auto"
            >
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30">
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
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 mb-3">
                    Reservasi Berhasil!
                </h2>
                <p className="text-teal-700/80 mb-6 text-lg">
                    Terima kasih, {formData.name}. Meja Anda telah kami siapkan.
                </p>
                <div className="text-left bg-teal-50/70 p-4 rounded-xl border border-teal-200/50 text-teal-800 space-y-2">
                    <p><FiCalendar className="inline mr-2" /> <strong>Tanggal:</strong> {new Date(formData.reservation_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><FiClock className="inline mr-2" /> <strong>Waktu:</strong> {formData.reservation_time}</p>
                    <p><FiUsers className="inline mr-2" /> <strong>Jumlah Tamu:</strong> {formData.guest_count} orang</p>
                </div>
                <p className="text-sm text-teal-500 mt-6">Sebuah email konfirmasi akan segera dikirimkan. Sampai jumpa!</p>
            </motion.div>
        </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div className="absolute top-0 -left-24 w-72 h-72 bg-cyan-200/30 rounded-full filter blur-3xl opacity-50 animate-blob" />
            <motion.div className="absolute top-1/2 -right-24 w-72 h-72 bg-teal-200/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
            <motion.div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-100/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div 
                className="text-center mb-12"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-teal-900/90 mb-4 tracking-tight">
                    {"Pesan Tempat Anda".split(" ").map((word, i) => (
                        <motion.span key={i} variants={itemVariants} className="inline-block mr-3">
                            {word}
                        </motion.span>
                    ))}
                </h1>
                <motion.p variants={itemVariants} className="text-lg text-teal-700/80 max-w-2xl mx-auto">
                    Amankan meja Anda untuk pengalaman ngopi terbaik di Cafenity.
                </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                    className="lg:col-span-3 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl shadow-cyan-500/10 p-6 sm:p-8 lg:p-10"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-6 sm:grid-cols-2">
                            {/* Input fields */}
                            {[
                                { name: 'name', type: 'text', placeholder: 'Nama Lengkap', icon: FiUser, required: true },
                                { name: 'email', type: 'email', placeholder: 'Alamat Email', icon: FiMail, required: true },
                                { name: 'phone', type: 'tel', placeholder: 'Nomor Telepon', icon: FiPhone, required: true },
                            ].map(field => (
                                <motion.div variants={itemVariants} key={field.name} className="relative">
                                    <field.icon className="absolute top-1/2 left-4 -translate-y-1/2 text-teal-600/70" />
                                    <input {...field} value={formData[field.name]} onChange={handleChange} className="pl-12 w-full bg-white/70 border-2 border-transparent focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/20 rounded-xl py-3.5 px-4 text-teal-900 placeholder-teal-500/80 transition-all duration-300 outline-none"/>
                                </motion.div>
                            ))}

                            {/* Guest Counter - Desain Baru yang Lebih Rapi */}
                            <motion.div 
                                variants={itemVariants} 
                                className="bg-white/70 border-2 border-transparent rounded-xl flex items-center justify-between py-2.5 px-4 sm:col-span-2"
                            >
                                <div className="flex items-center">
                                    <FiUsers className="text-teal-600/70 mr-4" />
                                    <span className="text-teal-900 placeholder-teal-500/80">Jumlah Tamu</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        type="button" 
                                        onClick={() => handleGuestChange(-1)} 
                                        className="w-8 h-8 rounded-full bg-teal-100/80 text-teal-700 hover:bg-teal-200 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed" 
                                        disabled={formData.guest_count <= 1}
                                    >
                                        <FiMinus />
                                    </button>
                                    <span className="text-lg font-bold text-teal-800 w-8 text-center">{formData.guest_count}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => handleGuestChange(1)} 
                                        className="w-8 h-8 rounded-full bg-teal-100/80 text-teal-700 hover:bg-teal-200 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed" 
                                        disabled={formData.guest_count >= 12}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Date Field */}
                            <motion.div variants={itemVariants} className="relative">
                                <FiCalendar className="absolute top-1/2 left-4 -translate-y-1/2 text-teal-600/70" />
                                <input type="date" name="reservation_date" value={formData.reservation_date} onChange={handleChange} required min={today} className="pl-12 w-full bg-white/70 border-2 border-transparent focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/20 rounded-xl py-3.5 px-4 text-teal-900 placeholder-teal-500/80 transition-all duration-300 outline-none [color-scheme:light]"/>
                            </motion.div>

                            {/* Time Field */}
                            <motion.div variants={itemVariants} className="relative">
                                <FiClock className="absolute top-1/2 left-4 -translate-y-1/2 text-teal-600/70" />
                                <select name="reservation_time" value={formData.reservation_time} onChange={handleChange} required className="pl-12 w-full bg-white/70 border-2 border-transparent focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/20 rounded-xl py-3.5 px-4 text-teal-900 appearance-none transition-all duration-300 outline-none">
                                    <option value="" disabled>Pilih Waktu</option>
                                    {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map(time => (<option key={time} value={time}>{time}</option>))}
                                </select>
                            </motion.div>
                        </motion.div>

                        {/* Special Request */}
                        <motion.div variants={itemVariants}>
                            <textarea name="special_requests" value={formData.special_requests} onChange={handleChange} rows={3} placeholder="Permintaan Khusus (opsional)" className="w-full bg-white/70 border-2 border-transparent focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/20 rounded-xl py-3 px-4 text-teal-900 placeholder-teal-500/80 transition-all duration-300 outline-none resize-none"/>
                        </motion.div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {submitError && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-3 bg-red-100 border border-red-300 rounded-lg text-center text-red-800 text-sm"
                                >
                                    {submitError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants}>
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-cyan-500/40"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    'Konfirmasi Reservasi'
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>

                {/* Info Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                    className="lg:col-span-2 space-y-8"
                >
                    <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8">
                         <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center"><FiClock className="mr-3 text-teal-600"/> Jam Buka</h3>
                         <ul className="space-y-2 text-teal-700/90">
                            <li><strong>Senin - Jumat:</strong> 07:00 - 22:00</li>
                            <li><strong>Sabtu - Minggu:</strong> 08:00 - 23:00</li>
                         </ul>
                    </div>
                     <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8">
                         <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center"><FiPhone className="mr-3 text-teal-600"/> Butuh Bantuan?</h3>
                         <p className="text-teal-700/90">
                            Untuk reservasi lebih dari 12 orang atau pertanyaan lainnya, silakan hubungi kami langsung di <strong className="text-teal-800">(021) 1234-5678</strong>.
                         </p>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
  );
}