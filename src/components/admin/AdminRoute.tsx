import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import AppLogoSpinner from '../common/AppLogoSpinner';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { profile, loading } = useAuth();

  if (loading) {
    return <AppLogoSpinner />;
  }

  const isAuthorized = profile?.role === 'owner' || profile?.role === 'editor';

  if (!isAuthorized) {
    toast.error("Accès non autorisé. Vous devez être administrateur.", {
      id: 'unauthorized-access',
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
