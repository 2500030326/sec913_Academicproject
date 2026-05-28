import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Twitter, Facebook, MessageCircle } from 'lucide-react';
import AdminNav from '../components/AdminNav';
import { adminAPI } from '../utils/api';

const platformIcons = {
  WHATSAPP: MessageCircle,
  TWITTER: Twitter,
  FACEBOOK: Facebook,
  TELEGRAM: MessageCircle,
};

const ShareAnalytics = () => {
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const analytics = await adminAPI.getShareAnalytics();
        setDetails(analytics.platformBreakdown || []);
        setSummary({ whatsappShares: analytics.topWhatsApp || 0 });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full px-4 md:px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <AdminNav />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white">Share Analytics</h2>
                <p className="text-gray-400">Track shares by platform and spot WhatsApp virality in real time.</p>
              </div>
              <Share2 size={28} className="text-neon-cyan" />
            </div>

            {loading ? (
              <p className="text-gray-400">Loading share data...</p>
            ) : (
              <div className="space-y-4">
                {details.map((item) => {
                  const Icon = platformIcons[item.platform] || Share2;
                  return (
                    <div key={item.platform} className="glass-morphism p-5 rounded-3xl border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{item.platform}</p>
                        <p className="text-2xl font-bold text-white">{item.count}</p>
                      </div>
                      <Icon size={28} className="text-neon-cyan" />
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          <motion.div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <h3 className="text-2xl font-bold text-white mb-4">WhatsApp Spotlight</h3>
            <div className="rounded-3xl bg-dark-800/90 p-6 text-center border border-white/10">
              <MessageCircle size={36} className="mx-auto text-neon-green" />
              <p className="text-sm text-gray-400 mt-4">Most shared platform</p>
              <p className="text-4xl font-bold text-white mt-2">{summary?.whatsappShares ?? 0}</p>
              <p className="text-gray-400 mt-2">Shares tracked in the last 30 days</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default ShareAnalytics;
