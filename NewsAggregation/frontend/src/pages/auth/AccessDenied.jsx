import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AccessDenied = () => {
  const { user } = useAuth();
  const target = user?.role === 'admin' ? '/admin' : '/sources';

  return (
    <main className="flex min-h-screen items-center justify-center bg-dark-900 px-4 text-white">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg rounded-[2rem] border border-neon-pink/30 bg-white/10 p-8 text-center shadow-glass-lg backdrop-blur-2xl"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neon-pink/15 text-neon-pink">
          <ShieldAlert size={42} />
        </div>
        <h1 className="text-4xl font-black">Access Denied</h1>
        <p className="mt-4 text-gray-300">This page belongs to a different role. User and admin interfaces are kept completely separate.</p>
        <Link to={target} className="mt-8 inline-flex rounded-3xl bg-gradient-neon px-6 py-3 font-bold text-white shadow-neon-cyan">
          Go to my dashboard
        </Link>
      </motion.section>
    </main>
  );
};

export default AccessDenied;
