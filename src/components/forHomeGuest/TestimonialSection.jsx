import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function TestimonialSection() {
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
    <section className="py-20 bg-gradient-to-b from-[#f0f8ff] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-cyan-900 mb-4 font-poppins">
            Apa Kata Mereka?
          </h2>
          <p className="text-cyan-800/80 text-lg max-w-2xl mx-auto font-barlow">
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
              className="bg-white border border-cyan-400/20 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-cyan-500 fill-current" />
                ))}
              </div>
              <p className="text-cyan-800/90 mb-6 font-barlow italic">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="font-bold text-cyan-900 font-poppins">
                  {testimonial.name}
                </h4>
                <p className="text-cyan-700/80 text-sm font-barlow">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}