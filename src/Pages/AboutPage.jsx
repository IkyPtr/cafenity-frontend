import React from "react";
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

const AboutHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-cyan-400/20 to-teal-400/20 backdrop-blur-xl"
            initial={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4,
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
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px]" />

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
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-teal-500">
              <FiCoffee className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-cyan-900">
            Tentang Kami
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-cyan-800/80">
            Perjalanan kami dimulai dari kecintaan terhadap kopi berkualitas dan
            keinginan untuk menciptakan ruang yang menginspirasi setiap orang.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-full px-8 py-4"
            >
              <span className="font-bold text-lg text-cyan-700">
                Est. 2020
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-full px-8 py-4"
            >
              <span className="font-bold text-lg text-cyan-700">
                10,000++ Pelanggan
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-full px-8 py-4"
            >
              <span className="font-bold text-lg text-cyan-700">
                Premium Quality
              </span>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
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
          className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 rounded-full mt-2 bg-cyan-500/70"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const OurStory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-900">
              Cerita Kami Dimulai
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-cyan-800/80">
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
                <div className="text-3xl font-bold text-cyan-600">4+</div>
                <div className="text-sm text-cyan-700/80">Tahun Berpengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">50+</div>
                <div className="text-sm text-cyan-700/80">Varian Menu</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">15+</div>
                <div className="text-sm text-cyan-700/80">Penghargaan</div>
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
                <div className="rounded-2xl overflow-hidden h-48 bg-cyan-100/50">
                  <img
                    src="/images/story-1.jpg"
                    alt="Story"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-32 bg-cyan-100/50">
                  <img
                    src="/images/story-2.jpg"
                    alt="Coffee Making"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-32 bg-cyan-100/50">
                  <img
                    src="/images/story-3.jpg"
                    alt="Coffee Beans"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 bg-cyan-100/50">
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
              className="absolute -top-4 -right-4 text-white rounded-full p-4 shadow-lg bg-gradient-to-r from-cyan-500 to-teal-500"
            >
              <FiAward className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MissionVision = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-900">
            Misi & Visi Kami
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-cyan-800/80">
            Komitmen kami untuk memberikan yang terbaik bagi setiap pelanggan
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-gradient-to-r from-cyan-500 to-teal-500">
                <FiTarget className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cyan-900">Misi Kami</h3>
            </div>
            <div className="space-y-4 text-cyan-800/80">
              <p className="flex items-start">
                <FiCheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-cyan-500" />
                Menyajikan kopi berkualitas premium dengan cita rasa yang
                konsisten dan autentik
              </p>
              <p className="flex items-start">
                <FiCheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-cyan-500" />
                Menciptakan ruang yang nyaman dan inspiratif untuk bekerja,
                bersantai, dan bersosialisasi
              </p>
              <p className="flex items-start">
                <FiCheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-cyan-500" />
                Mendukung petani kopi lokal dengan kemitraan yang berkelanjutan
                dan adil
              </p>
              <p className="flex items-start">
                <FiCheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-cyan-500" />
                Memberikan pelayanan terbaik yang melampaui ekspektasi setiap
                pelanggan
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-cyan-900">
                <FiEye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cyan-900">Visi Kami</h3>
            </div>
            <div className="space-y-4 text-cyan-800/80">
              <p className="flex items-start">
                <FiCheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-cyan-500" />
                Menjadi coffee shop terdepan yang dikenal dengan kualitas dan
                inovasi terbaik
              </p>
              <p className="flex items-start">
                <FiCheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-cyan-500" />
                Membangun komunitas pecinta kopi yang saling menginspirasi dan
                mendukung
              </p>
              <p className="flex items-start">
                <FiCheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-cyan-500" />
                Menjadi pionir dalam praktik bisnis yang ramah lingkungan dan
                berkelanjutan
              </p>
              <p className="flex items-start">
                <FiCheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-cyan-500" />
                Ekspansi ke seluruh Indonesia dengan tetap mempertahankan
                nilai-nilai inti kami
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const OurValues = () => {
  const values = [
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Passion",
      description:
        "Kecintaan mendalam terhadap kopi dan dedikasi untuk memberikan yang terbaik",
      color: "bg-rose-500",
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Quality",
      description:
        "Komitmen pada kualitas premium dalam setiap aspek produk dan layanan",
      color: "bg-blue-500",
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community",
      description:
        "Membangun hubungan yang kuat dengan pelanggan, mitra, dan masyarakat",
      color: "bg-emerald-500",
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Sustainability",
      description:
        "Praktik bisnis yang bertanggung jawab terhadap lingkungan dan sosial",
      color: "bg-teal-500",
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Terus berinovasi dalam produk, layanan, dan pengalaman pelanggan",
      color: "bg-cyan-500",
    },
    {
      icon: <FiSmile className="w-8 h-8" />,
      title: "Excellence",
      description:
        "Standar keunggulan dalam setiap detail untuk kepuasan maksimal",
      color: "bg-amber-400",
    },
  ];

  return (
    <section className="py-20 bg-cyan-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Nilai-Nilai Kami
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-cyan-100/80">
            Prinsip-prinsip yang memandu setiap langkah perjalanan kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all hover:bg-white/20"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 ${value.color}`}
              >
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {value.title}
              </h3>
              <p className="leading-relaxed text-cyan-100/80">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Statistics = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Pelanggan Setia",
      icon: <FiUsers className="w-8 h-8" />,
      description: "Telah mempercayai kami",
    },
    {
      number: "50,000+",
      label: "Cangkir Kopi",
      icon: <FiCoffee className="w-8 h-8" />,
      description: "Telah kami sajikan dengan cinta",
    },
    {
      number: "4.9/5",
      label: "Rating Pelanggan",
      icon: <FiStar className="w-8 h-8" />,
      description: "Dari berbagai platform review",
    },
    {
      number: "15+",
      label: "Penghargaan",
      icon: <FiAward className="w-8 h-8" />,
      description: "Prestasi yang membanggakan",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-cyan-600 to-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Pencapaian Kami
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-cyan-100/90">
            Angka-angka yang menunjukkan dedikasi dan kepercayaan yang kami
            terima
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-8 transition-all hover:bg-white/30"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4 bg-white/20">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2 text-white/90">
                {stat.label}
              </div>
              <div className="text-sm text-cyan-100/80">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Timeline = () => {
  const milestones = [
    {
      year: "2020",
      title: "Awal Perjalanan",
      description:
        "Pertama dibuka di Jakarta Selatan dengan 6 meja dan visi besar",
      icon: <FiMapPin className="w-6 h-6" />,
    },
    {
      year: "2021",
      title: "Ekspansi Menu",
      description:
        "Meluncurkan 20+ varian kopi specialty dan menu makanan artisan",
      icon: <FiCoffee className="w-6 h-6" />,
    },
    {
      year: "2022",
      title: "Penghargaan Pertama",
      description: "Meraih 'Best New Coffee Shop' dari Jakarta Food Awards",
      icon: <FiAward className="w-6 h-6" />,
    },
    {
      year: "2023",
      title: "Komunitas Berkembang",
      description:
        "Mencapai 10,000+ member komunitas dan launching loyalty program",
      icon: <FiUsers className="w-6 h-6" />,
    },
    {
      year: "2024",
      title: "Inovasi Berkelanjutan",
      description:
        "Implementasi teknologi AI untuk personalisasi pengalaman pelanggan",
      icon: <FiTrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-900">
            Perjalanan Waktu
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-cyan-800/80">
            Milestone penting dalam perjalanan kami menuju kesuksesan
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-cyan-400/30"></div>

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`w-5/12 ${
                  index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                }`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-cyan-200/50">
                  <div className="text-2xl font-bold mb-2 text-cyan-600">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-900">
                    {milestone.title}
                  </h3>
                  <p className="text-cyan-800/80">{milestone.description}</p>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg bg-gradient-to-r from-cyan-500 to-teal-500 z-10">
                {milestone.icon}
              </div>

              {/* Empty space */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Ahmad Rizki",
      position: "Founder & CEO",
      image: "/images/team-1.jpg",
      description:
        "Visioner di balik perusahaan dengan pengalaman 10+ tahun di industri F&B",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Sarah Putri",
      position: "Head Barista",
      image: "/images/team-2.jpg",
      description:
        "Master barista dengan sertifikasi internasional dan passion untuk coffee art",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "David Chen",
      position: "Operations Manager",
      image: "/images/team-3.jpg",
      description:
        "Ahli operasional yang memastikan kualitas dan efisiensi di setiap outlet",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Maya Sari",
      position: "Marketing Director",
      image: "/images/team-4.jpg",
      description:
        "Kreator strategi pemasaran yang membangun brand awareness perusahaan",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-900">
            Tim Kami
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-cyan-800/80">
            Orang-orang hebat di balik kesuksesan kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-cyan-200/50"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-64 bg-cyan-100/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href={member.social.instagram}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2.162c2.204 0 2.466.009 3.338.048.805.037 1.243.166 1.532.276.386.15.663.328.953.618.29.29.468.567.618.953.11.289.239.727.276 1.532.039.872.048 1.134.048 3.338s-.009 2.466-.048 3.338c-.037.805-.166 1.243-.276 1.532-.15.386-.328.663-.618.953-.29.29-.567.468-.953.618-.289.11-.727.239-1.532.276-.872.039-1.134.048-3.338.048s-2.466-.009-3.338-.048c-.805-.037-1.243-.166-1.532-.276a2.565 2.565 0 01-.953-.618 2.565 2.565 0 01-.618-.953c-.11-.289-.239-.727-.276-1.532C2.171 12.466 2.162 12.204 2.162 10s.009-2.466.048-3.338c.037-.805.166-1.243.276-1.532.15-.386.328-.663.618-.953.29-.29.567-.468.953-.618.289-.11.727-.239 1.532-.276.872-.039 1.134-.048 3.338-.048zM10 0C7.741 0 7.444.01 6.552.05 5.662.09 5.01.225 4.452.425a4.412 4.412 0 00-1.596 1.04A4.412 4.412 0 001.816 3.06c-.2.558-.335 1.21-.375 2.1C1.401 6.052 1.391 6.349 1.391 8.608v2.784c0 2.259.01 2.556.05 3.448.04.89.175 1.542.375 2.1a4.412 4.412 0 001.04 1.596 4.412 4.412 0 001.596 1.04c.558.2 1.21.335 2.1.375.892.04 1.189.05 3.448.05s2.556-.01 3.448-.05c.89-.04 1.542-.175 2.1-.375a4.412 4.412 0 001.596-1.04 4.412 4.412 0 001.04-1.596c.2-.558.335-1.21.375-2.1.04-.892.05-1.189.05-3.448.05s-2.556-.01-3.448-.05c-.89-.04-1.542-.175-2.1-.375a4.412 4.412 0 00-1.596-1.04A4.412 4.412 0 0015.548.425c-.558-.2-1.21-.335-2.1-.375C12.556.01 12.259 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-900">
                  {member.name}
                </h3>
                <p className="font-semibold mb-3 text-cyan-600">
                  {member.position}
                </p>
                <p className="text-sm leading-relaxed text-cyan-800/80">
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

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rina Sari",
      position: "Digital Marketer",
      image: "/images/testimonial-1.jpg",
      rating: 5,
      text: "Bukan hanya tempat minum kopi, tapi rumah kedua saya. Suasananya yang nyaman dan kopi yang luar biasa membuat saya selalu kembali lagi.",
    },
    {
      name: "Budi Santoso",
      position: "Entrepreneur",
      image: "/images/testimonial-2.jpg",
      rating: 5,
      text: "Sebagai pengusaha, saya sering mengadakan meeting di sini. Pelayanannya profesional dan kopinya selalu konsisten. Highly recommended!",
    },
    {
      name: "Lisa Chen",
      position: "Content Creator",
      image: "/images/testimonial-3.jpg",
      rating: 5,
      text: "Spot favorit untuk kerja dan foto-foto. Interiornya Instagram-able banget dan WiFi-nya kencang. Perfect untuk content creator seperti saya!",
    },
  ];

  return (
    <section className="py-20 bg-cyan-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Kata Mereka
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-cyan-100/80">
            Testimoni dari pelanggan setia yang telah merasakan pengalaman kami
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
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all hover:bg-white/20"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-5 h-5 text-amber-400"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="mb-6 leading-relaxed text-cyan-100/80">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-cyan-800">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-cyan-100/60">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-600 to-teal-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Bergabunglah dengan Keluarga Kami
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-cyan-100/90">
            Jadilah bagian dari komunitas pecinta kopi yang terus berkembang.
            Rasakan pengalaman yang tak terlupakan bersama kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl text-cyan-900"
            >
              Kunjungi Kami
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white hover:bg-white hover:text-cyan-900 px-8 py-4 rounded-full font-bold text-lg transition-all"
            >
              Hubungi Kami
            </motion.button>
          </div>

          {/* Contact info */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <FiMapPin className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-semibold">Lokasi</p>
              <p className="text-sm text-cyan-100/80">
                Jl. Kopi Nikmat No. 123, Jakarta Selatan
              </p>
            </div>
            <div>
              <FiClock className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-semibold">Jam Buka</p>
              <p className="text-sm text-cyan-100/80">
                07:00 - 22:00 (Setiap Hari)
              </p>
            </div>
            <div>
              <FiCoffee className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-semibold">Reservasi</p>
              <p className="text-sm text-cyan-100/80">
                +62 812-3456-7890
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <AboutHero />
      <OurStory />
      <MissionVision />
      <OurValues />
      <Statistics />
      <Timeline />
      <OurTeam />
      <Testimonials />
      <CallToAction />
    </div>
  );
}