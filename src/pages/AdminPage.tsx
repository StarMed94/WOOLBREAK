import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import DashboardOverview from '../components/admin/DashboardOverview';
import UserManagement from '../components/admin/UserManagement';
import PluginManagement from '../components/admin/PluginManagement';

const AdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/plugins" element={<PluginManagement />} />
        {/* Add other admin routes here, e.g., settings, content, etc. */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminPage;
