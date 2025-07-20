import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCoffee,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import HeaderAdmin from "../../components/Admin/HeaderAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { supabase } from "../../lib/supabase";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductFrom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    product: null,
    action: null,
  });

  // Sync dengan dark mode dari localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }

    // Listen untuk perubahan dark mode
    const handleDarkModeChange = () => {
      const currentDarkMode = localStorage.getItem('darkMode');
      if (currentDarkMode) {
        setIsDarkMode(JSON.parse(currentDarkMode));
      }
    };

    window.addEventListener('darkModeChanged', handleDarkModeChange);

    return () => {
      window.removeEventListener('darkModeChanged', handleDarkModeChange);
    };
  }, []);

  // Fetch products from Supabase with category name
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      let query = supabase
        .from("products")
        .select(`
          *,
          categories (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(`Error fetching products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Confirm delete
  const confirmDelete = (product) => {
    setConfirmModal({ open: true, product, action: 'delete' });
  };

  // Delete product
  const handleDelete = async () => {
    const { product } = confirmModal;
    if (!product) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) throw error;

      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      setSuccessMessage("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error deleting product: " + error.message);
    } finally {
      setConfirmModal({ open: false, product: null, action: null });
    }
  };

  // Show product detail
  const handleShowDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  // Edit
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowDetailModal(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]'
    }`}>
      <SidebarAdmin />

      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8"
        >
          {/* Header with Search and Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-cyan-900'
              }`}>
                Menu Management
              </h1>
              <p className={`mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-cyan-700/80'
              }`}>
                Cafenity Admin Dashboard
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-1 transition-all ${
                    isDarkMode
                      ? 'border-gray-600/50 focus:border-cyan-400 focus:ring-cyan-400/30 bg-gray-800/80 text-gray-100 placeholder-gray-400'
                      : 'border-cyan-300/50 focus:border-cyan-500 focus:ring-cyan-500/30 bg-white/80 text-gray-900 placeholder-gray-500'
                  } backdrop-blur-sm`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiCoffee className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-cyan-400' : 'text-cyan-500'
                }`} />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddForm(true)}
                className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500'
                    : 'bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400'
                } text-white`}
              >
                <FiPlus />
                <span>Add Product</span>
              </motion.button>
            </div>
          </div>

          {/* Success/Error Messages */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-3 rounded mb-4 ${
                  isDarkMode
                    ? 'bg-green-900/50 text-green-300 border border-green-700/50'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {successMessage}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-3 rounded mb-4 ${
                  isDarkMode
                    ? 'bg-red-900/50 text-red-300 border border-red-700/50'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Section */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`rounded-xl shadow-sm border overflow-hidden ${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700/40'
                : 'bg-white/80 border-cyan-200/40'
            } backdrop-blur-lg`}
          >
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center p-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`w-8 h-8 border-4 border-t-transparent rounded-full ${
                      isDarkMode ? 'border-cyan-400' : 'border-cyan-500'
                    }`}
                  />
                </div>
              ) : (
                <table className="min-w-full divide-y divide-opacity-50">
                  <thead className={isDarkMode ? 'bg-gray-700/80' : 'bg-cyan-50/80'}>
                    <tr>
                      <Th isDarkMode={isDarkMode}>Product</Th>
                      <Th isDarkMode={isDarkMode}>Category</Th>
                      <Th isDarkMode={isDarkMode}>Price</Th>
                      <Th isDarkMode={isDarkMode}>Stock</Th>
                      <Th isDarkMode={isDarkMode}>Status</Th>
                      <Th isDarkMode={isDarkMode}>Actions</Th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-opacity-30 ${
                    isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-cyan-100'
                  }`}>
                    <AnimatePresence>
                      {products.length === 0 ? (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan="6" className="px-6 py-12 text-center">
                            <div className={`mb-4 ${
                              isDarkMode ? 'text-cyan-400/50' : 'text-cyan-500/50'
                            }`}>
                              <FiCoffee className="inline-block text-4xl" />
                            </div>
                            <h3 className={`text-lg font-medium ${
                              isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                            }`}>
                              No products found
                            </h3>
                            <p className={`mt-1 ${
                              isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                            }`}>
                              Add your first product to get started
                            </p>
                          </td>
                        </motion.tr>
                      ) : (
                        products.map((product) => (
                          <motion.tr
                            key={product.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className={`transition-colors ${
                              isDarkMode 
                                ? 'hover:bg-gray-700/30' 
                                : 'hover:bg-cyan-50/30'
                            }`}
                          >
                            <Td isDarkMode={isDarkMode}>
                              <div className="flex items-center">
                                <div className={`flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden border ${
                                  isDarkMode ? 'border-gray-600/50' : 'border-cyan-200/50'
                                }`}>
                                  <img
                                    src={product.image_url || "/placeholder-coffee.jpg"}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className={`text-sm font-medium ${
                                    isDarkMode ? 'text-gray-100' : 'text-cyan-900'
                                  }`}>
                                    {product.name}
                                  </div>
                                  <div className={`text-sm md:hidden ${
                                    isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                                  }`}>
                                    {product.categories?.name || 'No Category'}
                                  </div>
                                </div>
                              </div>
                            </Td>
                            <Td isDarkMode={isDarkMode}>
                              <div className={`text-sm ${
                                isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                              }`}>
                                {product.categories?.name || 'No Category'}
                              </div>
                            </Td>
                            <Td isDarkMode={isDarkMode}>
                              <div className={`text-sm font-medium ${
                                isDarkMode ? 'text-gray-100' : 'text-cyan-900'
                              }`}>
                                Rp{product.price.toLocaleString()}
                              </div>
                            </Td>
                                                        <Td isDarkMode={isDarkMode}>
                              <div className={`text-sm ${
                                isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                              }`}>
                                {product.stock || 0} in stock
                              </div>
                            </Td>
                            <Td isDarkMode={isDarkMode}>
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  product.is_available
                                    ? isDarkMode
                                      ? "bg-teal-900/50 text-teal-300 border border-teal-700/50"
                                      : "bg-teal-100 text-teal-800"
                                    : isDarkMode
                                      ? "bg-rose-900/50 text-rose-300 border border-rose-700/50"
                                      : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {product.is_available
                                  ? "Available"
                                  : "Unavailable"}
                              </span>
                            </Td>
                            <Td isDarkMode={isDarkMode}>
                              <div className="flex justify-right space-x-2">
                                <ActionBtn
                                  icon={<FiCoffee />}
                                  onClick={() => handleShowDetail(product)}
                                  color="cyan"
                                  title="View Details"
                                  isDarkMode={isDarkMode}
                                />
                              </div>
                            </Td>
                          </motion.tr>
                        ))
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddForm && <AddProductForm onClose={handleFormClose} isDarkMode={isDarkMode} />}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {showEditForm && selectedProduct && (
          <EditProductForm product={selectedProduct} onClose={handleFormClose} isDarkMode={isDarkMode} />
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`p-6 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700/50' 
                  : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-gray-100' : 'text-cyan-900'
                }`}>
                  Product Details
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDetailModal(false)}
                  className={`p-1 rounded-full transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  ✕
                </motion.button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <img
                    src={selectedProduct.image_url || "/placeholder-coffee.jpg"}
                    alt={selectedProduct.name}
                    className={`w-32 h-32 object-cover rounded-lg border ${
                      isDarkMode ? 'border-gray-600/50' : 'border-cyan-200/50'
                    }`}
                  />
                </div>
                <Info 
                  label="Product Name" 
                  value={selectedProduct.name} 
                  icon={<FiCoffee />} 
                  isDarkMode={isDarkMode}
                />
                <Info 
                  label="Category" 
                  value={selectedProduct.categories?.name || 'No Category'} 
                  icon={<FiCoffee />} 
                  isDarkMode={isDarkMode}
                />
                <Info 
                  label="Price" 
                  value={`Rp${selectedProduct.price.toLocaleString()}`} 
                  icon={<FiCoffee />} 
                  isDarkMode={isDarkMode}
                />
                <Info 
                  label="Stock" 
                  value={`${selectedProduct.stock || 0} in stock`} 
                  icon={<FiCoffee />} 
                  isDarkMode={isDarkMode}
                />
                <Info 
                  label="Description" 
                  value={selectedProduct.description || 'No description'} 
                  multiline 
                  isDarkMode={isDarkMode}
                />
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedProduct.is_available
                      ? isDarkMode
                        ? "bg-teal-900/50 text-teal-300 border border-teal-700/50"
                        : "bg-teal-100 text-teal-800"
                      : isDarkMode
                        ? "bg-rose-900/50 text-rose-300 border border-rose-700/50"
                        : "bg-rose-100 text-rose-800"
                  }`}>
                    {selectedProduct.is_available ? "Available" : "Unavailable"}
                  </span>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                  }`}>
                    Created: {new Date(selectedProduct.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { handleEdit(selectedProduct); setShowDetailModal(false); }}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Edit Product
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { confirmDelete(selectedProduct); setShowDetailModal(false); }}
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Delete Product
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDetailModal(false)}
                  className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-gray-100'
                      : 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700'
                  }`}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {confirmModal.open && confirmModal.action === 'delete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`p-6 rounded-xl shadow-xl w-96 ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700/50' 
                  : 'bg-white'
              }`}
            >
              <h2 className={`text-lg font-semibold mb-3 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Delete Product?
              </h2>
              <p className={`mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Are you sure you want to delete <strong>{confirmModal.product?.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfirmModal({ open: false, product: null, action: null })}
                  className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-gray-100'
                      : 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700'
                  }`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Komponen Reusable dengan Dark Mode Support
const Th = ({ children, isDarkMode }) => (
  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
    isDarkMode ? 'text-gray-300' : 'text-cyan-800'
  }`}>
    {children}
  </th>
);

const Td = ({ children, isDarkMode }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
    isDarkMode ? 'text-gray-300' : 'text-cyan-700'
  }`}>
    {children}
  </td>
);

