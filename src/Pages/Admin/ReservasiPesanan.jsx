// File: ReservasiPesanan.jsx
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
  FiRefreshCcw
} from "react-icons/fi";
import HeaderAdmin from "../../components/Admin/HeaderAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { supabase } from "../../lib/supabase";

export default function ReservasiPesanan() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    reservation: null,
    newStatus: null,
  });

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
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
      const { error } = await supabase
        .from("reservations")
        .update({ status: newStatus })
        .eq("id", reservation.id);

      if (error) throw error;

      setReservations(prev =>
        prev.map(r =>
          r.id === reservation.id ? { ...r, status: newStatus } : r
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
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
      } catch (error) {
        console.error("Error deleting reservation:", error);
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
    switch (status) {
      case "pending":
        return { bg: "bg-amber-100", text: "text-amber-800" };
      case "diterima":
        return { bg: "bg-teal-100", text: "text-teal-800" };
      case "dialihkan":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "ditolak":
        return { bg: "bg-rose-100", text: "text-rose-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <div className="flex-1">
        <HeaderAdmin />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Kelola Reservasi</h1>
            <button
              onClick={fetchReservations}
              disabled={loading}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-4 py-2 rounded shadow"
            >
              <FiRefreshCcw className={loading ? "animate-spin" : ""} />
              {loading ? "Muat ulang..." : "Refresh"}
            </button>
          </div>

          <div className="bg-white shadow rounded overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : reservations.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Tidak ada reservasi.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
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
                <tbody className="divide-y divide-gray-200">
                  {reservations.map(r => (
                    <tr key={r.id}>
                      <Td>{r.name}</Td>
                      <Td>{r.phone}</Td>
                      <Td>{formatDate(r.reservation_date)}</Td>
                      <Td>{r.reservation_time}</Td>
                      <Td>{r.guest_count}</Td>
                      <Td>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(r.status).bg} ${getStatusColor(r.status).text}`}>
                          {r.status || "Pending"}
                        </span>
                      </Td>
                      <Td>
                        <div className="flex space-x-2">
                          <ActionBtn icon={<FiEye />} onClick={() => handleShowDetail(r)} color="blue" />
                          <ActionBtn icon={<FiCheckCircle />} onClick={() => confirmStatusChange(r, "diterima")} color="green" />
                          <ActionBtn icon={<FiSend />} onClick={() => confirmStatusChange(r, "dialihkan")} color="blue" />
                          <ActionBtn icon={<FiTrash2 />} onClick={() => handleDelete(r.id)} color="red" />
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Modal Detail */}
          {showDetailModal && selectedReservation && (
            <Modal onClose={() => setShowDetailModal(false)} title="Detail Reservasi">
              <Info label="Nama" value={selectedReservation.name} icon={<FiUser />} />
              <Info label="Telepon" value={selectedReservation.phone} icon={<FiPhone />} />
              <Info label="Email" value={selectedReservation.email} icon={<FiMail />} />
              <Info label="Tanggal" value={formatDate(selectedReservation.reservation_date)} icon={<FiCalendar />} />
              <Info label="Jam" value={selectedReservation.reservation_time} icon={<FiClock />} />
              <Info label="Jumlah Tamu" value={`${selectedReservation.guest_count} orang`} icon={<FiUser />} />
              <div className="mt-6 text-right">
                <button onClick={() => setShowDetailModal(false)} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded">Kembali</button>
              </div>
            </Modal>
          )}

          {/* Modal Konfirmasi */}
          {confirmModal.open && (
            <Modal onClose={() => setConfirmModal({ open: false, reservation: null, newStatus: null })} title="Konfirmasi">
              <p className="text-gray-700 mb-4">
                Apakah Anda yakin ingin mengubah status menjadi <strong>{confirmModal.newStatus}</strong>?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setConfirmModal({ open: false, reservation: null, newStatus: null })}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Batal
                </button>
                <button
                  onClick={handleStatusChange}
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
                >
                  Ya, Ubah
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

// Komponen Reusable
const Th = ({ children }) => (
  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>
);

const Td = ({ children }) => (
  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{children}</td>
);

const ActionBtn = ({ icon, onClick, color }) => (
  <button onClick={onClick} className={`text-${color}-600 hover:text-${color}-800`}>
    {icon}
  </button>
);

const Info = ({ label, value, icon }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    <div className="p-2 bg-gray-100 rounded text-gray-800 mt-1">{value}</div>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black text-lg">×</button>
      </div>
      {children}
    </div>
  </div>
);
