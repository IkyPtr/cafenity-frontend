import React, { useState, useEffect } from "react";
import { 
  FiShoppingCart, 
  FiTruck, 
  FiEdit, 
  FiDollarSign, 
  FiTrash2, 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiPhone, 
  FiMail,
  FiChevronDown,
  FiSearch,
  FiFilter,
  FiRefreshCw
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import HeaderAdmin from "../../components/Admin/HeaderAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { supabase } from "../../lib/supabase";

export default function ReservasiPesanan() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "created_at", direction: "desc" });
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order(sortConfig.key, { ascending: sortConfig.direction === "asc" });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setReservations(prev => 
        prev.map(reservation => 
          reservation.id === id 
            ? { ...reservation, status: newStatus }
            : reservation
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus reservasi ini?')) {
      try {
        const { error } = await supabase
          .from('reservations')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setReservations(prev => prev.filter(reservation => reservation.id !== id));
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return { 
          bg: 'bg-amber-100', 
          text: 'text-amber-800', 
          border: 'border-amber-200',
          icon: '⏳' 
        };
      case 'diterima':
        return { 
          bg: 'bg-teal-100', 
          text: 'text-teal-800', 
          border: 'border-teal-200',
          icon: '✓' 
        };
      case 'dialihkan':
        return { 
          bg: 'bg-blue-100', 
          text: 'text-blue-800', 
          border: 'border-blue-200',
          icon: '↗️' 
        };
      case 'ditolak':
        return { 
          bg: 'bg-rose-100', 
          text: 'text-rose-800', 
          border: 'border-rose-200',
          icon: '✗' 
        };
      default:
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-800', 
          border: 'border-gray-200',
          icon: '?' 
        };
    }
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

  useEffect(() => {
    fetchReservations();
  }, [sortConfig]);

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f0f8ff] to-[#e0f7fa]">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-cyan-900">Reservasi & Pesanan</h1>
                <p className="text-cyan-700/80 mt-1">Cafenity Admin Dashboard</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchReservations}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-cyan-200 rounded-lg shadow-xs hover:bg-cyan-50 transition-colors text-cyan-800"
              >
                <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { 
                icon: <FiShoppingCart className="text-xl" />, 
                count: reservations.filter(r => r.status === 'pending').length,
                label: 'Pending',
                color: 'bg-amber-500',
                trend: 'up'
              },
              { 
                icon: <FiTruck className="text-xl" />, 
                count: reservations.filter(r => r.status === 'diterima').length,
                label: 'Diterima',
                color: 'bg-teal-500',
                trend: 'up'
              },
              { 
                icon: <FiEdit className="text-xl" />, 
                count: reservations.filter(r => r.status === 'dialihkan').length,
                label: 'Dialihkan',
                color: 'bg-blue-500',
                trend: 'neutral'
              },
              { 
                icon: <FiDollarSign className="text-xl" />, 
                count: reservations.length,
                label: 'Total Reservasi',
                color: 'bg-cyan-500',
                trend: 'up'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="bg-white/80 backdrop-blur-lg rounded-xl p-5 border border-cyan-200/40 shadow-xs hover:shadow-sm transition-all"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-cyan-900">{stat.count}</p>
                    <p className="text-sm text-cyan-700/80">{stat.label}</p>
                    <div className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-800' : 
                      stat.trend === 'down' ? 'bg-rose-100 text-rose-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {stat.trend === 'up' ? '+12%' : stat.trend === 'down' ? '-5%' : '0%'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xs border border-cyan-200/40 p-4 mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-cyan-600/70" />
                </div>
                <input
                  type="text"
                  placeholder="Cari nama, email, atau telepon..."
                  className="pl-10 pr-4 py-2 w-full border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-cyan-50 rounded-lg px-3 py-2 border border-cyan-200">
                  <FiFilter className="text-cyan-600/70" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm text-cyan-800"
                  >
                    <option value="all">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="diterima">Diterima</option>
                    <option value="dialihkan">Dialihkan</option>
                    <option value="ditolak">Ditolak</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reservations Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xs border border-cyan-200/40 overflow-hidden"
          >
            <div className="p-6 border-b border-cyan-200/30 flex justify-between items-center">
              <h2 className="text-xl font-bold text-cyan-900">Daftar Reservasi</h2>
              <div className="text-sm text-cyan-700/80">
                {filteredReservations.length} dari {reservations.length} reservasi
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center p-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full"
                />
              </div>
            ) : filteredReservations.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-cyan-500/50 mb-4">
                  <FiCalendar className="inline-block text-4xl" />
                </div>
                <h3 className="text-lg font-medium text-cyan-800">Belum ada reservasi</h3>
                <p className="text-cyan-600/80 mt-1">Tidak ada data reservasi yang ditemukan</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-cyan-100/50">
                  <thead className="bg-cyan-50/80">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('name')}
                      >
                        <div className="flex items-center">
                          Customer
                          <FiChevronDown className={`ml-1 transition-transform ${
                            sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'transform rotate-180' : ''
                          }`} />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Kontak
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('reservation_date')}
                      >
                        <div className="flex items-center">
                          Tanggal
                          <FiChevronDown className={`ml-1 transition-transform ${
                            sortConfig.key === 'reservation_date' && sortConfig.direction === 'asc' ? 'transform rotate-180' : ''
                          }`} />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Tamu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-cyan-100/30">
                    {filteredReservations.map((reservation) => {
                      const status = getStatusColor(reservation.status || 'pending');
                      return (
                        <React.Fragment key={reservation.id}>
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`hover:bg-cyan-50/30 transition-colors ${expandedRow === reservation.id ? 'bg-cyan-50/50' : ''}`}
                          >
                            <td 
                              className="px-6 py-4 cursor-pointer"
                              onClick={() => toggleRowExpand(reservation.id)}
                            >
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                                  <FiUser />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-cyan-900">{reservation.name}</div>
                                  <div className="text-sm text-cyan-600/80">{reservation.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-cyan-900 flex items-center">
                                <FiPhone className="mr-2 text-cyan-600/70" /> 
                                <span className="text-cyan-800">{reservation.phone}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-cyan-900">
                                <div className="flex items-center">
                                  <FiCalendar className="mr-2 text-cyan-600/70" /> 
                                  <span className="text-cyan-800">{formatDate(reservation.reservation_date)}</span>
                                </div>
                                <div className="flex items-center text-sm text-cyan-600/80 mt-1">
                                  <FiClock className="mr-2 text-cyan-600/70" /> 
                                  <span>{reservation.reservation_time}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-cyan-900">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                                  {reservation.guest_count} orang
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={reservation.status || 'pending'}
                                onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                                disabled={updatingStatus === reservation.id}
                                className={`text-xs px-3 py-1.5 rounded-lg ${status.bg} ${status.text} border ${status.border} focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all cursor-pointer`}
                              >
                                <option value="pending">⏳ Pending</option>
                                <option value="diterima">✓ Diterima</option>
                                <option value="dialihkan">↗️ Dialihkan</option>
                                <option value="ditolak">✗ Ditolak</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => toggleRowExpand(reservation.id)}
                                  className="text-cyan-600 hover:text-cyan-800 p-2 rounded-lg hover:bg-cyan-100/50 transition-colors"
                                  title="Detail"
                                >
                                  <FiChevronDown className={`transition-transform ${expandedRow === reservation.id ? 'transform rotate-180' : ''}`} />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(reservation.id)}
                                  className="text-rose-500 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-100/50 transition-colors"
                                  title="Hapus"
                                >
                                  <FiTrash2 />
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                          
                          <AnimatePresence>
                            {expandedRow === reservation.id && (
                              <motion.tr
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-cyan-50/30"
                              >
                                <td colSpan="6" className="px-6 py-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <h4 className="font-medium text-cyan-800 mb-2">Detail Tambahan</h4>
                                      <div className="space-y-2">
                                        <div className="flex">
                                          <span className="text-cyan-600/80 w-28">Catatan:</span>
                                          <span className="text-cyan-800">{reservation.special_requests || '-'}</span>
                                        </div>
                                        <div className="flex">
                                          <span className="text-cyan-600/80 w-28">Dibuat:</span>
                                          <span className="text-cyan-800">{new Date(reservation.created_at).toLocaleString('id-ID')}</span>
                                        </div>
                                      </div>
                                    </div>
                                   
                                  </div>
                                </td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}