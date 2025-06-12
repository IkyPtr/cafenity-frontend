import { useState } from 'react';
import { FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import menuData from '/src/assets/menu.json'; // ganti path sesuai struktur proyekmu

export default function MenuPage() {
  const [menuItems] = useState(menuData);
  const [quantities, setQuantities] = useState(
    menuData.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (id, value) => {
    const newValue = Math.max(0, value);
    setQuantities((prev) => ({ ...prev, [id]: newValue }));
  };

  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFBDE]/30 to-white">
      {/* Background liquid effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#90D1CA]/20 backdrop-blur-xl"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.6,
              animation: `float ${Math.random() * 10 + 10}s infinite alternate ease-in-out`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-teal-800 mb-6">
          Our Menu
        </h1>
        <p className="text-center text-teal-600 max-w-2xl mx-auto mb-12">
          Discover our carefully crafted selection of beverages and pastries
        </p>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-teal-700 text-white shadow-lg'
                  : 'bg-white/70 text-teal-700 hover:bg-white/90 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative group bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-teal-900">{item.name}</h3>
                  <p className="text-teal-700 font-semibold whitespace-nowrap ml-2">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm text-teal-700 mb-4">{item.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center bg-white/70 rounded-full p-1 shadow-inner">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, quantities[item.id] - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="mx-3 w-6 text-center font-medium text-teal-900">
                      {quantities[item.id]}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, quantities[item.id] + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <button
                    disabled={quantities[item.id] === 0}
                    className={`flex items-center px-4 py-2 rounded-full transition-all ${
                      quantities[item.id] > 0
                        ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <FiShoppingCart className="mr-2" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </section>
  );
}
