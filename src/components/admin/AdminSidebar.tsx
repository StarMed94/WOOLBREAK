import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Code, LayoutDashboard, Users, Settings, LogOut, ExternalLink, Puzzle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSidebar: React.FC = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Tableau de bord', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Utilisateurs', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Plugins', path: '/admin/plugins', icon: <Puzzle className="w-5 h-5" /> },
    { name: 'Paramètres', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">Woolbrick</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-gray-200">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
          <span>Retour au site</span>
          <ExternalLink className="w-4 h-4" />
        </a>
        <div className="mt-4 flex items-center space-x-3 px-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-blue-700">
            {profile?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-gray-800 truncate">{profile?.username}</p>
            <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
          </div>
          <motion.button
            onClick={signOut}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            whileHover={{ scale: 1.1 }}
            title="Déconnexion"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
