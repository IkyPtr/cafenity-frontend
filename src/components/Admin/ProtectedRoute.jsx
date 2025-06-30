import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    // Simpan halaman yang ingin diakses untuk redirect setelah login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
