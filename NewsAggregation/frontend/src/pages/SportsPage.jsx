import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Heart, Clock, ChevronRight, Activity } from 'lucide-react';
import NewsCard from '../components/NewsCard';

const SportsPage = () => {
  const heroStory = {
    id: 2,
    category: 'Sports',
    title: 'India Beats Australia by 6 Wickets in Thrilling Champions Trophy Match',
    summary: 'A superb all-round performance from the Indian batting lineup secures a memorable win at the final over, with the crowd erupting in celebration.',
    image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1400&h=900&fit=crop',
    details: [
      'India chased down the total with three balls to spare after a power-packed middle order stand.',
      'The Australian bowling attack was kept under pressure by quick singles, creative shot selection and tight running between wickets.',
      'A rising star in the squad sealed the victory with a fearless six in the final over.',
    ],
    stats: [
      { label: 'Passion Index', value: '98%', icon: <Heart size={18} /> },
      { label: 'Momentum', value: 'Rising', icon: <TrendingUp size={18} /> },
      { label: 'Live Score', value: 'India 265/4 - AUS 264/9', icon: <Clock size={18} /> },
    ],
  };

  const sportsArticles = [
    {
      id: 12,
      title: 'Alcaraz Wins French Open 2024 in Epic Five-Set Thriller',
      description: 'The young star overcame a dramatic comeback to lift the Roland Garros trophy after six hours of relentless tennis.',
      image: 'https://images.unsplash.com/photo-1505842465776-3d5d6a98a7f2?w=1200&h=800&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=TN',
      source: 'Tennis News',
      date: '2h ago',
      readTime: '5 min read',
      category: 'Sports',
      credibility: 91,
      sentiment: 'Positive',
      score: 89,
      breaking: false,
    },
    {
      id: 13,
      title: 'Verstappen Dominates Monaco GP for Record Win',
      description: 'A flawless display on the streets of Monaco gives the championship leader another historic victory.',
      image: 'https://images.unsplash.com/photo-1512486130939-bdbfd6f58a66?w=1200&h=800&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/b833ff/ffffff?text=F1',
      source: 'Grand Prix Today',
      date: '4h ago',
      readTime: '4 min read',
      category: 'Sports',
      credibility: 90,
      sentiment: 'Positive',
      score: 87,
      breaking: false,
    },
    {
      id: 14,
      title: 'Manchester City Completes Treble with FA Cup Win',
      description: 'A dominant performance at Wembley completes a landmark season for the Blue side.',
      image: 'https://images.unsplash.com/photo-1517632298126-4da8d5ef6f66?w=1200&h=800&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=FC',
      source: 'Football Hub',
      date: '6h ago',
      readTime: '6 min read',
      category: 'Sports',
      credibility: 93,
      sentiment: 'Positive',
      score: 92,
      breaking: false,
    },
    {
      id: 15,
      title: 'Olympic Trails Heat Up as Finals Approach',
      description: 'Athletes around the world post record performances while securing their spots on the Olympic roster.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=800&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/ff006e/ffffff?text=OL',
      source: 'Olympics Daily',
      date: '8h ago',
      readTime: '5 min read',
      category: 'Sports',
      credibility: 88,
      sentiment: 'Positive',
      score: 85,
      breaking: false,
    },
  ];

  const relatedHighlights = [
    {
      label: 'Match of the Day',
      value: 'India vs Australia',
      detail: 'Champions Trophy final highlights and tactical breakdown.',
    },
    {
      label: 'Player Spotlight',
      value: 'Virat Kohli',
      detail: 'Key innings that turned the game in the late overs.',
    },
    {
      label: 'Next Event',
      value: 'World Cup Qualifiers',
      detail: 'Teams to watch ahead of the next international stage.',
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full py-10"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid gap-8 xl:grid-cols-[1.55fr_0.9fr]">
          <div className="relative rounded-[2rem] overflow-hidden bg-dark-900/70 border border-white/10 shadow-glass-lg">
            <img src={heroStory.image} alt={heroStory.title} className="w-full h-[560px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-transparent to-transparent" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/15 text-neon-cyan text-sm font-semibold">Sports Spotlight</span>
              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight">{heroStory.title}</h1>
              <p className="mt-5 max-w-3xl text-gray-300 text-lg leading-relaxed">{heroStory.summary}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {heroStory.stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl bg-white/5 p-5 border border-white/10">
                    <div className="flex items-center gap-3 text-neon-cyan">{stat.icon}</div>
                    <p className="mt-3 text-sm text-gray-400">{stat.label}</p>
                    <p className="text-xl font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Live Feed</p>
                  <h2 className="text-2xl font-bold text-white">Trending Events</h2>
                </div>
                <TrendingUp size={20} className="text-neon-cyan" />
              </div>
              <div className="space-y-4">
                {relatedHighlights.map((item) => (
                  <div key={item.label} className="rounded-3xl bg-dark-800/95 p-5 border border-white/10">
                    <p className="text-sm text-gray-400 uppercase tracking-[0.2em]">{item.label}</p>
                    <p className="mt-2 text-lg text-white font-semibold">{item.value}</p>
                    <p className="mt-2 text-sm text-gray-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Quick Stats</p>
                  <h2 className="text-2xl font-bold text-white">Performance Panel</h2>
                </div>
                <Activity size={20} className="text-neon-cyan" />
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="rounded-3xl bg-white/5 p-4 border border-white/10">
                  <p className="text-sm text-gray-400">Ball Possession</p>
                  <p className="text-xl font-semibold text-white">63%</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4 border border-white/10">
                  <p className="text-sm text-gray-400">Win Probability</p>
                  <p className="text-xl font-semibold text-white">87%</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4 border border-white/10">
                  <p className="text-sm text-gray-400">AI Confidence</p>
                  <p className="text-xl font-semibold text-neon-cyan">95%</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Sports News</p>
                <h2 className="text-3xl font-bold text-white">Latest Sports Headlines</h2>
              </div>
              <button className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-neon text-white rounded-3xl font-semibold shadow-neon-cyan hover:scale-105 transition-transform">
                View All <ChevronRight size={18} />
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {sportsArticles.map((article, idx) => (
                <NewsCard key={article.id} article={article} index={idx} />
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Related Image</p>
                  <h3 className="text-2xl font-bold text-white">Match Highlights</h3>
                </div>
                <Trophy size={20} className="text-neon-cyan" />
              </div>
              <img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&h=800&fit=crop" alt="Match highlights" className="w-full h-56 rounded-[1.75rem] object-cover border border-white/10" />
              <p className="mt-4 text-gray-300 leading-relaxed">A dramatic moment from the final, captured with vibrant stadium lighting and the fans cheering in the background.</p>
            </div>

            <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Quick Read</p>
                  <h3 className="text-2xl font-bold text-white">AI Sports Analysis</h3>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">AI identifies the winning strategy, momentum shifts, and player impact so readers can absorb the game story in seconds.</p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-3xl bg-dark-800/95 p-4 border border-white/10">
                  <p className="text-sm text-gray-400">Recommended Watch</p>
                  <p className="text-white font-semibold">Next Match Preview: India vs New Zealand</p>
                </div>
                <div className="rounded-3xl bg-dark-800/95 p-4 border border-white/10">
                  <p className="text-sm text-gray-400">Top Team</p>
                  <p className="text-white font-semibold">Chennai Super Kings</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.main>
  );
};

export default SportsPage;
