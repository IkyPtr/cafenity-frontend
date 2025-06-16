import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';
export default function MenuPreviewSection() {
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
}