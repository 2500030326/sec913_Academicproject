import { motion } from 'framer-motion';
import { Bookmark, LogOut, Settings, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto mt-8 max-w-5xl pb-24">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-glass-lg backdrop-blur-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-neon text-3xl font-black shadow-neon-cyan">
              {user?.fullname?.[0] || 'U'}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-neon-cyan">Reader Profile</p>
              <h1 className="text-4xl font-black text-white">{user?.fullname || 'NewsSphere Reader'}</h1>
              <p className="mt-2 text-gray-400">@{user?.username} · User role</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login', { replace: true });
            }}
            className="inline-flex items-center gap-2 rounded-3xl border border-neon-pink/30 bg-neon-pink/10 px-5 py-3 font-semibold text-neon-pink"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { icon: Bookmark, label: 'Saved Articles', value: '18' },
          { icon: Star, label: 'Followed Sources', value: '12' },
          { icon: User, label: 'Comments Posted', value: '34' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-glass-md backdrop-blur-2xl">
            <Icon className="text-neon-cyan" />
            <p className="mt-4 text-sm text-gray-400">{label}</p>
            <p className="text-3xl font-black text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-glass-lg backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <Settings className="text-neon-cyan" />
          <h2 className="text-2xl font-bold text-white">Reader Preferences</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {['AI daily briefing', 'Breaking news push alerts', 'Weekly source report', 'Personalized category ranking'].map((item) => (
            <label key={item} className="flex items-center justify-between rounded-2xl bg-dark-800/80 p-4 text-gray-200">
              {item}
              <input type="checkbox" defaultChecked className="accent-neon-cyan" />
            </label>
          ))}
        </div>
      </section>
    </motion.main>
  );
};

export default ProfilePage;
