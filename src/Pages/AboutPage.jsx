import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCoffee,
  FiHeart,
  FiUsers,
  FiAward,
  FiStar,
  FiMapPin,
  FiClock,
  FiTrendingUp,
  FiShield,
  FiSmile,
  FiTarget,
  FiEye,
  FiCheckCircle,
  FiGlobe,
} from "react-icons/fi";

const AboutHero = ({ isDarkTheme }) => {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full backdrop-blur-xl ${
              isDarkTheme
                ? 'bg-gradient-to-br from-cyan-600/20 to-teal-600/20'
                : 'bg-gradient-to-br from-cyan-400/20 to-teal-400/20'
            }`}
            initial={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: isDarkTheme ? 0.3 : 0.4,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 10 - 5],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className={`absolute inset-0 opacity-10 [background-size:24px_24px] ${
        isDarkTheme
          ? '[background-image:linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]'
          : '[background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]'
      }`} />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isDarkTheme
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
                : 'bg-gradient-to-r from-cyan-500 to-teal-500'
            }`}>
              <FiCoffee className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-6 ${
            isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
          }`}>
            Tentang Kami
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Perjalanan kami dimulai dari kecintaan terhadap kopi berkualitas dan
            keinginan untuk menciptakan ruang yang menginspirasi setiap orang.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`backdrop-blur-sm border rounded-full px-8 py-4 ${
                isDarkTheme
                  ? 'bg-gray-800/30 border-cyan-500/30'
                  : 'bg-white/10 border-cyan-400/30'
              }`}
            >
              <span className={`font-bold text-lg ${
                isDarkTheme ? 'text-cyan-300' : 'text-cyan-700'
              }`}>
                Est. 2020
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`backdrop-blur-sm border rounded-full px-8 py-4 ${
                isDarkTheme
                  ? 'bg-gray-800/30 border-cyan-500/30'
                  : 'bg-white/10 border-cyan-400/30'
              }`}
            >
              <span className={`font-bold text-lg ${
                isDarkTheme ? 'text-cyan-300' : 'text-cyan-700'
              }`}>
                10,000++ Pelanggan
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`backdrop-blur-sm border rounded-full px-8 py-4 ${
                isDarkTheme
                  ? 'bg-gray-800/30 border-cyan-500/30'
                  : 'bg-white/10 border-cyan-400/30'
              }`}
            >
              <span className={`font-bold text-lg ${
                isDarkTheme ? 'text-cyan-300' : 'text-cyan-700'
              }`}>
                Premium Quality
              </span>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all ${
              isDarkTheme
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white'
                : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white'
            }`}
          >
            Jelajahi Cerita Kami
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            isDarkTheme ? 'border-cyan-400/50' : 'border-cyan-500/50'
          }`}
        >
          <div className={`w-1 h-3 rounded-full mt-2 ${
            isDarkTheme ? 'bg-cyan-400/70' : 'bg-cyan-500/70'
          }`}></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const OurStory = ({ isDarkTheme }) => {
  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
            }`}>
              Cerita Kami Dimulai
            </h2>
            <div className={`space-y-6 text-lg leading-relaxed ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
            }`}>
              <p>
                Pada tahun 2020, di tengah pandemi yang mengubah dunia, kami
                memiliki visi sederhana: menciptakan tempat di mana setiap
                cangkir kopi menceritakan kisah, dan setiap orang merasa seperti
                di rumah.
              </p>
              <p>
                Berawal dari sebuah ruang kecil dengan 6 meja, kini telah
                berkembang menjadi destinasi favorit para pecinta kopi di Jakarta.
                Kami tidak hanya menyajikan kopi, tetapi menciptakan pengalaman
                yang menginspirasi.
              </p>
              <p>
                Setiap biji kopi yang kami pilih berasal dari petani lokal
                terbaik, diolah dengan teknik modern namun tetap mempertahankan
                cita rasa tradisional yang autentik.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`}>4+</div>
                <div className={`text-sm ${
                  isDarkTheme ? 'text-gray-400' : 'text-cyan-700/80'
                }`}>Tahun Berpengalaman</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`}>50+</div>
                <div className={`text-sm ${
                  isDarkTheme ? 'text-gray-400' : 'text-cyan-700/80'
                }`}>Varian Menu</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`}>15+</div>
                <div className={`text-sm ${
                  isDarkTheme ? 'text-gray-400' : 'text-cyan-700/80'
                }`}>Penghargaan</div>
              </div>
            </div>
          </motion.div>

          {/* Story Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className={`rounded-2xl overflow-hidden h-48 ${
                  isDarkTheme ? 'bg-gray-700/50' : 'bg-cyan-100/50'
                }`}>
                  <img
                    src="/images/story-1.jpg"
                    alt="Story"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className={`rounded-2xl overflow-hidden h-32 ${
                  isDarkTheme ? 'bg-gray-700/50' : 'bg-cyan-100/50'
                }`}>
                  <img
                    src="/images/story-2.jpg"
                    alt="Coffee Making"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className={`rounded-2xl overflow-hidden h-32 ${
                  isDarkTheme ? 'bg-gray-700/50' : 'bg-cyan-100/50'
                }`}>
                  <img
                    src="/images/story-3.jpg"
                    alt="Coffee Beans"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className={`rounded-2xl overflow-hidden h-48 ${
                  isDarkTheme ? 'bg-gray-700/50' : 'bg-cyan-100/50'
                }`}>
                  <img
                    src="/images/story-4.jpg"
                    alt="Cafe Interior"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`absolute -top-4 -right-4 text-white rounded-full p-4 shadow-lg ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
                  : 'bg-gradient-to-r from-cyan-500 to-teal-500'
              }`}
            >
              <FiAward className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MissionVision = ({ isDarkTheme }) => {
  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-cyan-50 to-teal-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
          }`}>
            Misi & Visi Kami
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Komitmen kami untuk memberikan yang terbaik dalam setiap aspek
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 shadow-lg border ${
              isDarkTheme
                ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-sm'
                : 'bg-white/70 border-white/50 backdrop-blur-sm'
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
              isDarkTheme
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
                : 'bg-gradient-to-r from-cyan-500 to-teal-500'
            }`}>
              <FiTarget className="w-8 h-8 text-white" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
            }`}>
              Misi Kami
            </h3>
            <p className={`text-lg leading-relaxed mb-6 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
            }`}>
              Menyajikan pengalaman kopi terbaik dengan menciptakan ruang yang
              nyaman, ramah, dan menginspirasi setiap pengunjung untuk menjalani
              hari dengan semangat.
            </p>
            <ul className={`space-y-3 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-700'
            }`}>
              <li className="flex items-center">
                <FiCheckCircle className={`w-5 h-5 mr-3 ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`} />
                Kualitas premium dalam setiap sajian
              </li>
              <li className="flex items-center">
                <FiCheckCircle className={`w-5 h-5 mr-3 ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`} />
                Pelayanan yang ramah dan profesional
              </li>
              <li className="flex items-center">
                <FiCheckCircle className={`w-5 h-5 mr-3 ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`} />
                Suasana yang nyaman dan inspiratif
              </li>
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 shadow-lg border ${
              isDarkTheme
                ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-sm'
                : 'bg-white/70 border-white/50 backdrop-blur-sm'
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
              isDarkTheme
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500'
            }`}>
              <FiEye className="w-8 h-8 text-white" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
            }`}>
              Visi Kami
            </h3>
            <p className={`text-lg leading-relaxed mb-6 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
            }`}>
              Menjadi destinasi kopi terdepan yang dikenal karena inovasi,
              kualitas, dan kontribusi positif terhadap komunitas lokal dan
              lingkungan.
            </p>
            <ul className={`space-y-3 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-700'
            }`}>
              <li className="flex items-center">
                <FiGlobe className={`w-5 h-5 mr-3 ${
                  isDarkTheme ? 'text-teal-400' : 'text-teal-600'
                }`} />
                Ekspansi ke seluruh Indonesia
              </li>
              <li className="flex items-center">
                <FiHeart className={`w-5 h-5 mr-3 ${
                  isDarkTheme ? 'text-teal-400' : 'text-teal-600'
                }`} />
                Mendukung petani kopi lokal
              </li>
              <li className="flex items-center">
                <FiShield className={`w-5 h-5 mr-3 ${
                  isDarkTheme ? 'text-teal-400' : 'text-teal-600'
                }`} />
                Praktik bisnis yang berkelanjutan
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Values = ({ isDarkTheme }) => {
  const values = [
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Passion",
      description: "Kecintaan mendalam terhadap kopi dan kepuasan pelanggan",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Excellence",
      description: "Komitmen untuk selalu memberikan yang terbaik",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community",
      description: "Membangun hubungan yang kuat dengan komunitas",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Sustainability",
      description: "Praktik bisnis yang bertanggung jawab terhadap lingkungan",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
          }`}>
            Nilai-Nilai Kami
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Prinsip-prinsip yang menjadi fondasi dalam setiap langkah kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`text-center p-6 rounded-2xl shadow-lg border transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50'
                  : 'bg-white/70 border-white/50 hover:bg-white/90'
              } backdrop-blur-sm`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${value.color}`}>
                <div className="text-white">{value.icon}</div>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
              }`}>
                {value.title}
              </h3>
              <p className={`${
                isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
              }`}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = ({ isDarkTheme }) => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/images/team-1.jpg",
      description: "Visioner di balik Cafenity dengan pengalaman 15+ tahun di industri F&B",
    },
    {
      name: "Michael Chen",
      role: "Head Barista",
      image: "/images/team-2.jpg",
      description: "Master barista dengan sertifikasi internasional dan passion untuk kopi specialty",
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Manager",
      image: "/images/team-3.jpg",
      description: "Ahli operasional yang memastikan setiap detail berjalan dengan sempurna",
    },
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-cyan-50 to-teal-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
          }`}>
            Tim Kami
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Orang-orang hebat di balik setiap cangkir kopi yang sempurna
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`text-center rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50'
                  : 'bg-white/70 border-white/50 hover:bg-white/90'
              } backdrop-blur-sm`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDarkTheme 
                    ? 'from-gray-900/50 to-transparent' 
                    : 'from-black/20 to-transparent'
                }`}></div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
                }`}>
                  {member.name}
                </h3>
                                <p className={`font-medium mb-3 ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  {member.role}
                </p>
                <p className={`text-sm ${
                  isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
                }`}>
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Statistics = ({ isDarkTheme }) => {
  const stats = [
    {
      icon: <FiCoffee className="w-8 h-8" />,
      number: "50,000+",
      label: "Cangkir Kopi Terjual",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      number: "10,000+",
      label: "Pelanggan Setia",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      number: "4.9/5",
      label: "Rating Pelanggan",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      number: "15+",
      label: "Penghargaan",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
          }`}>
            Pencapaian Kami
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Angka-angka yang menunjukkan dedikasi kami terhadap kualitas
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`text-center p-6 rounded-2xl shadow-lg border ${
                isDarkTheme
                  ? 'bg-gray-800/50 border-gray-700/50'
                  : 'bg-white/70 border-white/50'
              } backdrop-blur-sm`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${stat.color}`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className={`text-3xl font-bold mb-2 ${
                isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
              }`}>
                {stat.number}
              </div>
              <div className={`text-sm ${
                isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ isDarkTheme }) => {
  const testimonials = [
    {
      name: "Amanda Putri",
      role: "Food Blogger",
      image: "/images/testimonial-1.jpg",
      rating: 5,
      text: "Cafenity bukan hanya tempat minum kopi, tapi tempat di mana ide-ide kreatif bermunculan. Suasananya yang nyaman dan kopi yang luar biasa membuat saya selalu kembali lagi.",
    },
    {
      name: "David Santoso",
      role: "Entrepreneur",
      image: "/images/testimonial-2.jpg",
      rating: 5,
      text: "Sebagai pengusaha yang sering meeting di cafe, Cafenity adalah pilihan terbaik. Pelayanannya profesional, wifi cepat, dan kopinya selalu konsisten.",
    },
    {
      name: "Lisa Maharani",
      role: "Designer",
      image: "/images/testimonial-3.jpg",
      rating: 5,
      text: "Tempat favorit saya untuk bekerja remote. Ambience-nya inspiring banget dan barista-nya ramah. Cold brew mereka adalah yang terbaik di Jakarta!",
    },
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-cyan-50 to-teal-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
          }`}>
            Apa Kata Mereka
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Testimoni dari pelanggan setia yang telah merasakan pengalaman Cafenity
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
              whileHover={{ y: -10 }}
              className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50'
                  : 'bg-white/70 border-white/50 hover:bg-white/90'
              } backdrop-blur-sm`}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className={`font-bold ${
                    isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
                  }`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm ${
                    isDarkTheme ? 'text-gray-400' : 'text-cyan-700/80'
                  }`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 fill-current ${
                      isDarkTheme ? 'text-yellow-400' : 'text-yellow-500'
                    }`}
                  />
                ))}
              </div>
              
              <p className={`italic ${
                isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
              }`}>
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToAction = ({ isDarkTheme }) => {
  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkTheme ? 'text-gray-100' : 'text-cyan-900'
          }`}>
            Siap Merasakan Pengalaman Cafenity?
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Kunjungi kami hari ini dan rasakan sendiri mengapa Cafenity menjadi
            pilihan utama para pecinta kopi di Jakarta.
          </p>

          <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            <div className="flex items-center justify-center">
              <FiMapPin className={`w-5 h-5 mr-2 ${
                isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
              }`} />
              <span>Jl. Sudirman No. 123, Jakarta</span>
            </div>
            <div className="flex items-center justify-center">
              <FiClock className={`w-5 h-5 mr-2 ${
                isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
              }`} />
              <span>07:00 - 22:00 WIB</span>
            </div>
            <div className="flex items-center justify-center">
              <FiSmile className={`w-5 h-5 mr-2 ${
                isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
              }`} />
              <span>Pelayanan Ramah 24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function AboutPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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

  return (
    <div className={`transition-colors duration-300 ${
      isDarkTheme ? 'bg-gray-900' : 'bg-white'
    }`}>
      <AboutHero isDarkTheme={isDarkTheme} />
      <OurStory isDarkTheme={isDarkTheme} />
      <MissionVision isDarkTheme={isDarkTheme} />
      <Values isDarkTheme={isDarkTheme} />
      <Team isDarkTheme={isDarkTheme} />
      <Statistics isDarkTheme={isDarkTheme} />
      <Testimonials isDarkTheme={isDarkTheme} />
      <CallToAction isDarkTheme={isDarkTheme} />
    </div>
  );
}
