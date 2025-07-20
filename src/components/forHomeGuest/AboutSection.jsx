import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';

export default function AboutSection() {
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
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-[#f0f8ff] to-[#e0f7fa]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl font-bold mb-6 transition-colors duration-300 ${
              isDarkTheme ? 'text-white' : 'text-cyan-900'
            }`}>
              Tentang{' '}
              <span className={`text-transparent bg-clip-text transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-400'
                  : 'bg-gradient-to-r from-cyan-600 to-teal-600'
              }`}>
                Cafenity
              </span>
            </h2>
            <p className={`text-lg mb-6 leading-relaxed transition-colors duration-300 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-800/90'
            }`}>
              Cafenity adalah lebih dari sekadar kedai kopi. Kami adalah tempat di mana 
              kreativitas bertemu dengan kenyamanan, di mana setiap cangkir kopi dibuat 
              dengan penuh perhatian dan cinta.
            </p>
            <p className={`text-lg mb-8 leading-relaxed transition-colors duration-300 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-800/90'
            }`}>
              Dengan suasana yang hangat dan desain yang menenangkan, kami menghadirkan 
              pengalaman kopi yang tak terlupakan untuk setiap tamu yang berkunjung.
            </p>
            
            {/* Stats */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className={`text-3xl font-bold transition-colors duration-300 ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  5+
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-gray-400' : 'text-cyan-700/90'
                }`}>
                  Tahun Pengalaman
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold transition-colors duration-300 ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  1000+
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-gray-400' : 'text-cyan-700/90'
                }`}>
                  Pelanggan Puas
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold transition-colors duration-300 ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  50+
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-gray-400' : 'text-cyan-700/90'
                }`}>
                  Varian Menu
                </div>
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
            <div className={`rounded-3xl p-8 transition-colors duration-300 ${
              isDarkTheme 
                ? 'bg-gray-800/50 border border-gray-600/30' 
                : 'bg-cyan-500/10 border border-cyan-400/20'
            }`}>
              {/* Multiple Images Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Cafenity Interior" 
                  className="w-full h-32 object-cover rounded-xl shadow-md"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x320/06b6d4/ffffff?text=Cafenity+Interior";
                  }}
                />
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Coffee Making Process" 
                  className="w-full h-32 object-cover rounded-xl shadow-md"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x320/0d9488/ffffff?text=Coffee+Making";
                  }}
                />
              </div>
              
              {/* Main Featured Image */}
              <img 
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Cafenity Coffee Experience" 
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x400/06b6d4/ffffff?text=Cafenity+Coffee+Experience";
                }}
              />
              
              {/* Coffee Icon Overlay */}
              <div className={`absolute -bottom-4 -right-4 p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-gray-800/80 border-gray-600/40'
                  : 'bg-teal-500/20 border-cyan-400/30'
              }`}>
                <FiCoffee className={`w-8 h-8 transition-colors duration-300 ${
                  isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                }`} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {[
            { 
              icon: <FiStar className="w-6 h-6" />, 
              title: "Kualitas Premium", 
              desc: "Bahan pilihan terbaik",
              color: "from-yellow-500 to-amber-500"
            },
            { 
              icon: <FiMapPin className="w-6 h-6" />, 
              title: "Lokasi Strategis", 
              desc: "Akses mudah di pusat kota",
              color: "from-emerald-500 to-teal-500"
            },
            { 
              icon: <FiClock className="w-6 h-6" />, 
              title: "Buka Setiap Hari", 
              desc: "08.00 - 22.00 WIB",
              color: "from-blue-500 to-cyan-500"
            },
            { 
              icon: <FiPhone className="w-6 h-6" />, 
              title: "Hubungi Kami", 
              desc: "(021) 1234-5678",
              color: "from-purple-500 to-pink-500"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border shadow-sm transition-all duration-300 transform hover:-translate-y-2 group ${
                isDarkTheme
                  ? 'bg-gray-800/70 backdrop-blur-lg border-gray-600/40 hover:shadow-lg hover:shadow-cyan-400/10 hover:bg-gray-800/90'
                  : 'bg-white/70 backdrop-blur-lg border-cyan-200/40 hover:shadow-md hover:shadow-cyan-500/10 hover:bg-white/90'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 transition-all duration-300 group-hover:scale-110 ${
                isDarkTheme
                  ? 'bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/25'
                  : 'bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/30'
              }`}>
                {item.icon}
              </div>
              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-cyan-900'
              }`}>
                {item.title}
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-300' : 'text-cyan-700/90'
              }`}>
                {item.desc}
              </p>

              {/* Decorative Element */}
              <div className="flex justify-center mt-4">
                <div className={`w-8 h-1 rounded-full transition-all duration-300 group-hover:w-12 ${
                  isDarkTheme
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-400'
                    : 'bg-gradient-to-r from-cyan-500 to-teal-500'
                }`} />
              </div>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-cyan-400/5 via-transparent to-teal-400/5'
                  : 'bg-gradient-to-r from-cyan-500/5 via-transparent to-teal-500/5'
              }`} />
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className={`max-w-4xl mx-auto p-8 rounded-2xl border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-gray-800/60 border-gray-600/30'
              : 'bg-white/60 border-cyan-300/30'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
              isDarkTheme ? 'text-white' : 'text-cyan-900'
            }`}>
              Misi Kami
            </h3>
            <p className={`text-lg leading-relaxed transition-colors duration-300 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-800/90'
            }`}>
              Menciptakan ruang yang menginspirasi kreativitas dan mempererat hubungan antar manusia 
              melalui secangkir kopi berkualitas tinggi dan pelayanan yang tulus dari hati.
            </p>
            
            {/* Quote decoration */}
            <div className="flex justify-center mt-6">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 ${
                isDarkTheme
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-cyan-100 text-cyan-600'
              }`}>
                <FiCoffee className="w-4 h-4" />
                <span className="text-sm font-medium">Crafted with Love</span>
                <FiCoffee className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {[
            {
              title: "Kualitas Terjamin",
              description: "Setiap biji kopi dipilih dengan teliti dari petani terbaik untuk menghasilkan cita rasa yang sempurna.",
              icon: "☕",
              gradient: isDarkTheme ? "from-amber-400/20 to-yellow-400/20" : "from-amber-100 to-yellow-100"
            },
            {
              title: "Suasana Nyaman",
              description: "Desain interior yang hangat dan musik yang menenangkan menciptakan atmosfer yang sempurna untuk bersantai.",
              icon: "🏠",
              gradient: isDarkTheme ? "from-emerald-400/20 to-teal-400/20" : "from-emerald-100 to-teal-100"
            },
            {
              title: "Pelayanan Ramah",
              description: "Tim barista profesional yang siap melayani dengan senyuman dan memberikan rekomendasi terbaik.",
              icon: "😊",
              gradient: isDarkTheme ? "from-blue-400/20 to-cyan-400/20" : "from-blue-100 to-cyan-100"
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 group ${
                isDarkTheme
                  ? 'bg-gray-800/50 border-gray-600/30 hover:bg-gray-800/70'
                  : 'bg-white/50 border-cyan-200/30 hover:bg-white/70'
              }`}
            >
              <div className={`w-full h-32 rounded-xl mb-4 flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${value.gradient}`}>
                {value.icon}
              </div>
              <h4 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-cyan-900'
              }`}>
                {value.title}
              </h4>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-300' : 'text-cyan-700/90'
              }`}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className={`text-3xl font-bold text-center mb-8 transition-colors duration-300 ${
            isDarkTheme ? 'text-white' : 'text-cyan-900'
          }`}>
            Penghargaan & Sertifikasi
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Best Coffee Shop 2023",
                organization: "Jakarta Food Awards",
                icon: "🏆",
                color: isDarkTheme ? "from-yellow-400/20 to-amber-400/20" : "from-yellow-100 to-amber-100"
              },
              {
                title: "Organic Certified",
                organization: "Green Coffee Association",
                icon: "🌱",
                color: isDarkTheme ? "from-green-400/20 to-emerald-400/20" : "from-green-100 to-emerald-100"
              },
              {
                title: "Fair Trade Partner",
                organization: "Fair Trade Indonesia",
                icon: "🤝",
                color: isDarkTheme ? "from-blue-400/20 to-cyan-400/20" : "from-blue-100 to-cyan-100"
              },
              {
                title: "Customer Choice",
                organization: "TripAdvisor 2023",
                icon: "⭐",
                color: isDarkTheme ? "from-purple-400/20 to-pink-400/20" : "from-purple-100 to-pink-100"
              }
            ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`text-center p-6 rounded-2xl border transition-all duration-300 hover:scale-105 group ${
                  isDarkTheme
                    ? 'bg-gray-800/50 border-gray-600/30 hover:bg-gray-800/70'
                    : 'bg-white/50 border-cyan-200/30 hover:bg-white/70'
                }`}
              >
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${award.color}`}>
                  {award.icon}
                </div>
                <h4 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-cyan-900'
                }`}>
                  {award.title}
                </h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-gray-300' : 'text-cyan-700/90'
                }`}>
                  {award.organization}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className={`max-w-3xl mx-auto p-8 rounded-2xl border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-gradient-to-br from-gray-800/60 to-gray-700/60 border-gray-600/30'
              : 'bg-gradient-to-br from-cyan-50/60 to-teal-50/60 border-cyan-300/30'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
              isDarkTheme ? 'text-white' : 'text-cyan-900'
            }`}>
              Siap Merasakan Pengalaman Cafenity?
            </h3>
            <p className={`text-lg mb-6 transition-colors duration-300 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-800/90'
            }`}>
              Kunjungi kami hari ini dan rasakan perbedaan kualitas kopi premium 
              dengan pelayanan yang tak terlupakan.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

