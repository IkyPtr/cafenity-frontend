import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';

export default function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#f0f8ff] to-[#e0f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-cyan-900 mb-6">
              Tentang Cafenity
            </h2>
            <p className="text-cyan-800/90 text-lg mb-6 leading-relaxed">
              Cafenity adalah lebih dari sekadar kedai kopi. Kami adalah tempat di mana 
              kreativitas bertemu dengan kenyamanan, di mana setiap cangkir kopi dibuat 
              dengan penuh perhatian dan cinta.
            </p>
            <p className="text-cyan-800/90 text-lg mb-8 leading-relaxed">
              Dengan suasana yang hangat dan desain yang menenangkan, kami menghadirkan 
              pengalaman kopi yang tak terlupakan untuk setiap tamu yang berkunjung.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">5+</div>
                <div className="text-cyan-700/90">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">1000+</div>
                <div className="text-cyan-700/90">Pelanggan Puas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">50+</div>
                <div className="text-cyan-700/90">Varian Menu</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-cyan-500/10 rounded-3xl p-8">
              <img 
                src="/images/coffee-about.jpg" 
                alt="About Cafenity" 
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-teal-500/20 backdrop-blur-sm p-4 rounded-2xl border border-cyan-400/30">
                <FiCoffee className="w-8 h-8 text-cyan-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: <FiStar className="w-6 h-6" />, title: "Kualitas Premium", desc: "Bahan pilihan terbaik" },
            { icon: <FiMapPin className="w-6 h-6" />, title: "Lokasi Strategis", desc: "Akses mudah di pusat kota" },
            { icon: <FiClock className="w-6 h-6" />, title: "Buka Setiap Hari", desc: "08.00 - 22.00 WIB" },
            { icon: <FiPhone className="w-6 h-6" />, title: "Hubungi Kami", desc: "(021) 1234-5678" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl border border-cyan-200/40 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-600 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-cyan-900 mb-2">{item.title}</h3>
              <p className="text-cyan-700/90">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}