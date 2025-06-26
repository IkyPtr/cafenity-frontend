import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
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

  // Fetch products from Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        // Refresh products list
        fetchProducts();
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
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
    fetchProducts(); // Refresh data
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <div className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">

          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Halaman Menu</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Cafenity Cafe - Admin</p>
          </div>

          {/* Products Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header with Add Button */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6 border-b bg-gray-50">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-0">Products Management</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                <FaPlus className="text-sm" />
                <span className="text-sm sm:text-base">Add Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center p-8 sm:p-12">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-500"></div>
                  <span className="ml-2 text-sm sm:text-base text-gray-600">Loading products...</span>
                </div>
              ) : (
                <div className="min-w-full">
                  {/* Mobile Card View */}
                  <div className="block sm:hidden">
                    {products.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <div className="text-4xl mb-2">📦</div>
                        <p>No products found</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {products.map((product) => (
                          <div key={product.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-start space-x-3">
                              <img
                                src={product.image_url || '/placeholder-image.jpg'}
                                alt={product.name}
                                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-sm font-medium text-gray-900 truncate pr-2">
                                    {product.name}
                                  </h3>
                                  <div className="flex space-x-1 flex-shrink-0">
                                    <button
                                      onClick={() => handleEdit(product)}
                                      className="text-blue-600 hover:text-blue-800 p-1"
                                      title="Edit"
                                    >
                                      <FaEdit className="text-sm" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(product.id)}
                                      className="text-red-600 hover:text-red-800 p-1"
                                      title="Delete"
                                    >
                                      <FaTrash className="text-sm" />
                                    </button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                  <div>
                                    <span className="font-medium">Category:</span> {product.category}
                                  </div>
                                  <div>
                                    <span className="font-medium">Price:</span> ${product.price}
                                  </div>
                                  <div>
                                    <span className="font-medium">Stock:</span> {product.stock || 0}
                                  </div>
                                  <div>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                      product.is_available 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {product.is_available ? 'Available' : 'Unavailable'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Desktop Table View */}
                  <table className="hidden sm:table w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Category
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                          Stock
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Status
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                            <div className="text-4xl mb-2">📦</div>
                            <p>No products found</p>
                          </td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <img
                                src={product.image_url || '/placeholder-image.jpg'}
                                alt={product.name}
                                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover"
                              />
                            </td>
                            <td className="px-4 lg:px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                {product.name}
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                              <div className="text-sm text-gray-900">{product.category}</div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">Rp.{product.price}</div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                              <div className="text-sm text-gray-900">{product.stock || 0}</div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                product.is_available 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.is_available ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                                                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                                  title="Edit"
                                >
                                  <FaEdit className="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                                  title="Delete"
                                >
                                  <FaTrash className="text-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <AddProductForm
          onClose={handleFormClose}
        />
      )}

      {/* Edit Product Modal */}
      {showEditForm && selectedProduct && (
        <EditProductForm
          product={selectedProduct}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
