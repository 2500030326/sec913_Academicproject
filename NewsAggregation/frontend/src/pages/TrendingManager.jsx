import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles } from 'lucide-react';
import AdminNav from '../components/AdminNav';
import { adminAPI } from '../utils/api';

const TrendingManager = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      try {
        const response = await adminAPI.getTrending();
        setTopics(response.trendingTopics || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full px-4 md:px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <AdminNav />

        <motion.div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white">Trending Manager</h2>
              <p className="text-gray-400">AI-powered trending topics and viral headline intelligence.</p>
            </div>
            <Sparkles size={28} className="text-neon-purple" />
          </div>

          {loading ? (
            <p className="text-gray-400">Loading trending topics...</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {topics.map((topic, idx) => (
                <div key={idx} className="glass-morphism p-5 rounded-3xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-3xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Popularity Score</p>
                      <p className="text-xl font-semibold text-white">{topic.count}</p>
                    </div>
                  </div>
                  <p className="text-white font-bold text-lg">{topic.keyword}</p>
                  <p className="text-gray-400 mt-2">Recommended for editorial boost and push campaigns.</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.main>
  );
};

export default TrendingManager;
