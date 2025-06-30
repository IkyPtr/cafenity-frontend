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
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
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
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-cyan-900">Kelola Kontak</h1>
              <p className="text-cyan-700/80 mt-1">Home / Dashboard / Kelola Kontak</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchContacts}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
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

          {/* Contacts Table */}
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
              ) : contacts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 text-center"
                >
                  <div className="text-cyan-500/50 mb-4">
                    <FaEnvelope className="inline-block text-4xl" />
                  </div>
                  <h3 className="text-lg font-medium text-cyan-800">
                    No contact messages found
                  </h3>
                  <p className="text-cyan-600/80 mt-1">
                    Contact messages will appear here
                  </p>
                </motion.div>
              ) : (
                <table className="min-w-full divide-y divide-cyan-100/50">
                  <thead className="bg-cyan-50/80">
                    <tr>
                      <Th>Contact Info</Th>
                      <Th>Message</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-cyan-100/30">
                    <AnimatePresence>
                      {contacts.map(contact => (
                        <motion.tr
                          key={contact.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="hover:bg-cyan-50/30 transition-colors"
                        >
                          <Td>
                            <div className="flex items-center">
                              <div className="bg-cyan-100 h-10 w-10 rounded-full flex items-center justify-center">
                                <FaUser className="text-cyan-600" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-cyan-900">{contact.name}</div>
                                <div className="text-sm text-cyan-600/80">{contact.email}</div>
                              </div>
                            </div>
                          </Td>
                          <Td>
                            <div className="text-sm text-cyan-800 max-w-xs truncate">
                              {contact.message}
                            </div>
                          </Td>
                          <Td>{getStatusBadge(contact.status)}</Td>
                          <Td>
                            <div className="text-sm text-cyan-800">
                              {formatDate(contact.created_at)}
                            </div>
                          </Td>
                          <Td>
                            <div className="flex space-x-2">
                              <ActionBtn 
                                icon={<FaEye />} 
                                onClick={() => handleShowDetail(contact)} 
                                color="cyan" 
                                title="View Details"
                              />
                              <ActionBtn 
                                icon={<FaCheckCircle />} 
                                onClick={() => handleUpdateStatus(contact.id, 'read')} 
                                color="green" 
                                title="Mark as Read"
                              />
                              <ActionBtn 
                                icon={<FaReply />} 
                                onClick={() => handleUpdateStatus(contact.id, 'replied')} 
                                color="blue" 
                                title="Mark as Replied"
                              />
                              <ActionBtn 
                                icon={<FaTrash />} 
                                onClick={() => setConfirmDelete({ show: true, id: contact.id })} 
                                color="rose" 
                                title="Delete"
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
                  className="bg-white p-6 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-cyan-900">Contact Message Details</h2>
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
                    <Info label="Name" value={selectedContact.name} icon={<FaUser />} />
                    <Info label="Email" value={selectedContact.email} icon={<FaEnvelope />} />
                    <Info label="Message" value={selectedContact.message} multiline />
                    <div className="flex justify-between items-center">
                      <span>{getStatusBadge(selectedContact.status)}</span>
                      <span className="text-sm text-cyan-600/80">{formatDate(selectedContact.created_at)}</span>
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
                  className="bg-white p-6 rounded-xl shadow-xl w-96"
                >
                  <h2 className="text-lg font-semibold mb-3 text-gray-800">Hapus Pesan?</h2>
                  <p className="text-gray-600 mb-6">Apakah kamu yakin ingin menghapus pesan ini? Tindakan ini tidak bisa dibatalkan.</p>
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfirmDelete({ show: false, id: null })}
                      className="bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
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

const ActionBtn = ({ icon, onClick, color, title }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    title={title}
    className={`text-${color}-600 hover:text-${color}-800 p-1.5 rounded-full hover:bg-${color}-100/50 transition-colors`}
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
