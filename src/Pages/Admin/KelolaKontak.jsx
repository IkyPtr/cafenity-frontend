import React, { useState, useEffect } from "react";
import { FaEnvelope, FaUser, FaPhone, FaTrash, FaEye, FaReply, FaCheckCircle, FaClock } from "react-icons/fa";
import HeaderAdmin from "../../components/Admin/HeaderAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { supabase } from "../../lib/supabase";

export default function KelolaKontak() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fetch contact messages from Supabase
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching contact messages...');
      
      const { data, error } = await supabase
        .from('contact_message')
        .select('id, name, email, message, status, created_at')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Contact messages data:', data);
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      setError(`Error fetching contact messages: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update contact status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      console.log('Updating contact status:', id, newStatus);
      
      const { error } = await supabase
        .from('contact_message')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setContacts(prev => prev.map(contact => 
        contact.id === id ? { ...contact, status: newStatus } : contact
      ));
      
      alert(`Status updated to ${newStatus} successfully!`);
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status: ' + error.message);
    }
  };

  // Delete contact message
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        console.log('Deleting contact message:', id);
        
        const { error } = await supabase
          .from('contact_message')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Remove from local state
        setContacts(prev => prev.filter(contact => contact.id !== id));
        alert('Message deleted successfully!');
        console.log('Message deleted successfully');
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Error deleting message: ' + error.message);
      }
    }
  };

  // Show contact detail
  const handleShowDetail = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusLower = (status || 'pending').toLowerCase();
    switch (statusLower) {
      case 'read':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" />
            Read
          </span>
        );
      case 'replied':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FaReply className="mr-1" />
            Replied
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaClock className="mr-1" />
            Pending
          </span>
        );
    }
  };

  // Test Supabase connection
  const testSupabaseConnection = async () => {
    try {
      console.log('=== TESTING SUPABASE CONNECTION ===');
      
      const { data, error } = await supabase
        .from('contact_message')
        .select('*')
        .limit(1);
      
      console.log('Connection test:', { data, error });
      alert('✅ Connection test completed! Check console for details.');
      
    } catch (error) {
      console.error('Connection test failed:', error);
      alert('❌ Connection test failed: ' + error.message);
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching contact messages...');
    fetchContacts();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <div className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">

          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kelola Kontak</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Home/Dashboard / Kelola Kontak</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Debug Info */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            <div className="flex justify-between items-center mb-2">
              <p><strong>Debug Info:</strong></p>
              <div className="space-x-2">
                <button
                  onClick={testSupabaseConnection}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                >
                  Test Connection
                </button>
                <button
                  onClick={fetchContacts}
                  className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                >
                  Refresh Data
                </button>
              </div>
            </div>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
            <p>Messages count: {contacts.length}</p>
            <p>Error: {error || 'None'}</p>
          </div>

          {/* Stats Grid */}
          <div id="dashboard-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 sm:space-x-4 bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="bg-blue-500 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                <FaEnvelope className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold text-gray-800">{contacts.length}</span>
                <span className="text-xs sm:text-sm text-gray-500 truncate">Total Messages</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="bg-green-500 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                <FaUser className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  {new Set(contacts.map(c => c.email)).size}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 truncate">Unique Contacts</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="bg-yellow-500 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                <FaClock className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  {contacts.filter(c => (c.status || 'pending').toLowerCase() === 'pending').length}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 truncate">Pending</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="bg-green-600 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                <FaCheckCircle className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  {contacts.filter(c => ['read', 'replied'].includes((c.status || '').toLowerCase())).length}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 truncate">Processed</span>
              </div>
            </div>
          </div>

          {/* Contact Messages Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b bg-gray-50">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Contact Messages</h2>
            </div>

            {/* Messages Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center p-8 sm:p-12">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-sm sm:text-base text-gray-600">Loading messages...</span>
                </div>
              ) : (
                <div className="min-w-full">
                  {/* Mobile Card View */}
                  <div className="block lg:hidden">
                    {contacts.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <div className="text-4xl mb-2">📧</div>
                        <p>No contact messages found</p>
                        <p className="text-xs mt-2">Try clicking "Test Connection" or "Refresh Data"</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {contacts.map((contact) => (
                          <div key={contact.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">
                                    {contact.name || 'No Name'}
                                  </h3>
                                  <p className="text-xs text-gray-500">{contact.email || 'No Email'}</p>
                                </div>
                                <div className="flex flex-col items-end space-y-1">
                                  {getStatusBadge(contact.status)}
                                  <div className="flex space-x-1 flex-shrink-0">
                                    <button
                                      onClick={() => handleShowDetail(contact)}
                                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                                      title="View Details"
                                    >
                                      <FaEye className="text-sm" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(contact.id)}
                                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                                      title="Delete"
                                    >
                                      <FaTrash className="text-sm" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="text-xs text-gray-600">
                                <p><span className="font-medium">Date:</span> {formatDate(contact.created_at)}</p>
                              </div>

                              <div className="text-xs text-gray-700">
                                <p className="font-medium mb-1">Message:</p>
                                <p className="line-clamp-2 bg-gray-50 p-2 rounded">
                                  {contact.message || 'No message'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                                  {/* Desktop Table View */}
                  <table className="hidden lg:table w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact Info
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contacts.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                            <div className="text-4xl mb-2">📧</div>
                            <p>No contact messages found</p>
                            <p className="text-xs mt-2">Try clicking "Test Connection" or "Refresh Data"</p>
                          </td>
                        </tr>
                      ) : (
                        contacts.map((contact) => (
                          <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 lg:px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {contact.name || 'No Name'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {contact.email || 'No Email'}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4">
                              <div className="text-sm text-gray-900 max-w-xs">
                                <p className="line-clamp-2 overflow-hidden">
                                  {contact.message || 'No message'}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col space-y-1">
                                {getStatusBadge(contact.status)}
                                <select
                                  value={contact.status || 'pending'}
                                  onChange={(e) => handleUpdateStatus(contact.id, e.target.value)}
                                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="read">Read</option>
                                  <option value="replied">Replied</option>
                                </select>
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {formatDate(contact.created_at)}
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleShowDetail(contact)}
                                  className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                                  title="View Details"
                                >
                                  <FaEye className="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(contact.id, 'read')}
                                  className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded transition-colors"
                                  title="Mark as Read"
                                >
                                  <FaCheckCircle className="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleDelete(contact.id)}
                                  className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                                  title="Delete Message"
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

          {/* Raw Data Debug (Remove this in production) */}
          {contacts.length > 0 && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-bold mb-2">Debug - Raw Data (First Contact):</h3>
              <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(contacts[0], null, 2)}
              </pre>
            </div>
          )}

        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedContact && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="text-lg font-bold text-gray-900">Message Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedContact.name || 'No Name'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedContact.email || 'No Email'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="bg-gray-50 p-2 rounded">
                      {getStatusBadge(selectedContact.status)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {formatDate(selectedContact.created_at)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded min-h-[100px] whitespace-pre-wrap">
                    {selectedContact.message || 'No message'}
                  </div>
                </div>

                {/* Status Update Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedContact.id, 'pending');
                        setSelectedContact({...selectedContact, status: 'pending'});
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                    >
                      Mark as Pending
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedContact.id, 'read');
                        setSelectedContact({...selectedContact, status: 'read'});
                      }}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Mark as Read
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedContact.id, 'replied');
                        setSelectedContact({...selectedContact, status: 'replied'});
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Mark as Replied
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-2 pt-4 border-t mt-6">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedContact.id);
                    setShowDetailModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

