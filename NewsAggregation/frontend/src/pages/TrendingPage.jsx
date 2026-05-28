import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Sparkles, Bell, Globe } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import { articlesAPI, hnAPI } from '../utils/api';
import { mergeArticles } from '../utils/articleMapper';

const TrendingPage = () => {
  const [publishedArticles, setPublishedArticles] = useState([]);

  useEffect(() => {
    hnAPI.getTechnologyStories()
      .then((data) => setPublishedArticles(Array.isArray(data.hits) ? data.hits : []))
      .catch(() => articlesAPI.getAll()
        .then((data) => setPublishedArticles(Array.isArray(data) ? data : []))
        .catch(() => setPublishedArticles([])));
  }, []);

  const trendingStories = [
    {
      id: 21,
      title: 'AI Regulation Debate Intensifies Across Europe',
      description: 'Lawmakers weigh new transparency requirements for generative models and data usage.',
      image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=EU',
      source: 'Financial Times',
      date: '1h ago',
      readTime: '5 min read',
      category: 'Policy',
      credibility: 92,
      sentiment: 'Neutral',
      score: 91,
      breaking: true,
    },
    {
      id: 22,
      title: 'Consumer Adoption of Autonomous Mobility Surges',
      description: 'New ride-share pilots reveal strong demand for driverless and hybrid transport services.',
      image: 'https://images.unsplash.com/photo-1519222970733-f546218fa6d7?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/ff006e/ffffff?text=TR',
      source: 'Wired',
      date: '2h ago',
      readTime: '4 min read',
      category: 'Mobility',
      credibility: 89,
      sentiment: 'Positive',
      score: 88,
      breaking: false,
    },
    {
      id: 23,
      title: 'Streaming Platforms Invest in AI-Powered Content Discovery',
      description: 'Personalized recommendations keep viewers engaged with next-generation story search.',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=ST',
      source: 'Variety',
      date: '3h ago',
      readTime: '5 min read',
      category: 'Entertainment',
      credibility: 87,
      sentiment: 'Positive',
      score: 90,
      breaking: false,
    },
  ];

  const momentumCards = [
    { title: 'Search Interest', value: '72%', label: 'AI Safety', icon: TrendingUp },
    { title: 'Engagement Shift', value: '+18%', label: 'Crypto News', icon: Zap },
    { title: 'Share of Voice', value: '41%', label: 'Climate Action', icon: Globe },
  ];

  const hotKeywords = [
    'AI oversight', 'Zero trust', 'Quantum cloud', 'Electric mobility', 'Streaming AI', 'Regulation', 'Sustainability', 'Meta shifts',
  ];

  const visibleTrendingStories = mergeArticles(
    publishedArticles.filter((article) => article.trending || article.featured || article.breaking),
    trendingStories
  );

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full px-4 md:px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        <section className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Trending Pulse</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white">What’s Trending Today</h1>
              <p className="max-w-2xl text-gray-400 mt-4">Stay ahead with the stories driving conversation, sentiment, and momentum across the global news cycle.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {['Now', 'Viral', 'AI', 'Policy'].map((item) => (
                <div key={item} className="rounded-3xl bg-dark-800/90 border border-white/10 p-4 text-center">
                  <p className="text-sm text-gray-400">{item}</p>
                  <p className="mt-2 text-xl font-bold text-white">{item === 'Now' ? 'Live' : item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {momentumCards.map(({ title, value, label, icon: Icon }, idx) => (
              <div key={idx} className="glass-morphism p-6 rounded-[2rem] border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-3xl bg-neon-cyan/15 text-neon-cyan flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{title}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Momentum indicator for {label} coverage.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Hot Stories</p>
                  <h2 className="text-3xl font-bold text-white">Top Trending Articles</h2>
                </div>
                <button className="px-5 py-3 bg-gradient-neon text-black rounded-3xl font-semibold shadow-neon-cyan hover:scale-105 transition-transform">Refresh</button>
              </div>
              <div className="grid gap-6">
                {visibleTrendingStories.map((story, idx) => (
                  <NewsCard key={story.id} article={story} index={idx} />
                ))}
              </div>
            </div>

            <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Trend Signals</p>
                  <h2 className="text-3xl font-bold text-white">Keyword Pulse</h2>
                </div>
                <Sparkles size={24} className="text-neon-purple" />
              </div>
              <div className="flex flex-wrap gap-3">
                {hotKeywords.map((keyword, idx) => (
                  <span key={idx} className="px-4 py-3 rounded-3xl bg-dark-800/90 border border-white/10 text-gray-300 text-sm">{keyword}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
              <div className="flex items-center gap-3 mb-6">
                <Bell size={20} className="text-neon-cyan" />
                <div>
                  <p className="text-sm text-gray-400">Action Center</p>
                  <h3 className="text-2xl font-bold text-white">Quick Trend Tools</h3>
                </div>
              </div>
              <div className="grid gap-3">
                {['Create Alert', 'Boost Coverage', 'Export Report', 'Share Insight'].map((label, idx) => (
                  <button key={idx} className="w-full text-left rounded-3xl bg-white/5 border border-white/10 px-4 py-4 text-white hover:bg-white/10 transition-colors">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-gray-400">Action for the latest trend pulse.</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
              <div className="flex items-center gap-3 mb-6">
                <Globe size={20} className="text-neon-cyan" />
                <div>
                  <p className="text-sm text-gray-400">Momentum</p>
                  <h3 className="text-2xl font-bold text-white">Trending Regions</h3>
                </div>
              </div>
              <div className="space-y-3">
                {['North America', 'Europe', 'Asia', 'Global'].map((region, idx) => (
                  <div key={idx} className="rounded-3xl bg-dark-800/90 p-4 border border-white/10 flex items-center justify-between">
                    <p className="text-white">{region}</p>
                    <span className="text-sm text-neon-cyan">{Math.floor(60 + Math.random() * 30)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </motion.main>
  );
};

export default TrendingPage;
