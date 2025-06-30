import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiCoffee, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import HeaderAdmin from "../../components/Admin/HeaderAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { supabase } from "../../lib/supabase";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductFrom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete product with animation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        // Animate removal
        setProducts(prev => prev.filter(p => p.id !== id));
        
        // Show toast notification
        showToast('Product deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting product:', error);
        showToast('Error deleting product', 'error');
      }
    }
  };

  // Toast notification
  const showToast = (message, type) => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white font-medium flex items-center ${
      type === 'success' ? 'bg-teal-500' : 'bg-rose-500'
    }`;
    toast.innerHTML = `
      ${type === 'success' ? '<FiCheckCircle className="mr-2" />' : '<FiXCircle className="mr-2" />'}
      ${message}
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2', 'transition-all', 'duration-300');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // Handle edit
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  // Handle form close and refresh
  const handleFormClose = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

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
              <h1 className="text-2xl sm:text-3xl font-bold text-cyan-900">Menu Management</h1>
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

          {/* Products Section */}
          <motion.div 
            layout
            className="bg-white/80 backdrop-blur-lg rounded-xl shadow-sm border border-cyan-200/40 overflow-hidden"
          >
            {/* Products Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center p-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full"
                  />
                </div>
              ) : (
                <table className="min-w-full divide-y divide-cyan-100/50">
                  <thead className="bg-cyan-50/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider hidden md:table-cell">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider hidden lg:table-cell">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Actions
                      </th>
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
                            <h3 className="text-lg font-medium text-cyan-800">No products found</h3>
                            <p className="text-cyan-600/80 mt-1">Add your first product to get started</p>
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden border border-cyan-200/50">
                                  <img
                                    src={product.image_url || '/placeholder-coffee.jpg'}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-cyan-900">{product.name}</div>
                                  <div className="text-sm text-cyan-600/80 md:hidden">{product.category}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                              <div className="text-sm text-cyan-800">{product.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-cyan-900">Rp{product.price.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                              <div className="text-sm text-cyan-800">{product.stock || 0} in stock</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.is_available 
                                  ? 'bg-teal-100 text-teal-800' 
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {product.is_available ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleEdit(product)}
                                  className="text-cyan-600 hover:text-cyan-800 p-1.5 rounded-full hover:bg-cyan-100/50 transition-colors"
                                  title="Edit"
                                >
                                  <FiEdit2 />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(product.id)}
                                  className="text-rose-500 hover:text-rose-700 p-1.5 rounded-full hover:bg-rose-100/50 transition-colors"
                                  title="Delete"
                                >
                                  <FiTrash2 />
                                </motion.button>
                              </div>
                            </td>
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
        {showAddForm && (
          <AddProductForm
            onClose={handleFormClose}
          />
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {showEditForm && selectedProduct && (
          <EditProductForm
            product={selectedProduct}
            onClose={handleFormClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}