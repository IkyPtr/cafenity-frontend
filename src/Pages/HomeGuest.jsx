import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/coffee.jpg')"
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#bd9f67]/10 backdrop-blur-xl"
            initial={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 10 - 5],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 2
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#243137]/80 backdrop-blur-lg border border-[#bd9f67]/30 rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-[#bd9f67] rounded-full flex items-center justify-center mr-4"
              >
                <FiCoffee className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#bd9f67] font-poppins">
                Cafenity
              </h1>
            </div>
            <p className="text-[#bd9f67] text-sm uppercase tracking-[0.3em] font-barlow">
              Universe of UI
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-6 font-poppins"
          >
            Selamat Datang di Cafenity ☕
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-300 text-lg mb-8 font-barlow"
          >
            Rasakan ketenangan, aroma kopi, dan keindahan desain dalam setiap tegukan
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-[#bd9f67] hover:bg-[#bd9f67]/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Lihat Menu
            </button>
            <button className="border-2 border-[#bd9f67] text-[#bd9f67] hover:bg-[#bd9f67] hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
              Reservasi Meja
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
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
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiCoffee className="w-8 h-8" />,
      title: "Premium Coffee",
      description: "Biji kopi pilihan terbaik dari berbagai daerah di Indonesia"
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Pelayanan Terbaik",
      description: "Tim barista profesional yang siap melayani dengan ramah"
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: "Lokasi Strategis",
      description: "Berada di pusat kota dengan akses mudah dan parkir luas"
    }
  ];

  return (
    <section className="py-20 bg-[#243137]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-poppins">
            Mengapa Memilih Cafenity?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-barlow">
            Kami berkomitmen memberikan pengalaman terbaik untuk setiap tamu
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#bd9f67] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-poppins">
                {feature.title}
              </h3>
              <p className="text-gray-300 font-barlow">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#243137] mb-4 font-poppins">
            Kunjungi Kami
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-barlow">
            Temukan kami di lokasi yang mudah dijangkau
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#bd9f67] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FiMapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#243137] mb-2 font-poppins">Alamat</h3>
                <p className="text-gray-600 font-barlow">
                  Jl. Kopi Nikmat No. 123<br />
                  Jakarta Selatan, 12345
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#bd9f67] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FiClock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#243137] mb-2 font-poppins">Jam Buka</h3>
                <p className="text-gray-600 font-barlow">
                  Senin - Jumat: 07:00 - 22:00<br />
                  Sabtu - Minggu: 08:00 - 23:00
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#bd9f67] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FiPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#243137] mb-2 font-poppins">Kontak</h3>
                                <p className="text-gray-600 font-barlow">
                  Telepon: (021) 1234-5678<br />
                  WhatsApp: +62 812-3456-7890
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#bd9f67] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FiMail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#243137] mb-2 font-poppins">Email</h3>
                <p className="text-gray-600 font-barlow">
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
            className="bg-gray-100 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-[#243137] mb-6 font-poppins">
              Kirim Pesan
            </h3>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bd9f67] focus:border-transparent transition-all duration-300 font-barlow"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bd9f67] focus:border-transparent transition-all duration-300 font-barlow"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Pesan Anda"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bd9f67] focus:border-transparent transition-all duration-300 font-barlow resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#bd9f67] hover:bg-[#bd9f67]/90 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 font-poppins"
              >
                Kirim Pesan
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MenuPreviewSection = () => {
  const menuItems = [
    {
      name: "Espresso",
      price: "Rp 25.000",
      description: "Kopi hitam pekat dengan rasa yang kuat",
      image: "/images/espresso.jpg"
    },
    {
      name: "Cappuccino",
      price: "Rp 35.000",
      description: "Perpaduan espresso dengan susu dan foam",
      image: "/images/cappuccino.jpg"
    },
    {
      name: "Latte",
      price: "Rp 40.000",
      description: "Espresso dengan steamed milk yang creamy",
      image: "/images/latte.jpg"
    },
    {
      name: "Americano",
      price: "Rp 30.000",
      description: "Espresso yang diencerkan dengan air panas",
      image: "/images/americano.jpg"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#243137] mb-4 font-poppins">
            Menu Favorit
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-barlow">
            Nikmati berbagai pilihan kopi premium dengan cita rasa yang autentik
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-[#243137] font-poppins">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-[#bd9f67] font-poppins">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm font-barlow">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-[#bd9f67] hover:bg-[#bd9f67]/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 font-poppins">
            Lihat Menu Lengkap
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Coffee Enthusiast",
      content: "Cafenity adalah tempat favorit saya untuk bekerja dan bersantai. Kopinya luar biasa dan suasananya sangat nyaman!",
      rating: 5
    },
    {
      name: "Ahmad Rizki",
      role: "Freelancer",
      content: "Pelayanan yang ramah dan kopi yang berkualitas. Tempat yang sempurna untuk meeting atau sekadar menikmati waktu sendiri.",
      rating: 5
    },
    {
      name: "Maria Santos",
      role: "Student",
      content: "WiFi cepat, tempat nyaman untuk belajar, dan menu yang beragam. Cafenity sudah seperti rumah kedua bagi saya!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#243137] mb-4 font-poppins">
            Apa Kata Mereka?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-barlow">
            Testimoni dari pelanggan setia Cafenity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 font-barlow italic">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="font-bold text-[#243137] font-poppins">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-sm font-barlow">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterSection = () => {
  return (
    <footer className="bg-[#243137] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#bd9f67] rounded-full flex items-center justify-center mr-4">
                <FiCoffee className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#bd9f67] font-poppins">
                Cafenity
              </h3>
            </div>
            <p className="text-gray-300 mb-6 font-barlow max-w-md">
              Tempat di mana setiap cangkir kopi menceritakan kisah, dan setiap 
              momen menjadi kenangan yang berharga.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-[#bd9f67] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#bd9f67]/80 transition-colors">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-[#bd9f67] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#bd9f67]/80 transition-colors">
                <span className="text-white font-bold">@</span>
              </div>
              <div className="w-10 h-10 bg-[#bd9f67] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#bd9f67]/80 transition-colors">
                <span className="text-white font-bold">in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-poppins">Menu</h4>
            <ul className="space-y-3 font-barlow">
              <li><a href="#" className="text-gray-300 hover:text-[#bd9f67] transition-colors">Kopi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#bd9f67] transition-colors">Teh</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#bd9f67] transition-colors">Makanan</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#bd9f67] transition-colors">Dessert</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-poppins">Layanan</h4>
            <ul className="space-y-3 font-barlow">
              <li><a href="#" className="text-gray-300 hover:text-[#bd9f67] transition-colors">Reservasi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#bd9f67] transition-colors">Catering</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#bd9f67] transition-colors">Private Event</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#bd9f67] transition-colors">Delivery</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className="text-gray-400 font-barlow">
            © 2024 Cafenity. All rights reserved. Made with ❤️ for coffee lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function HomeGuest() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <MenuPreviewSection />
      <TestimonialSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

