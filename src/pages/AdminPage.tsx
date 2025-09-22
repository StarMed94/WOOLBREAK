import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy load admin components
const DashboardOverview = lazy(() => import('../components/admin/DashboardOverview'));
const UserManagement = lazy(() => import('../components/admin/UserManagement'));
const PluginManagement = lazy(() => import('../components/admin/PluginManagement'));

const AdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/plugins" element={<PluginManagement />} />
          {/* Add other admin routes here, e.g., settings, content, etc. */}
        </Routes>
      </Suspense>
    </AdminLayout>
  );
};

export default AdminPage;
