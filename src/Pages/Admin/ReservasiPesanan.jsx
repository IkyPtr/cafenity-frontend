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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    reservation: null,
    newStatus: null,
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

  // Status mapping untuk memastikan nilai yang benar dikirim ke database
  const STATUS_MAPPING = {
    'pending': 'pending',
    'confirmed': 'confirmed',
    'cancelled': 'cancelled',
    'completed': 'completed',
    'diterima': 'confirmed',
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
        return { 
          bg: isDarkMode ? "bg-amber-900/50 border-amber-700/50" : "bg-amber-100", 
          text: isDarkMode ? "text-amber-300" : "text-amber-800" 
        };
      case "confirmed":
      case "diterima":
        return { 
          bg: isDarkMode ? "bg-teal-900/50 border-teal-700/50" : "bg-teal-100", 
          text: isDarkMode ? "text-teal-300" : "text-teal-800" 
        };
      case "completed":
      case "dialihkan":
        return { 
          bg: isDarkMode ? "bg-blue-900/50 border-blue-700/50" : "bg-blue-100", 
          text: isDarkMode ? "text-blue-300" : "text-blue-800" 
        };
      case "cancelled":
      case "ditolak":
        return { 
          bg: isDarkMode ? "bg-rose-900/50 border-rose-700/50" : "bg-rose-100", 
          text: isDarkMode ? "text-rose-300" : "text-rose-800" 
        };
      default:
        return { 
          bg: isDarkMode ? "bg-gray-800/50 border-gray-600/50" : "bg-gray-100", 
          text: isDarkMode ? "text-gray-300" : "text-gray-800" 
        };
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = (status || 'pending').toLowerCase();
    const statusColor = getStatusColor(statusLower);
    const displayText = STATUS_DISPLAY[statusLower] || status || "Pending";
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text} ${
        isDarkMode ? 'border' : ''
      }`}>
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
                Kelola Reservasi
              </h1>
              <p className={`mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-cyan-700/80'
              }`}>
                Home / Dashboard / Kelola Reservasi
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchReservations}
              disabled={loading}
              className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500'
                  : 'bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400'
              } text-white`}
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

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={`rounded-xl shadow-sm border p-4 mb-6 ${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700/40'
                : 'bg-white/80 border-cyan-200/40'
            } backdrop-blur-sm`}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, email, atau telepon..."
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-1 transition-all ${
                    isDarkMode
                      ? 'border-gray-600/50 focus:border-cyan-400 focus:ring-cyan-400/30 bg-gray-700/80 text-gray-100 placeholder-gray-400'
                      : 'border-cyan-300/50 focus:border-cyan-500 focus:ring-cyan-500/30 bg-white/80 text-gray-900 placeholder-gray-500'
                  } backdrop-blur-sm`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:w-48">
                                <select
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-1 transition-all ${
                    isDarkMode
                      ? 'border-gray-600/50 focus:border-cyan-400 focus:ring-cyan-400/30 bg-gray-700/80 text-gray-100'
                      : 'border-cyan-300/50 focus:border-cyan-500 focus:ring-cyan-500/30 bg-white/80 text-gray-900'
                  } backdrop-blur-sm`}
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
              ) : filteredReservations.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 text-center"
                >
                  <div className={`mb-4 ${
                    isDarkMode ? 'text-cyan-400/50' : 'text-cyan-500/50'
                  }`}>
                    <FiCalendar className="inline-block text-4xl" />
                  </div>
                  <h3 className={`text-lg font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                  }`}>
                    Tidak ada reservasi ditemukan
                  </h3>
                  <p className={`mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                  }`}>
                    Reservasi akan muncul di sini
                  </p>
                </motion.div>
              ) : (
                <table className="min-w-full divide-y divide-opacity-50">
                  <thead className={isDarkMode ? 'bg-gray-700/80' : 'bg-cyan-50/80'}>
                    <tr>
                      <Th isDarkMode={isDarkMode}>Customer</Th>
                      <Th isDarkMode={isDarkMode}>Kontak</Th>
                      <Th isDarkMode={isDarkMode}>Tanggal</Th>
                      <Th isDarkMode={isDarkMode}>Waktu</Th>
                      <Th isDarkMode={isDarkMode}>Tamu</Th>
                      <Th isDarkMode={isDarkMode}>Status</Th>
                      <Th isDarkMode={isDarkMode}>Aksi</Th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-opacity-30 ${
                    isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-cyan-100'
                  }`}>
                    <AnimatePresence>
                      {filteredReservations.map(r => (
                        <motion.tr
                          key={r.id}
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
                                <FiUser className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} />
                              </div>
                              <div className="ml-3">
                                <div className={`text-sm font-medium ${
                                  isDarkMode ? 'text-gray-100' : 'text-cyan-900'
                                }`}>
                                  {r.name}
                                </div>
                                <div className={`text-sm md:hidden ${
                                  isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                                }`}>
                                  {r.phone}
                                </div>
                              </div>
                            </div>
                          </Td>
                          <Td isDarkMode={isDarkMode}>
                            <div className={`text-sm ${
                              isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                            }`}>
                              <div className="flex items-center mb-1">
                                <FiPhone className="mr-1" />
                                {r.phone}
                              </div>
                              {r.email && (
                                <div className={`flex items-center ${
                                  isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                                }`}>
                                  <FiMail className="mr-1" />
                                  {r.email}
                                </div>
                              )}
                            </div>
                          </Td>
                          <Td isDarkMode={isDarkMode}>
                            <div className={`text-sm ${
                              isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                            }`}>
                              {formatDate(r.reservation_date)}
                            </div>
                          </Td>
                          <Td isDarkMode={isDarkMode}>
                            <div className={`text-sm ${
                              isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                            }`}>
                              {r.reservation_time}
                            </div>
                          </Td>
                          <Td isDarkMode={isDarkMode}>
                            <div className={`flex items-center text-sm ${
                              isDarkMode ? 'text-gray-200' : 'text-cyan-800'
                            }`}>
                              <FiUsers className="mr-1" />
                              {r.guest_count}
                            </div>
                          </Td>
                          <Td isDarkMode={isDarkMode}>{getStatusBadge(r.status)}</Td>
                          <Td isDarkMode={isDarkMode}>
                            <div className="flex space-x-2">
                              <ActionBtn 
                                icon={<FiEye />} 
                                onClick={() => handleShowDetail(r)} 
                                color="cyan" 
                                title="Lihat Detail"
                                disabled={updatingStatus === r.id}
                                isDarkMode={isDarkMode}
                              />
                              <ActionBtn 
                                icon={<FiCheckCircle />} 
                                onClick={() => confirmStatusChange(r, "confirmed")} 
                                color="green" 
                                title="Terima"
                                disabled={updatingStatus === r.id}
                                isDarkMode={isDarkMode}
                              />
                              <ActionBtn 
                                icon={<FiSend />} 
                                onClick={() => confirmStatusChange(r, "completed")} 
                                color="blue" 
                                title="Selesai"
                                disabled={updatingStatus === r.id}
                                isDarkMode={isDarkMode}
                              />
                              <ActionBtn 
                                icon={<FiX />} 
                                onClick={() => confirmStatusChange(r, "cancelled")} 
                                color="rose" 
                                title="Tolak"
                                disabled={updatingStatus === r.id}
                                isDarkMode={isDarkMode}
                              />
                              <ActionBtn 
                                icon={<FiTrash2 />} 
                                onClick={() => handleDelete(r.id)} 
                                color="red" 
                                title="Hapus"
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
                      Detail Reservasi
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
                      label="Nama" 
                      value={selectedReservation.name} 
                      icon={<FiUser />} 
                      isDarkMode={isDarkMode}
                    />
                    <Info 
                      label="Telepon" 
                      value={selectedReservation.phone} 
                      icon={<FiPhone />} 
                      isDarkMode={isDarkMode}
                    />
                    <Info 
                      label="Email" 
                      value={selectedReservation.email} 
                      icon={<FiMail />} 
                      isDarkMode={isDarkMode}
                    />
                    <Info 
                      label="Tanggal" 
                      value={formatDate(selectedReservation.reservation_date)} 
                      icon={<FiCalendar />} 
                      isDarkMode={isDarkMode}
                    />
                    <Info 
                      label="Jam" 
                      value={selectedReservation.reservation_time} 
                      icon={<FiClock />} 
                      isDarkMode={isDarkMode}
                    />
                    <Info 
                      label="Jumlah Tamu" 
                      value={`${selectedReservation.guest_count} orang`} 
                      icon={<FiUsers />} 
                      isDarkMode={isDarkMode}
                    />
                    <div className="flex justify-between items-center">
                      <span>{getStatusBadge(selectedReservation.status)}</span>
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-cyan-600/80'
                      }`}>
                        {formatDate(selectedReservation.created_at)}
                      </span>
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
                      className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-gray-100'
                          : 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700'
                      }`}
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
                  className={`p-6 rounded-xl shadow-xl w-96 ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700/50' 
                      : 'bg-white'
                  }`}
                >
                  <h2 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>
                    Konfirmasi Perubahan Status
                  </h2>
                  <p className={`mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Apakah Anda yakin ingin mengubah status reservasi menjadi <strong>{STATUS_DISPLAY[confirmModal.newStatus] || confirmModal.newStatus}</strong>?
                  </p>
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfirmModal({ open: false, reservation: null, newStatus: null })}
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
