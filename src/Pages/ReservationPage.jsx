import { useState } from 'react';
import { FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            reservation_date: formData.date,
            reservation_time: formData.time,
            guests: parseInt(formData.guests),
            special_requests: formData.specialRequests,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: 2,
          specialRequests: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Error submitting reservation:', error);
      setSubmitError('Terjadi kesalahan saat membuat reservasi. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFBDE]/30 to-white relative overflow-hidden">
      {/* Liquid glass background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#90D1CA]/20 backdrop-blur-xl"
            initial={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.6
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 1.5
            }}
            style={{
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-4">
            Reserve Your Table
          </h1>
          <p className="text-lg text-teal-600 max-w-2xl mx-auto">
            Book your perfect coffee experience at Cafenity
          </p>
        </motion.div>

        {/* Reservation Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10 max-w-3xl mx-auto"
        >
          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-teal-800 mb-2">Reservation Confirmed!</h2>
              <p className="text-teal-600 mb-6">We've sent the details to your email</p>
              <p className="text-sm text-teal-500">Thank you for choosing Cafenity</p>
            </motion.div>
          ) : (
            <>
              {/* Error Message */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <span className="text-red-700">
                    {submitError}
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-teal-600" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="pl-10 w-full bg-white/70 backdrop-blur-sm border border-white/50 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 rounded-xl py-3 px-4 text-teal-900 placeholder-teal-400 transition-all duration-300"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-teal-600" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="pl-10 w-full bg-white/70 backdrop-blur-sm border border-white/50 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 rounded-xl py-3 px-4 text-teal-900 placeholder-teal-400 transition-all duration-300"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-teal-600" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone Number"
                      className="pl-10 w-full bg-white/70 backdrop-blur-sm border border-white/50 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 rounded-xl py-3 px-4 text-teal-900 placeholder-teal-400 transition-all duration-300"
                    />
                  </div>

                  {/* Guests Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUsers className="text-teal-600" />
                    </div>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="pl-10 w-full bg-white/70 backdrop-blur-sm border border-white/50 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 rounded-xl py-3 px-4 text-teal-900 appearance-none transition-all duration-300"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                      ))}
                      <option value="9">More than 8</option>
                    </select>
                  </div>

                  {/* Date Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-teal-600" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="pl-10 w-full bg-white/70 backdrop-blur-sm border border-white/50 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 rounded-xl py-3 px-4 text-teal-900 placeholder-teal-400 transition-all duration-300"
                    />
                  </div>

                  {/* Time Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiClock className="text-teal-600" />
                    </div>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full bg-white/70 backdrop-blur-sm border border-white/50 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 rounded-xl py-3 px-4 text-teal-900 appearance-none transition-all duration-300"
                    >
                      <option value="">Select Time</option>
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="mt-6">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-teal-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Allergies, special occasions, etc."
                    className="w-full bg-white/70 backdrop-blur-sm border border-white/50 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 rounded-xl py-3 px-4 text-teal-900 placeholder-teal-400 transition-all duration-300"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center text-white ${
                      isSubmitting
                        ? 'bg-teal-400 cursor-not-allowed'
                        : 'bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Confirm Reservation'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center text-teal-700"
        >
          <p className="mb-2">For reservations of more than 8 people, please call us directly</p>
          <p className="font-medium">Opening Hours: 7:00 AM - 10:00 PM (Daily)</p>
        </motion.div>
      </div>
    </section>
  );
}

