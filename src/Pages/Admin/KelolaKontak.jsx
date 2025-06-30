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

  const getContactStats = () => {
    const total = contacts.length;
    const pending = contacts.filter(c => (c.status || 'pending').toLowerCase() === 'pending').length;
    const read = contacts.filter(c => (c.status || '').toLowerCase() === 'read').length;
    const replied = contacts.filter(c => (c.status || '').toLowerCase() === 'replied').length;
    return { total, pending, read, replied };
  };

  const stats = getContactStats();

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
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <div className="flex-1 overflow-auto p-4">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Kelola Kontak</h1>
              <p className="text-sm text-gray-500">Home / Dashboard / Kelola Kontak</p>
            </div>
            <button
              onClick={fetchContacts}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              <FaSyncAlt className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {successMessage && (
            <div className="bg-green-100 p-3 text-green-700 rounded mb-4">{successMessage}</div>
          )}
          {error && (
            <div className="bg-red-100 p-3 text-red-700 rounded mb-4">{error}</div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard icon={<FaEnvelope />} color="blue" value={stats.total} label="Total" />
            <StatCard icon={<FaClock />} color="yellow" value={stats.pending} label="Pending" />
            <StatCard icon={<FaCheckCircle />} color="green" value={stats.read} label="Read" />
            <StatCard icon={<FaReply />} color="blue" value={stats.replied} label="Replied" />
          </div>

          <div className="bg-white shadow rounded overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-gray-600">Loading messages...</div>
            ) : contacts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No contact messages found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <Th>Contact Info</Th>
                      <Th>Message</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map(contact => (
                      <tr key={contact.id}>
                        <Td>
                          <div className="flex items-center">
                            <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center">
                              <FaUser className="text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                              <div className="text-sm text-gray-500">{contact.email}</div>
                            </div>
                          </div>
                        </Td>
                        <Td>{contact.message}</Td>
                        <Td>{getStatusBadge(contact.status)}</Td>
                        <Td>{formatDate(contact.created_at)}</Td>
                        <Td>
                          <div className="flex space-x-2">
                            <ActionBtn icon={<FaEye />} onClick={() => handleShowDetail(contact)} color="blue" />
                            <ActionBtn icon={<FaCheckCircle />} onClick={() => handleUpdateStatus(contact.id, 'read')} color="green" />
                            <ActionBtn icon={<FaReply />} onClick={() => handleUpdateStatus(contact.id, 'replied')} color="blue" />
                            <ActionBtn icon={<FaTrash />} onClick={() => setConfirmDelete({ show: true, id: contact.id })} color="red" />
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detail Modal */}
          {showDetailModal && selectedContact && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Contact Message Details</h2>
                  <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700">X</button>
                </div>
                <div className="space-y-3">
                  <Info label="Name" value={selectedContact.name} icon={<FaUser />} />
                  <Info label="Email" value={selectedContact.email} icon={<FaEnvelope />} />
                  <Info label="Message" value={selectedContact.message} multiline />
                  <div className="flex justify-between items-center">
                    <span>{getStatusBadge(selectedContact.status)}</span>
                    <span className="text-sm text-gray-500">{formatDate(selectedContact.created_at)}</span>
                  </div>
                </div>
                <div className="flex justify-end mt-6 space-x-3">
                  <button onClick={() => { handleUpdateStatus(selectedContact.id, 'read'); setShowDetailModal(false); }} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Mark as Read</button>
                  <button onClick={() => { handleUpdateStatus(selectedContact.id, 'replied'); setShowDetailModal(false); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Mark as Replied</button>
                  <button onClick={() => setShowDetailModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Close</button>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Delete Modal */}
          {confirmDelete.show && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Hapus Pesan?</h2>
                <p className="text-gray-600 mb-6">Apakah kamu yakin ingin menghapus pesan ini? Tindakan ini tidak bisa dibatalkan.</p>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => setConfirmDelete({ show: false, id: null })} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
                  <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Hapus</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const Th = ({ children }) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{children}</th>;
const Td = ({ children }) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{children}</td>;
const StatCard = ({ icon, color, value, label }) => (
  <div className="flex items-center p-4 bg-white rounded shadow space-x-3">
    <div className={`p-3 bg-${color}-500 text-white rounded-full`}>{icon}</div>
    <div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </div>
);
const ActionBtn = ({ icon, onClick, color }) => (
  <button onClick={onClick} className={`text-${color}-600 hover:text-${color}-800`}>
    {icon}
  </button>
);
const Info = ({ label, value, icon, multiline }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className={`flex items-start p-3 bg-gray-100 rounded ${multiline ? 'flex-col' : 'flex-row'}`}>
      {icon && <div className="mr-2">{icon}</div>}
      <div className="text-gray-800">{value || '-'}</div>
    </div>
  </div>
);
