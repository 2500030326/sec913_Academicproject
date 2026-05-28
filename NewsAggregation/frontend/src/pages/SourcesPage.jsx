import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Globe } from 'lucide-react';

const sources = [
  { id: 1, name: 'BBC News', categories: 'World, Politics, Culture', score: 96, articles: 124 },
  { id: 2, name: 'Reuters', categories: 'Business, Markets, Tech', score: 94, articles: 109 },
  { id: 3, name: 'CNN', categories: 'Breaking, World, Health', score: 92, articles: 98 },
  { id: 4, name: 'TechCrunch', categories: 'AI, Startups, Gadgets', score: 95, articles: 88 },
  { id: 5, name: 'The Verge', categories: 'Science, Culture, Entertainment', score: 90, articles: 75 },
  { id: 6, name: 'ESPN', categories: 'Sports, Events, Interviews', score: 89, articles: 66 },
  { id: 7, name: 'Times of India', categories: 'World, Business, Politics', score: 91, articles: 112 },
  { id: 8, name: 'Economic Times', categories: 'Finance, Markets, Economy', score: 93, articles: 98 },
  { id: 9, name: 'Al Jazeera', categories: 'World, Security, Environment', score: 94, articles: 102 },
  { id: 10, name: 'The Hindu', categories: 'Politics, Education, Culture', score: 92, articles: 85 },
];

const SourcesPage = () => {
  const [followed, setFollowed] = useState([]);

  const toggleFollow = (id) => {
    setFollowed((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <main className="w-full max-w-7xl mx-auto mt-8 px-4 md:px-6 pb-32">
      <section className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg mb-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neon-cyan font-semibold">Source Explorer</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Trusted News Sources</h1>
            <p className="text-gray-300 mt-3 max-w-2xl">Discover the credibility, coverage depth, and reliability scores for top global publishers powering NewsSphere AI.</p>
          </div>
          <button className="inline-flex items-center gap-3 rounded-3xl bg-gradient-neon px-6 py-4 text-white font-semibold shadow-neon-cyan hover:shadow-neon-purple transition-all">
            <Globe size={20} /> Follow Top Sources
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sources.map((source, idx) => (
          <motion.article
            key={source.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-morphism rounded-[2rem] p-6 border border-white/10 shadow-glass-lg hover:-translate-y-2 hover:shadow-neon-purple transition-all"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-3xl bg-white/10 flex items-center justify-center text-2xl text-neon-cyan font-bold">
                  {source.name.split(' ').map((word) => word[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{source.name}</h2>
                  <p className="text-sm text-gray-400">{source.categories}</p>
                </div>
              </div>
              <span className="rounded-full bg-neon-cyan/15 px-3 py-1 text-xs font-semibold text-neon-cyan">{source.score}%</span>
            </div>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center justify-between">
                <span className="text-sm">Articles</span>
                <span className="text-sm font-semibold text-white">{source.articles}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Coverage</span>
                <span className="text-sm font-semibold text-gray-200">{source.categories.split(',')[0]}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <button className="w-full rounded-3xl bg-white/10 py-3 text-sm text-white hover:bg-white/20 transition-colors">View Profile</button>
              <button onClick={() => toggleFollow(source.id)} className="inline-flex items-center gap-2 rounded-3xl bg-neon-cyan px-4 py-3 text-sm font-semibold text-dark-900 hover:opacity-90 transition-opacity">
                <Star size={16} /> {followed.includes(source.id) ? 'Following' : 'Follow'}
              </button>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
};

export default SourcesPage;
