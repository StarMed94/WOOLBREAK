import React from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import StatCard from './StatCard';
import UsersChart from './charts/UsersChart';
import RevenueChart from './charts/RevenueChart';

const DashboardOverview: React.FC = () => {
  const stats = [
    { title: 'Revenu Total', value: '45,231.89 €', change: '+20.1%', icon: <DollarSign />, color: 'text-green-500' },
    { title: 'Abonnements', value: '+2350', change: '+180.1%', icon: <Users />, color: 'text-purple-500' },
    { title: 'Ventes', value: '+12,234', change: '+19%', icon: <ShoppingCart />, color: 'text-blue-500' },
    { title: 'Taux d\'activité', value: '99.7%', change: '+2.1%', icon: <Activity />, color: 'text-pink-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aperçu des revenus</h2>
          <div className="h-80">
            <RevenueChart />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Nouveaux utilisateurs</h2>
          <div className="h-80">
            <UsersChart />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
