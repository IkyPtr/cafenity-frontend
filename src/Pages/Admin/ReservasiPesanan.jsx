import React, { useState, useEffect } from "react";
import {
  FiTrash2,
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiMail,
  FiEye,
  FiCheckCircle,
  FiSend,
  FiRefreshCcw,
  FiUsers,
  FiX
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import HeaderAdmin from "../../components/Admin/HeaderAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { supabase } from "../../lib/supabase";

export default function ReservasiPesanan() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "created_at", direction: "desc" });
  const [expandedRow, setExpandedRow] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    reservation: null,
    newStatus: null,
  });

  // Status mapping untuk memastikan nilai yang benar dikirim ke database
  const STATUS_MAPPING = {
    'pending': 'pending',
    'confirmed': 'confirmed', // atau 'diterima' tergantung database
    'cancelled': 'cancelled', // atau 'ditolak' tergantung database
    'completed': 'completed', // atau 'dialihkan' tergantung database
    'diterima': 'confirmed', // mapping ke nilai database yang benar
    'ditolak': 'cancelled',
    'dialihkan': 'completed'
  };

  // Status display mapping untuk UI
  const STATUS_DISPLAY = {
    'pending': 'Pending',
    'confirmed': 'Diterima',
    'cancelled': 'Ditolak',
    'completed': 'Dialihkan'
  };

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setError(`Error fetching reservations: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const confirmStatusChange = (reservation, newStatus) => {
    setConfirmModal({ open: true, reservation, newStatus });
  };

  const handleStatusChange = async () => {
    const { reservation, newStatus } = confirmModal;
    if (!reservation || !newStatus) return;

    try {
      setUpdatingStatus(reservation.id);
      
      // Map status ke nilai yang benar untuk database
      const dbStatus = STATUS_MAPPING[newStatus] || newStatus;
      
      const { error } = await supabase
        .from("reservations")
        .update({ status: dbStatus })
        .eq("id", reservation.id);

      if (error) throw error;

      setReservations(prev =>
        prev.map(r =>
          r.id === reservation.id ? { ...r, status: dbStatus } : r
        )
      );
      
      const displayStatus = STATUS_DISPLAY[dbStatus] || newStatus;
      setSuccessMessage(`Status reservasi berhasil diubah menjadi ${displayStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      setError('Error updating status: ' + error.message);
    } finally {
      setUpdatingStatus(null);
      setConfirmModal({ open: false, reservation: null, newStatus: null });
    }
  };

  const handleDelete = async id => {
    if (window.confirm("Yakin ingin menghapus reservasi ini?")) {
      try {
        const { error } = await supabase
          .from("reservations")
          .delete()
          .eq("id", id);
        if (error) throw error;
        setReservations(prev => prev.filter(r => r.id !== id));
        setSuccessMessage('Reservasi berhasil dihapus.');
      } catch (error) {
        console.error("Error deleting reservation:", error);
        setError('Error deleting reservation: ' + error.message);
      }
    }
  };

  const handleShowDetail = reservation => {
    setSelectedReservation(reservation);
    setShowDetailModal(true);
  };

  const formatDate = date =>
    new Date(date).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getStatusColor = status => {
    const normalizedStatus = (status || 'pending').toLowerCase();
    switch (normalizedStatus) {
      case "pending":
        return { bg: "bg-amber-100", text: "text-amber-800" };
      case "confirmed":
      case "diterima":
        return { bg: "bg-teal-100", text: "text-teal-800" };
      case "completed":
      case "dialihkan":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "cancelled":
      case "ditolak":
        return { bg: "bg-rose-100", text: "text-rose-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = (status || 'pending').toLowerCase();
    const statusColor = getStatusColor(statusLower);
    const displayText = STATUS_DISPLAY[statusLower] || status || "Pending";
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}>
        {displayText}
      </span>
    );
  };

  const getReservationStats = () => {
    const total = reservations.length;
    const pending = reservations.filter(r => (r.status || 'pending').toLowerCase() === 'pending').length;
    const confirmed = reservations.filter(r => (r.status || '').toLowerCase() === 'confirmed').length;
    const completed = reservations.filter(r => (r.status || '').toLowerCase() === 'completed').length;
    const cancelled = reservations.filter(r => (r.status || '').toLowerCase() === 'cancelled').length;
    return { total, pending, confirmed, completed, cancelled };
  };

  const filteredReservations = reservations
    .filter(reservation => 
      reservation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(reservation => 
      statusFilter === "all" || reservation.status === statusFilter
    );

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const stats = getReservationStats();

  useEffect(() => {
    fetchReservations();
  }, [sortConfig]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

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
              <h1 className="text-2xl sm:text-3xl font-bold text-cyan-900">Kelola Reservasi</h1>
              <p className="text-cyan-700/80 mt-1">Home / Dashboard / Kelola Reservasi</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchReservations}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              <FiRefreshCcw className={loading ? "animate-spin" : ""} />
              <span>{loading ? "Muat ulang..." : "Refresh"}</span>
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

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-cyan-200/40 p-4 mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, email, atau telepon..."
                  className="w-full px-4 py-2 rounded-lg border border-cyan-300/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 bg-white/80 backdrop-blur-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:w-48">
                <select
                  className="w-full px-4 py-2 rounded-lg border border-cyan-300/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 bg-white/80 backdrop-blur-sm transition-all"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Diterima</option>
                  <option value="completed">Dialihkan</option>
                  <option value="cancelled">Ditolak</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Reservations Table */}
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
              ) : filteredReservations.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 text-center"
                >
                                   <div className="text-cyan-500/50 mb-4">
                    <FiCalendar className="inline-block text-4xl" />
                  </div>
                  <h3 className="text-lg font-medium text-cyan-800">
                    Tidak ada reservasi ditemukan
                  </h3>
                  <p className="text-cyan-600/80 mt-1">
                    Reservasi akan muncul di sini
                  </p>
                </motion.div>
              ) : (
                <table className="min-w-full divide-y divide-cyan-100/50">
                  <thead className="bg-cyan-50/80">
                    <tr>
                      <Th>Customer</Th>
                      <Th>Kontak</Th>
                      <Th>Tanggal</Th>
                      <Th>Waktu</Th>
                      <Th>Tamu</Th>
                      <Th>Status</Th>
                      <Th>Aksi</Th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-cyan-100/30">
                    <AnimatePresence>
                      {filteredReservations.map(r => (
                        <motion.tr
                          key={r.id}
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
                                <FiUser className="text-cyan-600" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-cyan-900">{r.name}</div>
                                <div className="text-sm text-cyan-600/80 md:hidden">{r.phone}</div>
                              </div>
                            </div>
                          </Td>
                          <Td>
                            <div className="text-sm text-cyan-800">
                              <div className="flex items-center mb-1">
                                <FiPhone className="mr-1" />
                                {r.phone}
                              </div>
                              {r.email && (
                                <div className="flex items-center text-cyan-600/80">
                                  <FiMail className="mr-1" />
                                  {r.email}
                                </div>
                              )}
                            </div>
                          </Td>
                          <Td>
                            <div className="text-sm text-cyan-800">
                              {formatDate(r.reservation_date)}
                            </div>
                          </Td>
                          <Td>
                            <div className="text-sm text-cyan-800">
                              {r.reservation_time}
                            </div>
                          </Td>
                          <Td>
                            <div className="flex items-center text-sm text-cyan-800">
                              <FiUsers className="mr-1" />
                              {r.guest_count}
                            </div>
                          </Td>
                          <Td>{getStatusBadge(r.status)}</Td>
                          <Td>
                            <div className="flex space-x-2">
                              <ActionBtn 
                                icon={<FiEye />} 
                                onClick={() => handleShowDetail(r)} 
                                color="cyan" 
                                title="Lihat Detail"
                              />
                              <ActionBtn 
                                icon={<FiCheckCircle />} 
                                onClick={() => confirmStatusChange(r, "confirmed")} 
                                color="green" 
                                title="Terima"
                                disabled={updatingStatus === r.id}
                              />
                              <ActionBtn 
                                icon={<FiSend />} 
                                onClick={() => confirmStatusChange(r, "completed")} 
                                color="blue" 
                                title="Selesai"
                                disabled={updatingStatus === r.id}
                              />
                              <ActionBtn 
                                icon={<FiX />} 
                                onClick={() => confirmStatusChange(r, "cancelled")} 
                                color="rose" 
                                title="Tolak"
                                disabled={updatingStatus === r.id}
                              />
                              <ActionBtn 
                                icon={<FiTrash2 />} 
                                onClick={() => handleDelete(r.id)} 
                                color="red" 
                                title="Hapus"
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
            {showDetailModal && selectedReservation && (
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
                    <h2 className="text-lg font-semibold text-cyan-900">Detail Reservasi</h2>
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
                    <Info label="Nama" value={selectedReservation.name} icon={<FiUser />} />
                    <Info label="Telepon" value={selectedReservation.phone} icon={<FiPhone />} />
                    <Info label="Email" value={selectedReservation.email} icon={<FiMail />} />
                    <Info label="Tanggal" value={formatDate(selectedReservation.reservation_date)} icon={<FiCalendar />} />
                    <Info label="Jam" value={selectedReservation.reservation_time} icon={<FiClock />} />
                    <Info label="Jumlah Tamu" value={`${selectedReservation.guest_count} orang`} icon={<FiUsers />} />
                    <div className="flex justify-between items-center">
                      <span>{getStatusBadge(selectedReservation.status)}</span>
                      <span className="text-sm text-cyan-600/80">{formatDate(selectedReservation.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { confirmStatusChange(selectedReservation, 'confirmed'); setShowDetailModal(false); }}
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Terima
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { confirmStatusChange(selectedReservation, 'completed'); setShowDetailModal(false); }}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Selesai
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { confirmStatusChange(selectedReservation, 'cancelled'); setShowDetailModal(false); }}
                      className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Tolak
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDetailModal(false)}
                      className="bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Tutup
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confirm Status Change Modal */}
          <AnimatePresence>
            {confirmModal.open && (
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
                  <h2 className="text-lg font-semibold mb-3 text-gray-800">Konfirmasi Perubahan Status</h2>
                  <p className="text-gray-600 mb-6">
                    Apakah Anda yakin ingin mengubah status reservasi menjadi <strong>{STATUS_DISPLAY[confirmModal.newStatus] || confirmModal.newStatus}</strong>?
                  </p>
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfirmModal({ open: false, reservation: null, newStatus: null })}
                      className="bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Batal
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStatusChange}
                      disabled={updatingStatus}
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {updatingStatus ? 'Mengubah...' : 'Ya, Ubah'}
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
