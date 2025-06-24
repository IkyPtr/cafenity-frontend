import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';

export default function ContactSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#e0f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-cyan-900 mb-4 font-poppins">
            Kunjungi Kami
          </h2>
          <p className="text-cyan-800/80 text-lg max-w-2xl mx-auto font-barlow">
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
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FiMapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-900 mb-2 font-poppins">Alamat</h3>
                <p className="text-cyan-800/90 font-barlow">
                  Jl. Kopi Nikmat No. 123<br />
                  Jakarta Selatan, 12345
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FiClock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-900 mb-2 font-poppins">Jam Buka</h3>
                <p className="text-cyan-800/90 font-barlow">
                  Senin - Jumat: 07:00 - 22:00<br />
                  Sabtu - Minggu: 08:00 - 23:00
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FiPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-900 mb-2 font-poppins">Kontak</h3>
                <p className="text-cyan-800/90 font-barlow">
                  Telepon: (021) 1234-5678<br />
                  WhatsApp: +62 812-3456-7890
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FiMail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-900 mb-2 font-poppins">Email</h3>
                <p className="text-cyan-800/90 font-barlow">
                  info@cafenity.com<br />
                  reservation@cafenity.com
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-cyan-900 mb-6 font-poppins">
              Kirim Pesan
            </h3>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-barlow text-cyan-900 placeholder-cyan-800/70"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-barlow text-cyan-900 placeholder-cyan-800/70"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Pesan Anda"
                  className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-barlow resize-none text-cyan-900 placeholder-cyan-800/70"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
              >
                Kirim Pesan
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}