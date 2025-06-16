import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiMapPin, FiClock, FiPhone, FiMail, FiSend } from 'react-icons/fi';
import { supabase } from '../lib/supabase';

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

const MenuPreviewSection = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedMenuItems();
  }, []);

  const fetchFeaturedMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('is_available', true)
        .eq('is_featured', true)
        .limit(4)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching featured menu items:', error);
      // Fallback data jika error
      setMenuItems([
        {
          id: 1,
          name: "Espresso",
          price: 25000,
          description: "Kopi hitam pekat dengan rasa yang kuat",
          image_url: "/images/espresso.jpg"
        },
        {
          id: 2,
          name: "Cappuccino",
          price: 35000,
          description: "Perpaduan espresso dengan susu dan foam",
          image_url: "/images/cappuccino.jpg"
        },
        {
          id: 3,
          name: "Latte",
          price: 40000,
          description: "Espresso dengan steamed milk yang creamy",
          image_url: "/images/latte.jpg"
        },
        {
          id: 4,
          name: "Americano",
          price: 30000,
          description: "Espresso yang diencerkan dengan air panas",
          image_url: "/images/americano.jpg"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9f67] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading menu...</p>
          </div>
        </div>
      </section>
    );
  }

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
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={item.image_url || '/images/default-coffee.jpg'} 
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
                    {formatPrice(item.price)}
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
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Fallback data jika error
      setTestimonials([
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Coffee Enthusiast",
          content: "Cafenity adalah tempat favorit saya untuk bekerja dan bersantai. Kopinya luar biasa dan suasananya sangat nyaman!",
          rating: 5,
          avatar_url: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          id: 2,
          name: "Ahmad Rizki",
          role: "Freelancer",
          content: "Pelayanan yang ramah dan kopi yang berkualitas. Tempat yang sempurna untuk meeting atau sekadar menikmati waktu sendiri.",
          rating: 5,
          avatar_url: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          id: 3,
          name: "Maria Santos",
          role: "Student",
          content: "WiFi cepat, tempat nyaman untuk belajar, dan menu yang beragam. Cafenity sudah seperti rumah kedua bagi saya!",
          rating: 5,
          avatar_url: "https://randomuser.me/api/portraits/women/68.jpg"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9f67] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

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
              key={testimonial.id}
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
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar_url || 'https://randomuser.me/api/portraits/men/1.jpg'} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#243137] font-poppins">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm font-barlow">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

            {/* Success Message */}
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
              >
                <FiSend className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-700 font-barlow">
                  Pesan berhasil dikirim! Terima kasih.
                </span>
              </motion.div>
            )}

            {/* Error Message */}
            {submitError && (
                          {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <span className="text-red-700 font-barlow">
                  {submitError}
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bd9f67] focus:border-transparent transition-all duration-300 font-barlow"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bd9f67] focus:border-transparent transition-all duration-300 font-barlow"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Pesan Anda"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bd9f67] focus:border-transparent transition-all duration-300 font-barlow resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 font-poppins flex items-center justify-center ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-[#bd9f67] hover:bg-[#bd9f67]/90 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5 mr-2" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
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
    </div>
  );
}


