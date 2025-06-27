import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaTrash, FaEdit } from "react-icons/fa";
import HeaderAdmin from "../../components/Admin/HeaderAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { supabase } from "../../lib/supabase";

export default function ReservasiPesanan() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Fetch reservations from Supabase
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

  // Update reservation status
  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setReservations(prev => 
        prev.map(reservation => 
          reservation.id === id 
            ? { ...reservation, status: newStatus }
            : reservation
        )
      );
      
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Delete reservation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        const { error } = await supabase
          .from('reservations')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        // Remove from local state
        setReservations(prev => prev.filter(reservation => reservation.id !== id));
        alert('Reservation deleted successfully!');
      } catch (error) {
        console.error('Error deleting reservation:', error);
        alert('Error deleting reservation');
      }
    }
  };

  // Format date and time
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return timeString;
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'diterima':
        return 'bg-green-100 text-green-800';
      case 'dialihkan':
        return 'bg-blue-100 text-blue-800';
      case 'ditolak':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <div className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">

          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Reservasi & Pesanan</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Home/Dashboard / Reservasi & Pesanan</p>
          </div>

          Stats Grid
          <div id="dashboard-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 sm:space-x-4 bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="bg-green-500 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                <FaShoppingCart className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  {reservations.filter(r => r.status === 'pending').length}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 truncate">Pending</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4 bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="bg-blue-500 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                <FaTruck className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  {reservations.filter(r => r.status === 'diterima').length}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 truncate">Diterima</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4 bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="bg-purple-500 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                <FaEdit className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  {reservations.filter(r => r.status === 'dialihkan').length}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 truncate">Dialihkan</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4 bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="bg-orange-500 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                <FaDollarSign className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold text-gray-800">{reservations.length}</span>
                <span className="text-xs sm:text-sm text-gray-500 truncate">Total Reservasi</span>
              </div>
            </div>
          </div>

          {/* Reservations Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b bg-gray-50">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Daftar Reservasi</h2>
            </div>

            {/* Reservations Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center p-8 sm:p-12">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-500"></div>
                  <span className="ml-2 text-sm sm:text-base text-gray-600">Loading reservations...</span>
                </div>
              ) : (
                <div className="min-w-full">
                  {/* Mobile Card View */}
                  <div className="block lg:hidden">
                    {reservations.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <div className="text-4xl mb-2">📅</div>
                        <p>No reservations found</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {reservations.map((reservation) => (
                          <div key={reservation.id} className="p-4 hover:bg-gray-50">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">
                                    {reservation.name}
                                  </h3>
                                  <p className="text-xs text-gray-500">{reservation.email}</p>
                                </div>
                                <div className="flex space-x-1 flex-shrink-0">
                                  <button
                                    onClick={() => handleDelete(reservation.id)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                    title="Delete"
                                  >
                                    <FaTrash className="text-sm" />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                <div>
                                  <span className="font-medium">Date:</span> {formatDate(reservation.reservation_date)}
                                </div>
                                <div>
                                  <span className="font-medium">Time:</span> {formatTime(reservation.reservation_time)}
                                </div>
                                <div>
                                  <span className="font-medium">Guests:</span> {reservation.guest_count}
                                </div>
                                <div>
                                  <span className="font-medium">Phone:</span> {reservation.phone}
                                </div>
                              </div>

                              {reservation.special_request && (
                                <div className="text-xs text-gray-600">
                                  <span className="font-medium">Special Request:</span> {reservation.special_request}
                                </div>
                              )}

                              <div className="flex justify-between items-center">
                                <select
                                  value={reservation.status || 'pending'}
                                  onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                                  disabled={updatingStatus === reservation.id}
                                  className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="diterima">Diterima</option>
                                  <option value="dialihkan">Dialihkan</option>
                                  <option value="ditolak">Ditolak</option>
                                </select>
                                
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status || 'pending')}`}>
                                  {reservation.status || 'pending'}
                                </span>
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
                          Customer
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Guests
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Special Request
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reservations.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                            <div className="text-4xl mb-2">📅</div>
                            <p>No reservations found</p>
                          </td>
                        </tr>
                      ) : (
                        reservations.map((reservation) => (
                          <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 lg:px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {reservation.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {reservation.email}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{reservation.phone}</div>
                            </td>
                                                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                <div>{formatDate(reservation.reservation_date)}</div>
                                <div className="text-gray-500">{formatTime(reservation.reservation_time)}</div>
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{reservation.guests || reservation.guest_count}</div>
                            </td>
                            <td className="px-4 lg:px-6 py-4">
                              <div className="text-sm text-gray-900 max-w-xs truncate">
                                {reservation.special_requests || reservation.special_request || '-'}
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="mt-1">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status )}`}>
                                  {reservation.status }
                                </span>
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleDelete(reservation.id)}
                                className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                                title="Delete Reservation"
                              >
                                <FaTrash className="text-sm" />
                              </button>
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
    </div>
  );
}
