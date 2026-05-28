import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import NewsCard from '../../components/NewsCard';
import { articlesAPI, hnAPI } from '../../utils/api';
import { mergeArticles } from '../../utils/articleMapper';

const categoryArticles = [
  { id: 101, title: 'AI Chips Power the Next Computing Wave', description: 'Chipmakers race to build faster accelerators for large-scale AI systems.', image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1000&h=650&fit=crop', sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=AI', source: 'TechWire', date: 'Now', readTime: '5 min read', category: 'Technology', credibility: 95, sentiment: 'Positive', score: 96, breaking: true },
  { id: 102, title: 'Final Match Delivers Record Streaming Numbers', description: 'Sports audiences shift heavily toward interactive live coverage.', image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1000&h=650&fit=crop', sourceLogo: 'https://via.placeholder.com/40/ff006e/ffffff?text=SP', source: 'ESPN', date: '1h ago', readTime: '4 min read', category: 'Sports', credibility: 90, sentiment: 'Positive', score: 89, breaking: false },
  { id: 103, title: 'Markets Rise After Digital Policy Update', description: 'Business leaders welcome clarity on digital finance and public cloud rules.', image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1000&h=650&fit=crop', sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=BN', source: 'Bloomberg', date: '2h ago', readTime: '6 min read', category: 'Business', credibility: 93, sentiment: 'Neutral', score: 91, breaking: false },
  { id: 104, title: 'New Preventive Health Report Released', description: 'Researchers find early screening improves patient outcomes across regions.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&h=650&fit=crop', sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=HL', source: 'Healthline', date: '3h ago', readTime: '5 min read', category: 'Health', credibility: 96, sentiment: 'Positive', score: 94, breaking: false },
];

const CategoriesPage = () => {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const [publishedArticles, setPublishedArticles] = useState([]);

  useEffect(() => {
    hnAPI.getTechnologyStories()
      .then((data) => setPublishedArticles(Array.isArray(data.hits) ? data.hits : []))
      .catch(() => articlesAPI.getAll()
        .then((data) => setPublishedArticles(Array.isArray(data) ? data : []))
        .catch(() => setPublishedArticles([])));
  }, []);

  const allArticles = useMemo(
    () => mergeArticles(publishedArticles, categoryArticles),
    [publishedArticles]
  );

  const availableCategories = useMemo(
    () => ['All', ...Array.from(new Set(allArticles.map((article) => article.category).filter(Boolean)))],
    [allArticles]
  );

  const filtered = useMemo(
    () => allArticles.filter((article) => (active === 'All' || article.category === active) && article.title.toLowerCase().includes(query.toLowerCase())),
    [active, query, allArticles]
  );

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto mt-8 max-w-7xl pb-24">
      <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-glass-lg backdrop-blur-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan">Category Filters</p>
        <h1 className="mt-3 text-4xl font-black text-white">Explore News by Category</h1>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-all ${active === category ? 'bg-gradient-neon text-white shadow-neon-cyan' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-dark-800/80 px-4 py-3">
            <Search size={18} className="text-neon-cyan" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter articles..." className="bg-transparent text-white outline-none" />
          </label>
        </div>
      </section>
      <div className="mb-5 flex items-center gap-2 text-gray-400"><Filter size={18} /> Showing {filtered.length} articles</div>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((article, index) => <NewsCard key={article.id} article={article} index={index} />)}
      </section>
    </motion.main>
  );
};

export default CategoriesPage;
