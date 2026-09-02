import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function AdminRoute() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  // Stealth: If not authenticated or not admin, bounce straight to home
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
