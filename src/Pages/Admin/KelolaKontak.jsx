import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaTrash,
  FaEye,
  FaReply,
  FaCheckCircle,
  FaClock,
  FaSyncAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import HeaderAdmin from "../../components/Admin/HeaderAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { supabase } from "../../lib/supabase";

export default function KelolaKontak() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('contact_messages')
        .select('id, name, email, message, status, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      setError(`Error fetching contact messages: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      setContacts(prev => prev.map(contact =>
        contact.id === id ? { ...contact, status: newStatus } : contact
      ));
      setSuccessMessage(`Status berhasil diubah menjadi ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Error updating status: ' + error.message);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete.id) return;
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', confirmDelete.id);
      if (error) throw error;
      setContacts(prev => prev.filter(contact => contact.id !== confirmDelete.id));
      setConfirmDelete({ show: false, id: null });
      setSuccessMessage('Pesan berhasil dihapus.');
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Error deleting message: ' + error.message);
    }
  };

  const handleShowDetail = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleString('id-ID', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const Badge = ({ icon, color, text }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      isDarkMode
        ? `bg-${color}-900/50 text-${color}-300 border border-${color}-700/50`
        : `bg-${color}-100 text-${color}-800`
    }`}>
      {icon}<span className="ml-1">{text}</span>
    </span>
  );

  const getStatusBadge = (status) => {
    const statusLower = (status || 'pending').toLowerCase();
    switch (statusLower) {
      case 'read':
        return <Badge icon={<FaCheckCircle />} color="green" text="Read" />;
      case 'replied':
        return <Badge icon={<FaReply />} color="blue" text="Replied" />;
      default:
        return <Badge icon={<FaClock />} color="yellow" text="Pending" />;
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

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
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-cyan-900'
              }`}>
                Kelola Kontak
              </h1>
              <p className={`mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-cyan-700/80'
              }`}>
                Home / Dashboard / Kelola Kontak
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchContacts}
              disabled={loading}
              className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500'
                  : 'bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400'
              } text-white`}
            >
              <FaSyncAlt className={`${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
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

          {/* Contacts Table */}
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
              ) : contacts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 text-center"
                >
                  <div className={`mb-4 ${
                    isDarkMode ? 'text-cyan-400/50' : 'text-cyan-500/50'
                  }`}>
                    <FaEnvelope className="inline-block text-4xl" />
                  </div>
                  <h3 className={`text-lg font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                  }`}>
                    No contact messages found
                  </h3>
                  <p className={`mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                  }`}>
                    Contact messages will appear here
                  </p>
                </motion.div>
              ) : (
                <table className="min-w-full divide-y divide-opacity-50">
                  <thead className={isDarkMode ? 'bg-gray-700/80' : 'bg-cyan-50/80'}>
                    <tr>
                      <Th isDarkMode={isDarkMode}>Contact Info</Th>
                      <Th isDarkMode={isDarkMode}>Message</Th>
                      <Th isDarkMode={isDarkMode}>Status</Th>
                      <Th isDarkMode={isDarkMode}>Date</Th>
                      <Th isDarkMode={isDarkMode}>Actions</Th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-opacity-30 ${
                    isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-cyan-100'
                  }`}>
                    <AnimatePresence>
                      {contacts.map(contact => (
                        <motion.tr
                          key={contact.id}
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
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                isDarkMode ? 'bg-cyan-800/50' : 'bg-cyan-100'
                              }`}>
                                <FaUser className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} />
                              </div>
                              <div className="ml-3">
                                <div className={`text-sm font-medium ${
                                  isDarkMode ? 'text-gray-100' : 'text-cyan-900'
                                }`}>
                                  {contact.name}
                                </div>
                                <div className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                                }`}>
                                  {contact.email}
                                </div>
                              </div>
                            </div>
                          </Td>
                          <Td isDarkMode={isDarkMode}>
                            <div className={`text-sm max-w-xs truncate ${
                              isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                            }`}>
                              {contact.message}
                            </div>
                          </Td>
                          <Td isDarkMode={isDarkMode}>{getStatusBadge(contact.status)}</Td>
                          <Td isDarkMode={isDarkMode}>
                            <div className={`text-sm ${
                              isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                            }`}>
                              {formatDate(contact.created_at)}
                            </div>
                          </Td>
                          <Td isDarkMode={isDarkMode}>
                            <div className="flex space-x-2">
                              <ActionBtn 
                                icon={<FaEye />} 
                                onClick={() => handleShowDetail(contact)} 
                                color="cyan" 
                                title="View Details"
                                isDarkMode={isDarkMode}
                              />
                                                            <ActionBtn 
                                icon={<FaCheckCircle />} 
                                onClick={() => handleUpdateStatus(contact.id, 'read')} 
                                color="green" 
                                title="Mark as Read"
                                isDarkMode={isDarkMode}
                              />
                              <ActionBtn 
                                icon={<FaReply />} 
                                onClick={() => handleUpdateStatus(contact.id, 'replied')} 
                                color="blue" 
                                title="Mark as Replied"
                                isDarkMode={isDarkMode}
                              />
                              <ActionBtn 
                                icon={<FaTrash />} 
                                onClick={() => setConfirmDelete({ show: true, id: contact.id })} 
                                color="rose" 
                                title="Delete"
                                isDarkMode={isDarkMode}
                              />
                            </div>
                          </Td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>

          {/* Detail Modal */}
          <AnimatePresence>
            {showDetailModal && selectedContact && (
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
                      Contact Message Details
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
                    <Info 
                      label="Name" 
                      value={selectedContact.name} 
                      icon={<FaUser />} 
                      isDarkMode={isDarkMode}
                    />
                    <Info 
                      label="Email" 
                      value={selectedContact.email} 
                      icon={<FaEnvelope />} 
                      isDarkMode={isDarkMode}
                    />
                    <Info 
                      label="Message" 
                      value={selectedContact.message} 
                      multiline 
                      isDarkMode={isDarkMode}
                    />
                    <div className="flex justify-between items-center">
                      <span>{getStatusBadge(selectedContact.status)}</span>
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                      }`}>
                        {formatDate(selectedContact.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { handleUpdateStatus(selectedContact.id, 'read'); setShowDetailModal(false); }}
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Mark as Read
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { handleUpdateStatus(selectedContact.id, 'replied'); setShowDetailModal(false); }}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Mark as Replied
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
            {confirmDelete.show && (
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
                    Hapus Pesan?
                  </h2>
                  <p className={`mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Apakah kamu yakin ingin menghapus pesan ini? Tindakan ini tidak bisa dibatalkan.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfirmDelete({ show: false, id: null })}
                      className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-gray-100'
                          : 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700'
                      }`}
                    >
                      Batal
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDelete}
                      className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Hapus
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
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

const ActionBtn = ({ icon, onClick, color, title, isDarkMode }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded-full transition-colors ${
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
