import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiTruck, FiEdit, FiDollarSign, FiTrash2, FiCalendar, FiClock, FiUser, FiPhone, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import HeaderAdmin from "../../components/Admin/HeaderAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { supabase } from "../../lib/supabase";

export default function ReservasiPesanan() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

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
        return { bg: 'bg-amber-100', text: 'text-amber-800', icon: '⏳' };
      case 'diterima':
        return { bg: 'bg-teal-100', text: 'text-teal-800', icon: '✓' };
      case 'dialihkan':
        return { bg: 'bg-blue-100', text: 'text-blue-800', icon: '↗️' };
      case 'ditolak':
        return { bg: 'bg-rose-100', text: 'text-rose-800', icon: '✗' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: '?' };
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

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
            className="mb-6"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-cyan-900">Reservasi & Pesanan</h1>
            <p className="text-cyan-700/80 mt-1">Cafenity Admin Dashboard</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { 
                icon: <FiShoppingCart className="text-xl" />, 
                count: reservations.filter(r => r.status === 'pending').length,
                label: 'Pending',
                color: 'bg-amber-500'
              },
              { 
                icon: <FiTruck className="text-xl" />, 
                count: reservations.filter(r => r.status === 'diterima').length,
                label: 'Diterima',
                color: 'bg-teal-500'
              },
              { 
                icon: <FiEdit className="text-xl" />, 
                count: reservations.filter(r => r.status === 'dialihkan').length,
                label: 'Dialihkan',
                color: 'bg-blue-500'
              },
              { 
                icon: <FiDollarSign className="text-xl" />, 
                count: reservations.length,
                label: 'Total Reservasi',
                color: 'bg-cyan-500'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-cyan-200/40 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-cyan-900">{stat.count}</p>
                    <p className="text-sm text-cyan-700/80">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reservations Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl shadow-sm border border-cyan-200/40 overflow-hidden"
          >
            <div className="p-6 border-b border-cyan-200/30">
              <h2 className="text-xl font-bold text-cyan-900">Daftar Reservasi</h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center p-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full"
                />
              </div>
            ) : reservations.length === 0 ? (
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Kontak
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                        Tanggal/Waktu
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
                    {reservations.map((reservation) => {
                      const status = getStatusColor(reservation.status || 'pending');
                      return (
                        <motion.tr
                          key={reservation.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-cyan-50/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-100/50 flex items-center justify-center text-cyan-600">
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
                              <FiPhone className="mr-1" /> {reservation.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-cyan-900">
                              <div className="flex items-center">
                                <FiCalendar className="mr-1" /> {formatDate(reservation.reservation_date)}
                              </div>
                              <div className="flex items-center text-sm text-cyan-600/80">
                                <FiClock className="mr-1" /> {reservation.reservation_time}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-cyan-900">
                              {reservation.guest_count} orang
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={reservation.status || 'pending'}
                              onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                              disabled={updatingStatus === reservation.id}
                              className={`text-xs px-3 py-1 rounded-full ${status.bg} ${status.text} border border-cyan-200/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30`}
                            >
                              <option value="pending">⏳ Pending</option>
                              <option value="diterima">✓ Diterima</option>
                              <option value="dialihkan">↗️ Dialihkan</option>
                              <option value="ditolak">✗ Ditolak</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(reservation.id)}
                              className="text-rose-500 hover:text-rose-700 p-2 rounded-full hover:bg-rose-100/50 transition-colors"
                              title="Hapus"
                            >
                              <FiTrash2 />
                            </motion.button>
                          </td>
                        </motion.tr>
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
