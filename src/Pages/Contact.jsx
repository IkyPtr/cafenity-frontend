import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock,
  FiSend
} from 'react-icons/fi';

export default function Contact() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-hero mb-4 font-poppins" style={{ color: 'var(--color-cafenity-dark)' }}>
            Hubungi Kami
          </h1>
          <p className="text-lg max-w-2xl mx-auto font-barlow" style={{ color: 'var(--color-teks-samping)' }}>
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-cafenity-primary)' }}
              >
                <FiMapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 font-poppins" style={{ color: 'var(--color-cafenity-dark)' }}>
                  Alamat
                </h3>
                <p className="font-barlow" style={{ color: 'var(--color-teks-samping)' }}>
                  Jl. Kopi Nikmat No. 123<br />
                  Jakarta Selatan, 12345
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-cafenity-primary)' }}
              >
                <FiPhone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 font-poppins" style={{ color: 'var(--color-cafenity-dark)' }}>
                  Telepon
                </h3>
                <p className="font-barlow" style={{ color: 'var(--color-teks-samping)' }}>
                  +62 812-3456-7890
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-cafenity-primary)' }}
              >
                <FiMail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 font-poppins" style={{ color: 'var(--color-cafenity-dark)' }}>
                  Email
                </h3>
                <p className="font-barlow" style={{ color: 'var(--color-teks-samping)' }}>
                  info@cafenity.com
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-cafenity-primary)' }}
              >
                <FiClock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 font-poppins" style={{ color: 'var(--color-cafenity-dark)' }}>
                  Jam Buka
                </h3>
                <p className="font-barlow" style={{ color: 'var(--color-teks-samping)' }}>
                  Senin - Minggu: 07:00 - 22:00
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-custom">
            <h3 className="text-2xl font-bold mb-6 font-poppins" style={{ color: 'var(--color-cafenity-dark)' }}>
              Kirim Pesan
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 font-poppins" style={{ color: 'var(--color-teks)' }}>
                  Nama
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg focus-custom font-barlow"
                  style={{ borderColor: 'var(--color-garis)' }}
                  placeholder="Nama lengkap Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 font-poppins" style={{ color: 'var(--color-teks)' }}>
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border rounded-lg focus-custom font-barlow"
                  style={{ borderColor: 'var(--color-garis)' }}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 font-poppins" style={{ color: 'var(--color-teks)' }}>
                  Pesan
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border rounded-lg focus-custom font-barlow"
                  style={{ borderColor: 'var(--color-garis)' }}
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <FiSend className="w-5 h-5" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
