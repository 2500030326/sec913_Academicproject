import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Layers, Shield } from 'lucide-react';

const Sidebar = ({ isOpen, isMobile, onClose }) => {
  const trendingTopics = [
    { title: 'AI Technology', count: 2543 },
    { title: 'Climate Change', count: 1823 },
    { title: 'Space Exploration', count: 1654 },
    { title: 'Quantum Computing', count: 1432 },
    { title: 'Cybersecurity', count: 1289 },
  ];

  const topSources = [
    { name: 'TechCrunch', score: 92 },
    { name: 'BBC News', score: 95 },
    { name: 'Reuters', score: 93 },
    { name: 'The Verge', score: 90 },
    { name: 'ESPN', score: 87 },
  ];

  const categories = ['Technology', 'Sports', 'Politics', 'Business', 'Health', 'Science', 'Environment'];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`${
        isMobile ? 'fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-[#02040a]/95 backdrop-blur-2xl p-6 transition-transform shadow-glass-lg' : 'hidden lg:flex lg:w-1/5 flex-col gap-4 p-6 bg-gradient-dark sticky top-24 h-[calc(100vh-96px)] overflow-y-auto'
      } ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
    >
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Menu</h3>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            Close
          </button>
        </div>
      )}

      <div className="glass-morphism p-5 rounded-3xl mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Layers size={20} className="text-neon-cyan" />
          <div>
            <p className="text-sm text-gray-400">Personal Feed</p>
            <p className="text-white font-semibold">Futuristic news updates</p>
          </div>
        </div>
        <div className="space-y-2">
          {categories.map((item) => (
            <div key={item} className="flex items-center justify-between rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition-colors">
              <span className="text-sm text-white">{item}</span>
              <span className="text-xs text-neon-cyan">{Math.floor(Math.random() * 120 + 20)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-morphism p-5 rounded-3xl mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-neon-cyan" />
          <h3 className="font-bold text-white">Trending Now</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 8 }}
              className="cursor-pointer p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <p className="text-sm font-medium text-white">{topic.title}</p>
              <p className="text-xs text-gray-400">{topic.count} articles</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-morphism p-5 rounded-3xl mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={18} className="text-neon-cyan" />
          <h3 className="font-bold text-white">Top Sources</h3>
        </div>
        <div className="space-y-3">
          {topSources.map((source, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-sm text-white">{source.name}</span>
              <span className="text-xs text-neon-cyan">{source.score}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-morphism p-5 rounded-3xl">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-neon-cyan" />
          <h3 className="font-bold text-white">Live Alerts</h3>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl bg-white/5 p-4 text-sm text-gray-300">Global security summit yields new cooperation plan.</div>
          <div className="rounded-2xl bg-white/5 p-4 text-sm text-gray-300">AI search index updated with finance and health feeds.</div>
          <div className="rounded-2xl bg-white/5 p-4 text-sm text-gray-300">Breaking: New green energy initiative gains momentum.</div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
