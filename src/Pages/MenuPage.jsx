import { useState, useEffect } from "react";
import {
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiChevronRight,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (categoriesError) throw categoriesError;

      // Fetch products with category info
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select(
          `
          *,
          categories (
            name
          )
        `
        )
        .eq("is_available", true)
        .order("created_at");

      if (productsError) throw productsError;

      setCategories(categoriesData || []);
      setProducts(productsData || []);

      // Initialize quantities
      const initialQuantities = {};
      productsData?.forEach((product) => {
        initialQuantities[product.id] = 0;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (id, value) => {
    const newValue = Math.max(0, value);
    setQuantities((prev) => ({ ...prev, [id]: newValue }));
  };

  const categoryNames = ["All", ...categories.map((cat) => cat.name)];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.categories?.name === activeCategory
        );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-cyan-700 text-lg">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]">
      {/* Liquid background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-cyan-400/20 to-teal-400/20"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(80px)",
              opacity: 0.4,
              animation: `liquid-float ${
                Math.random() * 20 + 10
              }s infinite alternate ease-in-out`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {!showMenu ? (
          <>
            {/* Hero content section */}
            <div className="text-center mb-16 pt-20">
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 mb-6">
                Taste the Experience
              </h1>
              <p className="text-xl text-cyan-800/80 max-w-3xl mx-auto">
                Discover our carefully crafted beverages and culinary creations
                before diving into the menu
              </p>
            </div>

            {/* Content cards grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16">
              {/* Story card */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt="Our story"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
                  <p className="text-sm text-white/80 uppercase font-semibold mb-2">
                    Our Journey
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    The Art of Craftsmanship
                  </h3>
                  <p className="text-white/90 mb-4">
                    Discover how our passion for quality ingredients transforms
                    into exceptional flavors
                  </p>
                  <button className="flex items-center text-white group-hover:text-cyan-300 transition-colors">
                    Read our story <FiChevronRight className="ml-1" />
                  </button>
                </div>
              </div>

              {/* Process card */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt="Our process"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 z-20 p-6 w-full backdrop-blur-sm bg-white/5 border-t border-white/10">
                  <p className="text-sm text-white/80 uppercase font-semibold mb-2">
                    Behind the Scenes
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    From Farm to Cup
                  </h3>
                  <p className="text-white/90 mb-4">
                    Our sustainable sourcing and meticulous preparation process
                  </p>
                  <button className="flex items-center text-white group-hover:text-cyan-300 transition-colors">
                    Explore process <FiChevronRight className="ml-1" />
                  </button>
                </div>
              </div>

              {/* Seasonal card */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden group col-span-1 md:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/80 to-teal-600/80 z-10" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 p-8">
                  <p className="text-sm text-white/90 uppercase font-semibold mb-4">
                    Seasonal Special
                  </p>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Summer Breeze Collection
                  </h3>
                  <p className="text-white/90 mb-8 max-w-md">
                    Experience our limited-time offerings featuring fresh,
                    seasonal ingredients
                  </p>
                  <button
                    onClick={() => setShowMenu(true)}
                    className="px-8 py-3 bg-white text-cyan-700 rounded-full font-semibold hover:bg-cyan-50 transition-colors flex items-center"
                  >
                    View Menu <FiChevronRight className="ml-2" />
                  </button>
                </div>
                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                </div>
              </div>
            </div>

            {/* Testimonials section */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-16">
              <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-white/40 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-cyan-900">Sarah Johnson</h4>
                    <p className="text-sm text-cyan-700/80">Food Blogger</p>
                  </div>
                </div>
                <p className="text-cyan-900 italic">
                  "The attention to detail in every drink is remarkable. I've
                  never tasted such perfectly balanced flavors anywhere else."
                </p>
              </div>
              <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-white/40 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-cyan-900">Michael Chen</h4>
                    <p className="text-sm text-cyan-700/80">Regular Customer</p>
                  </div>
                </div>
                <p className="text-cyan-900 italic">
                  "This place has become my daily ritual. The quality is
                  consistent and the atmosphere makes every visit special."
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Menu section */}
            <div className="flex justify-between items-center mb-12">
              <button
                onClick={() => setShowMenu(false)}
                className="flex items-center text-cyan-700 hover:text-cyan-600 transition-colors"
              >
                <FiChevronRight className="rotate-180 mr-1" /> Back to Overview
              </button>
              <h2 className="text-3xl font-bold text-cyan-900">Our Menu</h2>
              <div className="w-24"></div>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categoryNames.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-cyan-600 text-white shadow-md"
                      : "bg-white/70 text-cyan-700 hover:bg-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu items grid */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        item.image_url ||
                        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 text-cyan-700 text-xs px-3 py-1 rounded-full shadow-sm">
                      {item.categories?.name || "Menu"}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-cyan-900">
                        {item.name}
                      </h3>
                      <p className="text-cyan-700 font-semibold">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="text-sm text-cyan-700/80 mb-5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state when no products found */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">☕</div>
                <h3 className="text-2xl font-bold text-cyan-800 mb-2">
                  No items found
                </h3>
                <p className="text-cyan-600">
                  Try selecting a different category
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes liquid-float {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(5%, 3%) scale(1.05);
          }
          66% {
            transform: translate(-3%, 4%) scale(0.98);
          }
          100% {
            transform: translate(-5%, -2%) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
