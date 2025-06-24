import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiMapPin } from 'react-icons/fi';

export default function FeaturesSection() {
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
    <section className="py-20 bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-cyan-900 mb-4 font-poppins">
            Mengapa Memilih Cafenity?
          </h2>
          <p className="text-cyan-800/80 text-lg max-w-2xl mx-auto font-barlow">
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
              className="bg-white/50 backdrop-blur-lg border border-cyan-400/20 rounded-2xl p-8 text-center hover:bg-white/70 transition-all duration-300 shadow-md hover:shadow-cyan-500/10"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-cyan-900 mb-4 font-poppins">
                {feature.title}
              </h3>
              <p className="text-cyan-800/80 font-barlow">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}