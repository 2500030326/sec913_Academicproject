import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Bookmark, Clock, BarChart3, Settings, Bell, LogOut } from 'lucide-react';
import NewsCard from '../components/NewsCard';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const userStats = [
    { icon: Flame, label: 'Reading Streak', value: '12 Days', color: '#ff006e' },
    { icon: Bookmark, label: 'Saved Reads', value: '18', color: '#00d4ff' },
    { icon: Clock, label: 'AI Briefings', value: '8', color: '#b833ff' },
    { icon: BarChart3, label: 'Personal Highlights', value: '21', color: '#0066ff' },
  ];

  const personalFeed = [
    {
      id: 11,
      title: 'Your Morning Brief: AI, Markets, and Mobility',
      description: 'A custom digest crafted from your followed topics and signals from global publishers.',
      image: 'https://images.unsplash.com/photo-1515165562835-c95d7a9e2dc4?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=MD',
      source: 'Morning Digest',
      date: 'Just now',
      readTime: '4 min read',
      category: 'Personalized',
      credibility: 97,
      sentiment: 'Positive',
      breaking: true,
    },
    {
      id: 12,
      title: 'AI Ethics Roundup: New Governance Standards',
      description: 'Guidelines released for transparent model deployment across financial and healthcare sectors.',
      image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/b833ff/ffffff?text=ETH',
      source: 'Policy Pulse',
      date: '5 min ago',
      readTime: '6 min read',
      category: 'Policy',
      credibility: 94,
      sentiment: 'Neutral',
      breaking: false,
    },
    {
      id: 13,
      title: 'Climate Tech Investment Sees Strong Inflows',
      description: 'Funding continues to accelerate for AI-driven climate resilience startups.',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=CL',
      source: 'EcoFinance',
      date: '20 min ago',
      readTime: '5 min read',
      category: 'Environment',
      credibility: 92,
      sentiment: 'Positive',
      breaking: false,
    },
  ];

  const savedArticles = [
    {
      id: 14,
      title: 'Neural Interfaces Expand Developer Access',
      description: 'The latest interface design promises broader adoption among application developers.',
      image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=NI',
      source: 'Tech Horizon',
      date: 'Yesterday',
      readTime: '6 min read',
      category: 'Technology',
      credibility: 95,
      sentiment: 'Positive',
      breaking: false,
    },
    {
      id: 15,
      title: 'Healthcare AI Adoption Trends in 2026',
      description: 'Hospitals are implementing predictive diagnostics and personalized patient workflows.',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/b833ff/ffffff?text=HL',
      source: 'Health Future',
      date: '2 days ago',
      readTime: '7 min read',
      category: 'Health',
      credibility: 93,
      sentiment: 'Positive',
      breaking: false,
    },
  ];

  const recentReads = [
    {
      id: 16,
      title: 'Startup Funding Trends in AI Infrastructure',
      description: 'Analyzing venture flow into model serving, data pipelines, and compute efficiency.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=VF',
      source: 'Venture Flash',
      date: 'Today',
      readTime: '5 min read',
      category: 'Business',
      credibility: 91,
      sentiment: 'Neutral',
      breaking: false,
    },
    {
      id: 17,
      title: 'Urban Mobility and Smart City Sensors',
      description: 'How data-driven cities are improving transit and energy management.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=UM',
      source: 'City Grid',
      date: 'Yesterday',
      readTime: '6 min read',
      category: 'Infrastructure',
      credibility: 90,
      sentiment: 'Positive',
      breaking: false,
    },
  ];

  const followedTopics = [
    'AI Ethics',
    'Global Markets',
    'Climate Tech',
    'Health Innovation',
    'Startup Funding',
    'Space Exploration',
  ];

  const preferences = [
    { label: 'Tailored AI Digest', enabled: true },
    { label: 'Push Alerts for Breaking News', enabled: true },
    { label: 'Weekly Summary Email', enabled: false },
    { label: 'Curated Trend Reports', enabled: true },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-4 md:px-6 py-12 mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Welcome Back, <span className="gradient-text">Alex</span>
            </h1>
            <p className="text-gray-400 mt-2">Your personalized news dashboard</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-smooth"
            >
              <Bell size={20} className="text-neon-cyan" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-smooth"
            >
              <Settings size={20} className="text-neon-cyan" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-smooth"
            >
              <LogOut size={20} className="text-neon-pink" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {userStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-morphism p-6 rounded-2xl text-center"
              >
                <Icon size={24} className="mx-auto mb-3" style={{ color: stat.color }} />
                <p className="text-xs md:text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-morphism p-6 rounded-3xl border border-white/10 shadow-glass-lg mb-8"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Dynamic Insights</p>
              <h2 className="text-3xl font-bold text-white">Supercharged Activity</h2>
              <p className="text-gray-400 mt-2">Live intelligence on reader behavior, trending topic acceleration, and action triggers.</p>
            </div>
            <button className="rounded-3xl bg-gradient-neon px-5 py-3 text-sm font-semibold text-black hover:shadow-neon-cyan transition-all">
              Refresh Signals
            </button>
          </div>
          <div className="grid gap-4 mt-6 md:grid-cols-3">
            {[
              { label: 'Live Pulse', value: '+18%', note: 'Your followed topics are trending higher' },
              { label: 'AI Recommendation', value: '3 new', note: 'Suggested stories for your feed' },
              { label: 'Attention Index', value: '92%', note: 'Real-time reader focus on current topics' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-3xl bg-dark-800/90 p-5 border border-white/10">
                <p className="text-sm text-gray-400">{item.label}</p>
                <p className="text-3xl font-bold text-white mt-3">{item.value}</p>
                <p className="text-sm text-gray-400 mt-3">{item.note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4 mb-6 border-b border-white/10 pb-4"
            >
              {['feed', 'saved', 'history'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-semibold capitalize transition-smooth ${
                    activeTab === tab
                      ? 'text-neon-cyan border-b-2 border-neon-cyan'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'feed' ? 'Your Feed' : tab === 'saved' ? 'Saved Stories' : 'Recently Read'}
                </motion.button>
              ))}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
                {activeTab === 'feed' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    <span className="gradient-text">Your</span> Personalized Feed
                  </h3>
                  {personalFeed.map((article, idx) => (
                    <NewsCard key={article.id} article={article} index={idx} />
                  ))}
                </div>
              )}

              {activeTab === 'saved' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    <span className="gradient-text">Saved</span> Stories
                  </h3>
                  {savedArticles.map((article, idx) => (
                    <NewsCard key={article.id} article={article} index={idx} />
                  ))}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    <span className="gradient-text">Recently</span> Read
                  </h3>
                  {recentReads.map((article, idx) => (
                    <NewsCard key={article.id} article={article} index={idx} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Followed Topics */}
            <div className="glass-morphism p-6 rounded-2xl">
              <h3 className="text-white font-bold mb-4">Followed Topics</h3>
              <div className="flex flex-wrap gap-2">
                {followedTopics.map((topic, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-gradient-card border border-neon-cyan/30 rounded-full text-xs text-neon-cyan cursor-pointer hover:border-neon-cyan transition-smooth"
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Notification Settings */}
            <div className="glass-morphism p-6 rounded-2xl">
              <h3 className="text-white font-bold mb-4">Preferences</h3>
              <div className="space-y-3">
                {preferences.map((pref, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-300">{pref.label}</span>
                    <motion.div
                      className={`w-10 h-6 rounded-full cursor-pointer transition-colors ${
                        pref.enabled ? 'bg-gradient-neon' : 'bg-gray-600'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reading Goals */}
            <div className="glass-morphism p-6 rounded-2xl">
              <h3 className="text-white font-bold mb-4">Reading Goal</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">This Week</span>
                  <span className="text-neon-cyan font-semibold">8 / 10 articles</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-neon"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default UserDashboard;
