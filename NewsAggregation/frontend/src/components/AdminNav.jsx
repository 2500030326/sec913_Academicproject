import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Bot,
  FileBarChart,
  FileText,
  Gauge,
  LayoutGrid,
  MessageCircle,
  Newspaper,
  Settings,
  ShieldCheck,
  Tags,
  User,
} from 'lucide-react';

const links = [
  { label: 'Dashboard', key: 'dashboard', path: '/admin', icon: Gauge, end: true },
  { label: 'Manage Articles', key: 'articles', path: '/admin/articles', icon: Newspaper },
  { label: 'Manage Categories', key: 'categories', path: '/admin/categories', icon: LayoutGrid },
  { label: 'Manage Sources', key: 'sources', path: '/admin/sources', icon: Tags },
  { label: 'Manage Users', key: 'users', path: '/admin/users', icon: User },
  { label: 'Analytics', key: 'analytics', path: '/admin/analytics', icon: BarChart3 },
  { label: 'Comments', key: 'comments', path: '/admin/comments', icon: MessageCircle },
  { label: 'Reports', key: 'reports', path: '/admin/reports', icon: FileBarChart },
  { label: 'Content Moderation', key: 'moderation', path: '/admin/articles', icon: ShieldCheck },
  { label: 'AI Search Analytics', key: 'ai-analytics', path: '/admin/ai-analytics', icon: Bot },
  { label: 'Settings', key: 'settings', path: '/admin/settings', icon: Settings },
  { label: 'System Logs', key: 'system-logs', path: '/admin/analytics', icon: FileText },
];

const AdminNav = ({ showBrand = true, layout = 'panel', activeTab, onTabChange }) => {
  const isSidebar = layout === 'sidebar';

  return (
    <div className={`${isSidebar ? 'h-full border-r rounded-none' : 'mb-6 rounded-2xl border'} border-white/10 bg-dark-900/90 backdrop-blur-2xl`}>
      {showBrand && (
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-neon text-sm font-black text-white shadow-neon-purple">
            NS
          </div>
          <div>
            <p className="text-xl font-bold leading-tight text-white">
              NewsSphere <span className="text-neon-cyan">AI</span>
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">Admin Panel</p>
          </div>
        </div>
      )}

      <nav className={`${isSidebar ? 'space-y-1' : 'grid gap-2 sm:grid-cols-2 xl:grid-cols-4'} px-4 py-5`}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = activeTab === link.key;

          return onTabChange ? (
            <button
              key={`${link.label}-${link.key}`}
              type="button"
              onClick={() => onTabChange(link.key)}
              className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-neon-blue via-neon-purple to-neon-purple text-white shadow-neon-purple'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span>{link.label}</span>
            </button>
          ) : (
            <NavLink
              key={`${link.label}-${link.path}`}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-neon-blue via-neon-purple to-neon-purple text-white shadow-neon-purple'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminNav;
