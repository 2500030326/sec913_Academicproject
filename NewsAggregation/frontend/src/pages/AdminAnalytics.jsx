import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import AdminNav from '../components/AdminNav';
import { adminAPI } from '../utils/api';

const AdminAnalytics = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const analytics = await adminAPI.getAnalytics();
        setTrafficData(analytics.traffic || []);
        const sentiment = analytics.sentiment || {};
        setSentimentData([
          { name: 'Positive', value: sentiment.positive || 0 },
          { name: 'Neutral', value: sentiment.neutral || 0 },
          { name: 'Negative', value: sentiment.negative || 0 },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full px-4 md:px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <AdminNav />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <motion.div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Daily Traffic Analytics</h2>
            {loading ? (
              <p className="text-gray-400">Loading analytics...</p>
            ) : (
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={trafficData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#2a3148" strokeDasharray="4 4" />
                  <XAxis dataKey="label" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid #00d4ff' }} />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          <motion.div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <h2 className="text-3xl font-bold text-white mb-4">AI Sentiment Distribution</h2>
            {loading ? (
              <p className="text-gray-400">Loading sentiment metrics...</p>
            ) : (
              <ResponsiveContainer width="100%" height={340}>
                <PieChart>
                  <Legend verticalAlign="bottom" height={36} />
                  <Pie data={sentimentData} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={100} fill="#8884d8" label>
                    {sentimentData.map((entry, index) => (
                      <Cell key={entry.name} fill={['#22d3ee', '#818cf8', '#fb7185'][index % 3]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default AdminAnalytics;
