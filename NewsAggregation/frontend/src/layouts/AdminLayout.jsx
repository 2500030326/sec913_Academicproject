import { Outlet, useNavigate } from 'react-router-dom';
import { Bell, LogOut, MessageSquare, Search } from 'lucide-react';
import AdminNav from '../components/AdminNav';
import ParticleBackground from '../components/ParticleBackground';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <ParticleBackground />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 xl:block">
        <AdminNav layout="sidebar" />
      </aside>
      <div className="relative z-10 xl:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-dark-900/90 px-4 py-4 backdrop-blur-2xl md:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 xl:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-neon text-sm font-black">NS</div>
              <p className="text-xl font-bold">NewsSphere <span className="text-neon-cyan">Admin</span></p>
            </div>
            <div className="hidden items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 lg:flex lg:w-[420px]">
              <Search size={18} className="text-gray-400" />
              <input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500" placeholder="Search articles, users, reports..." />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-lg border border-white/10 bg-white/5 p-3 text-gray-200"><Bell size={18} /></button>
              <button className="rounded-lg border border-white/10 bg-white/5 p-3 text-gray-200"><MessageSquare size={18} /></button>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg border border-neon-pink/30 bg-neon-pink/10 px-4 py-3 text-sm text-neon-pink">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
