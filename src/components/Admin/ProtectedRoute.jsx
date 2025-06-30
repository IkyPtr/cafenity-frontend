import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const loginTime = localStorage.getItem('loginTime');
  const isSessionValid = loginTime && (Date.now() - new Date(loginTime).getTime() < 3600000); // 1 jam

  if (!isLoggedIn || !isSessionValid) {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminData');
    localStorage.removeItem('loginTime');
    return <Navigate to="/login" replace />;
  }

  return children;
}