const StatCard = ({ icon, color, value, label, isDarkMode }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className={`flex items-center p-4 rounded-xl shadow-sm border space-x-3 ${
      isDarkMode 
        ? 'bg-gray-800/80 border-gray-700/40' 
        : 'bg-white/80 border-cyan-200/40'
    } backdrop-blur-sm`}
  >
    <div className={`p-3 bg-gradient-to-r from-${color}-500 to-${color}-400 text-white rounded-lg shadow-md`}>
      {icon}
    </div>
    <div>
      <div className={`text-xl font-bold ${
        isDarkMode ? 'text-gray-100' : 'text-cyan-900'
      }`}>
        {value}
      </div>
      <div className={`text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
      }`}>
        {label}
      </div>
    </div>
  </motion.div>
);

const ActionBtn = ({ icon, onClick, color, title, disabled, isDarkMode }) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.1 }}
    whileTap={{ scale: disabled ? 1 : 0.9 }}
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`p-1.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
      isDarkMode
        ? `text-${color}-400 hover:text-${color}-300 hover:bg-${color}-900/20`
        : `text-${color}-600 hover:text-${color}-800 hover:bg-${color}-100/50`
    }`}
  >
    {icon}
  </motion.button>
);

const Info = ({ label, value, icon, multiline, isDarkMode }) => (
  <div>
    <label className={`block text-sm font-medium mb-2 ${
      isDarkMode ? 'text-gray-300' : 'text-cyan-800'
    }`}>
      {label}
    </label>
    <div className={`flex items-start p-3 rounded-lg border ${
      multiline ? 'flex-col' : 'flex-row'
    } ${
      isDarkMode 
        ? 'bg-gray-700/50 border-gray-600/30' 
        : 'bg-cyan-50/50 border-cyan-200/30'
    }`}>
      {icon && <div className={`mr-2 ${
        isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
      }`}>
        {icon}
      </div>}
            <div className={`${
        isDarkMode ? 'text-gray-200' : 'text-cyan-800'
      } ${multiline ? 'whitespace-pre-wrap' : ''}`}>
        {value || '-'}
      </div>
    </div>
  </div>
);

