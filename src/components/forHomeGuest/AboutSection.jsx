import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';
export default function AboutSection() {
  return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-[#243137] mb-6 font-poppins">
                Tentang Cafenity
              </h2>
              <p className="text-gray-600 text-lg mb-6 font-barlow leading-relaxed">
                Cafenity adalah lebih dari sekadar kedai kopi. Kami adalah tempat di mana 
                kreativitas bertemu dengan kenyamanan, di mana setiap cangkir kopi dibuat 
                dengan penuh perhatian dan cinta.
              </p>
              <p className="text-gray-600 text-lg mb-8 font-barlow leading-relaxed">
                Dengan suasana yang hangat dan desain yang menenangkan, kami menghadirkan 
                pengalaman kopi yang tak terlupakan untuk setiap tamu yang berkunjung.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#bd9f67] font-poppins">5+</div>
                  <div className="text-gray-600 font-barlow">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#bd9f67] font-poppins">1000+</div>
                  <div className="text-gray-600 font-barlow">Pelanggan Puas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#bd9f67] font-poppins">50+</div>
                  <div className="text-gray-600 font-barlow">Varian Menu</div>
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
              <div className="bg-[#bd9f67]/10 rounded-3xl p-8">
                <img 
                  src="/images/coffee-about.jpg" 
                  alt="About Cafenity" 
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
}