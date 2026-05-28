import React from 'react';
import { motion } from 'framer-motion';
import AdminNav from '../components/AdminNav';

const NotificationCenter = () => (
  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full px-4 md:px-6 py-12 mt-20">
    <div className="max-w-7xl mx-auto">
      <AdminNav />
      <div className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg">
        <h2 className="text-3xl font-bold text-white mb-4">Notification Center</h2>
        <p className="text-gray-400">Manage system alerts, editorial push updates, and notification templates from here.</p>
      </div>
    </div>
  </motion.main>
);

export default NotificationCenter;
