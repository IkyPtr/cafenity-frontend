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
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    product: null,
    action: null,
  });

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
    <div className="flex min-h-screen bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-cyan-900">
                Menu Management
              </h1>
              <p className="text-cyan-700/80 mt-1">Cafenity Admin Dashboard</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-cyan-300/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 bg-white/80 backdrop-blur-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiCoffee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500" />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
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
                className="bg-green-100 p-3 text-green-700 rounded mb-4"
              >
                {successMessage}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-100 p-3 text-red-700 rounded mb-4"
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
            className="bg-white/80 backdrop-blur-lg rounded-xl shadow-sm border border-cyan-200/40 overflow-hidden"
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
                    className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full"
                  />
                </div>
              ) : (
                <table className="min-w-full divide-y divide-cyan-100/50">
                  <thead className="bg-cyan-50/80">
                    <tr>
                      <Th>Product</Th>
                      <Th>Category</Th>
                      <Th>Price</Th>
                      <Th>Stock</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-cyan-100/30">
                    <AnimatePresence>
                      {products.length === 0 ? (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan="6" className="px-6 py-12 text-center">
                            <div className="text-cyan-500/50 mb-4">
                              <FiCoffee className="inline-block text-4xl" />
                            </div>
                            <h3 className="text-lg font-medium text-cyan-800">
                              No products found
                            </h3>
                            <p className="text-cyan-600/80 mt-1">
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
                            className="hover:bg-cyan-50/30 transition-colors"
                          >
                            <Td>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden border border-cyan-200/50">
                                  <img
                                    src={product.image_url || "/placeholder-coffee.jpg"}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-cyan-900">
                                    {product.name}
                                  </div>
                                  <div className="text-sm text-cyan-600/80 md:hidden">
                                    {product.categories?.name || 'No Category'}
                                  </div>
                                </div>
                              </div>
                            </Td>
                            <Td>
                              <div className="text-sm text-cyan-800">
                                {product.categories?.name || 'No Category'}
                              </div>
                            </Td>
                            <Td>
                              <div className="text-sm font-medium text-cyan-900">
                                Rp{product.price.toLocaleString()}
                              </div>
                            </Td>
                            <Td>
                              <div className="text-sm text-cyan-800">
                                {product.stock || 0} in stock
                              </div>
                            </Td>
                            <Td>
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  product.is_available
                                    ? "bg-teal-100 text-teal-800"
                                    : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {product.is_available
                                  ? "Available"
                                  : "Unavailable"}
                              </span>
                            </Td>
                            <Td>
                              <div className="flex justify-right space-x-2">
                                <ActionBtn
                                  icon={<FiCoffee />}
                                  onClick={() => handleShowDetail(product)}
                                  color="cyan"
                                  title="View Details"
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
        {showAddForm && <AddProductForm onClose={handleFormClose} />}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {showEditForm && selectedProduct && (
          <EditProductForm product={selectedProduct} onClose={handleFormClose} />
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
              className="bg-white p-6 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-cyan-900">Product Details</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  ✕
                </motion.button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <img
                    src={selectedProduct.image_url || "/placeholder-coffee.jpg"}
                    alt={selectedProduct.name}
                    className="w-32 h-32 object-cover rounded-lg border border-cyan-200/50"
                  />
                </div>
                <Info label="Product Name" value={selectedProduct.name} icon={<FiCoffee />} />
                <Info label="Category" value={selectedProduct.categories?.name || 'No Category'} icon={<FiCoffee />} />
                <Info label="Price" value={`Rp${selectedProduct.price.toLocaleString()}`} icon={<FiCoffee />} />
                <Info label="Stock" value={`${selectedProduct.stock || 0} in stock`} icon={<FiCoffee />} />
                <Info label="Description" value={selectedProduct.description || 'No description'} multiline />
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedProduct.is_available
                      ? "bg-teal-100 text-teal-800"
                      : "bg-rose-100 text-rose-800"
                  }`}>
                    {selectedProduct.is_available ? "Available" : "Unavailable"}
                  </span>
                  <span className="text-sm text-cyan-600/80">
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
                  className="bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
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
              className="bg-white p-6 rounded-xl shadow-xl w-96"
            >
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Delete Product?</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{confirmModal.product?.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfirmModal({ open: false, product: null, action: null })}
                  className="bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
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

// Komponen Reusable
const Th = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-700">
    {children}
  </td>
);

const StatCard = ({ icon, color, value, label }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-cyan-200/40 space-x-3"
  >
    <div className={`p-3 bg-gradient-to-r from-${color}-500 to-${color}-400 text-white rounded-lg shadow-md`}>
      {icon}
    </div>
    <div>
      <div className="text-xl font-bold text-cyan-900">{value}</div>
      <div className="text-sm text-cyan-600/80">{label}</div>
    </div>
  </motion.div>
);

const ActionBtn = ({ icon, onClick, color, title, disabled }) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.1 }}
    whileTap={{ scale: disabled ? 1 : 0.9 }}
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`text-${color}-600 hover:text-${color}-800 p-1.5 rounded-full hover:bg-${color}-100/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {icon}
  </motion.button>
);

const Info = ({ label, value, icon, multiline }) => (
  <div>
    <label className="block text-sm font-medium text-cyan-800 mb-2">{label}</label>
    <div className={`flex items-start p-3 bg-cyan-50/50 rounded-lg border border-cyan-200/30 ${multiline ? 'flex-col' : 'flex-row'}`}>
      {icon && <div className="mr-2 text-cyan-600">{icon}</div>}
      <div className={`text-cyan-800 ${multiline ? 'whitespace-pre-wrap' : ''}`}>{value || '-'}</div>
    </div>
  </div>
);
