import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCoffee, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function MenuPreviewSection() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  // Fetch products from Supabase
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch products with category info, limit to 4 for preview
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          price,
          image_url,
          is_available,
          categories (
            name
          )
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;

      // Transform data to match component structure
      const transformedData = data?.map(item => ({
        id: item.id,
        name: item.name,
        price: `Rp ${item.price.toLocaleString('id-ID')}`,
        description: item.description || 'Deskripsi tidak tersedia',
        image: item.image_url || '/images/default-coffee.jpg',
        rating: (Math.random() * 0.5 + 4.5).toFixed(1), // Random rating between 4.5-5.0
        popular: Math.random() > 0.5, // Random popular status
        category: item.categories?.name || 'Menu'
      })) || [];

      setMenuItems(transformedData);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Gagal memuat menu. Silakan coba lagi.');
      
      // Fallback to static data if fetch fails
      setMenuItems([
        {
          id: 'fallback-1',
          name: "Espresso",
          price: "Rp 25.000",
          description: "Kopi hitam pekat dengan rasa yang kuat",
          image: "/images/espresso.jpg",
          rating: 4.8,
          popular: true,
          category: "Coffee"
        },
        {
          id: 'fallback-2',
          name: "Cappuccino",
          price: "Rp 35.000",
          description: "Perpaduan espresso dengan susu dan foam",
          image: "/images/cappuccino.jpg",
          rating: 4.9,
          popular: false,
          category: "Coffee"
        },
        {
          id: 'fallback-3',
          name: "Latte",
          price: "Rp 40.000",
          description: "Espresso dengan steamed milk yang creamy",
          image: "/images/latte.jpg",
          rating: 4.7,
          popular: true,
          category: "Coffee"
        },
        {
          id: 'fallback-4',
          name: "Americano",
          price: "Rp 30.000",
          description: "Espresso yang diencerkan dengan air panas",
          image: "/images/americano.jpg",
          rating: 4.6,
          popular: false,
          category: "Coffee"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewFullMenu = () => {
    navigate('/menu');
  };

  const handleOrderNow = (item) => {
    // Navigate to menu page with specific item highlighted
    navigate('/menu', { state: { highlightItem: item.id } });
  };

  if (loading) {
    return (
      <section className={`py-20 transition-colors duration-300 ${
        isDarkTheme ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
            />
            <span className={`ml-4 text-lg transition-colors duration-300 ${
              isDarkTheme ? 'text-gray-300' : 'text-cyan-800'
            }`}>
              Memuat menu...
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkTheme ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 font-poppins transition-colors duration-300 ${
            isDarkTheme ? 'text-white' : 'text-cyan-900'
          }`}>
            <span className={`text-transparent bg-clip-text transition-all duration-300 ${
              isDarkTheme
                ? 'bg-gradient-to-r from-cyan-400 to-teal-400'
                : 'bg-gradient-to-r from-cyan-600 to-teal-600'
            }`}>
              Menu Favorit
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-barlow transition-colors duration-300 ${
            isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
          }`}>
            Nikmati berbagai pilihan kopi premium dengan cita rasa yang autentik
          </p>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 rounded-lg border transition-colors duration-300 ${
                isDarkTheme
                  ? 'bg-red-900/20 border-red-500/30 text-red-400'
                  : 'bg-red-50 border-red-200 text-red-600'
              }`}
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 transform hover:-translate-y-2 group ${
                isDarkTheme
                  ? 'bg-gray-800/90 border-gray-600/40 hover:shadow-xl hover:shadow-cyan-400/10 hover:bg-gray-800'
                  : 'bg-white border-gray-200/80 hover:shadow-xl hover:shadow-cyan-500/10 hover:bg-white/95'
              }`}
            >
              {/* Image Container */}
              <div className="h-48 bg-gray-200 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/images/default-coffee.jpg';
                  }}
                />
                
                {/* Popular Badge */}
                {item.popular && (
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300 ${
                    isDarkTheme
                      ? 'bg-cyan-500/90 text-white'
                      : 'bg-cyan-500 text-white'
                  }`}>
                    Popular
                  </div>
                )}

                {/* Category Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-colors duration-300 ${
                  isDarkTheme
                    ? 'bg-gray-800/80 text-cyan-400'
                    : 'bg-white/80 text-cyan-600'
                }`}>
                  {item.category}
                </div>

                {/* Rating Badge */}
                <div className={`absolute bottom-3 right-3 flex items-center px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-colors duration-300 ${
                  isDarkTheme
                    ? 'bg-gray-800/80 text-yellow-400'
                    : 'bg-white/80 text-yellow-600'
                }`}>
                  <FiStar className="w-3 h-3 mr-1 fill-current" />
                  {item.rating}
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${
                  isDarkTheme
                    ? 'bg-gray-900/60'
                    : 'bg-cyan-900/60'
                }`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className={`p-3 rounded-full transition-colors duration-300 ${
                      isDarkTheme
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white text-cyan-600'
                    }`}
                  >
                    <FiCoffee className="w-6 h-6" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-xl font-bold font-poppins transition-colors duration-300 ${
                    isDarkTheme ? 'text-white' : 'text-cyan-900'
                  }`}>
                    {item.name}
                  </h3>
                  <span className={`text-lg font-bold font-poppins transition-colors duration-300 ${
                    isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'
                  }`}>
                    {item.price}
                  </span>
                </div>
                
                <p className={`text-sm font-barlow mb-4 transition-colors duration-300 line-clamp-2 ${
                  isDarkTheme ? 'text-gray-300' : 'text-cyan-800/80'
                }`}>
                  {item.description}
                </p>
              </div>

              {/* Bottom Accent */}
              <div className={`h-1 transition-colors duration-300 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-400'
                  : 'bg-gradient-to-r from-cyan-500 to-teal-500'
              }`} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewFullMenu}
            className={`group px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
              isDarkTheme
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 hover:shadow-cyan-500/25'
                            : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-700 hover:to-teal-700 hover:shadow-cyan-600/25'
            } hover:shadow-xl`}
          >
            <span className="flex items-center justify-center">
              Lihat Menu Lengkap
              <FiArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>

          {/* Additional Info */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <div className={`flex items-center transition-colors duration-300 ${
              isDarkTheme ? 'text-gray-400' : 'text-cyan-700/80'
            }`}>
              <FiCoffee className="w-4 h-4 mr-2" />
              <span>Lebih dari 20+ varian menu</span>
            </div>
            <div className={`hidden sm:block w-1 h-1 rounded-full transition-colors duration-300 ${
              isDarkTheme ? 'bg-gray-600' : 'bg-cyan-300'
            }`} />
            <div className={`flex items-center transition-colors duration-300 ${
              isDarkTheme ? 'text-gray-400' : 'text-cyan-700/80'
            }`}>
              <FiStar className="w-4 h-4 mr-2" />
              <span>Rating 4.8/5 dari pelanggan</span>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full transition-colors duration-300 ${
                isDarkTheme
                  ? 'bg-gradient-to-br from-cyan-400/5 to-teal-400/5'
                  : 'bg-gradient-to-br from-cyan-400/10 to-teal-400/10'
              }`}
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(40px)',
              }}
              initial={{ opacity: 0 }}
              animate={{
                x: [0, Math.random() * 30 - 15],
                y: [0, Math.random() * 30 - 15],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: i * 3
              }}
            />
          ))}
        </div>

        {/* Floating Coffee Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`coffee-${i}`}
              className={`absolute transition-colors duration-300 ${
                isDarkTheme ? 'text-cyan-400/10' : 'text-cyan-500/20'
              }`}
              style={{
                fontSize: `${Math.random() * 15 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 20 - 10],
                x: [0, Math.random() * 20 - 10],
                rotate: [0, 360],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: i * 1.5
              }}
            >
              ☕
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom CSS for line clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
