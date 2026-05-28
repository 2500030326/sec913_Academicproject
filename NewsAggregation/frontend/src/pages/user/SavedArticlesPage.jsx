import { motion } from 'framer-motion';
import NewsCard from '../../components/NewsCard';

const saved = [
  { id: 201, title: 'Privacy-First Recommendation Systems', description: 'How publishers are rebuilding personalization without invasive tracking.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&h=650&fit=crop', sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=PR', source: 'The Verge', date: 'Saved today', readTime: '6 min read', category: 'Technology', credibility: 94, sentiment: 'Positive', score: 93, breaking: false },
  { id: 202, title: 'Climate Finance Dashboard Gains Adoption', description: 'A global data product helps readers track policy, capital, and climate outcomes.', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&h=650&fit=crop', sourceLogo: 'https://via.placeholder.com/40/14b8a6/ffffff?text=CL', source: 'EcoWatch', date: 'Saved yesterday', readTime: '5 min read', category: 'Environment', credibility: 92, sentiment: 'Neutral', score: 90, breaking: false },
];

const SavedArticlesPage = () => (
  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto mt-8 max-w-7xl pb-24">
    <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-glass-lg backdrop-blur-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan">Saved Library</p>
      <h1 className="mt-3 text-4xl font-black text-white">Your Bookmarked Articles</h1>
      <p className="mt-3 max-w-2xl text-gray-400">Stories you save from NewsSphere AI appear here for quick reading later.</p>
    </section>
    <section className="grid gap-6 md:grid-cols-2">
      {saved.map((article, index) => <NewsCard key={article.id} article={article} index={index} />)}
    </section>
  </motion.main>
);

export default SavedArticlesPage;
