import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, TrendingUp, Globe, Shield, Cpu, BarChart3, ShieldCheck } from 'lucide-react';
import BreakingNewsTicker from '../components/BreakingNewsTicker';
import TrendingSlider from '../components/TrendingSlider';
import NewsCard from '../components/NewsCard';
import { articlesAPI, hnAPI } from '../utils/api';
import { mergeArticles } from '../utils/articleMapper';

const Homepage = () => {
  const [publishedArticles, setPublishedArticles] = useState([]);

  useEffect(() => {
    hnAPI.getTechnologyStories()
      .then((data) => setPublishedArticles(Array.isArray(data.hits) ? data.hits : []))
      .catch(() => articlesAPI.getAll()
        .then((data) => setPublishedArticles(Array.isArray(data) ? data : []))
        .catch(() => setPublishedArticles([])));
  }, []);

  const categories = [
    'Technology', 'Sports', 'Politics', 'Entertainment', 'Business', 'Health', 'Science', 'Education', 'World News', 'Finance', 'Environment', 'Breaking News',
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'AI Breakthrough Revolutionizes Global Industries',
      description: 'A new AI model is accelerating productivity across healthcare, finance, and transportation.',
      image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=AI',
      source: 'TechCrunch',
      date: '1h ago',
      readTime: '6 min read',
      category: 'Technology',
      credibility: 94,
      sentiment: 'Positive',
      score: 98,
      breaking: true,
    },
    {
      id: 2,
      title: 'Cricket Team Wins Final After Thrilling Last Over',
      description: 'Fans celebrate the nail-biting victory as the championship trophy returns home.',
      image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/ff006e/ffffff?text=SP',
      source: 'ESPN',
      date: '3h ago',
      readTime: '4 min read',
      category: 'Sports',
      credibility: 89,
      sentiment: 'Positive',
      score: 87,
      breaking: false,
    },
    {
      id: 3,
      title: 'Government Announces New Digital Policy',
      description: 'The new legislation aims to strengthen security and expand digital services nationwide.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=PO',
      source: 'Reuters',
      date: '4h ago',
      readTime: '5 min read',
      category: 'Politics',
      credibility: 91,
      sentiment: 'Neutral',
      score: 92,
      breaking: false,
    },
    {
      id: 4,
      title: 'New Sci-Fi Movie Breaks Box Office Records',
      description: 'The futuristic blockbuster sets new records for opening weekend engagement.',
      image: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/b833ff/ffffff?text=EN',
      source: 'Variety',
      date: '5h ago',
      readTime: '3 min read',
      category: 'Entertainment',
      credibility: 86,
      sentiment: 'Positive',
      score: 88,
      breaking: false,
    },
    {
      id: 5,
      title: 'Startup Raises Funding for AI Platform',
      description: 'A new generation AI startup secures strategic investment to scale its realtime analytics engine.',
      image: 'https://images.unsplash.com/photo-1515165562835-c95d7a9e2dc4?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=BS',
      source: 'Bloomberg',
      date: '6h ago',
      readTime: '5 min read',
      category: 'Business',
      credibility: 93,
      sentiment: 'Positive',
      score: 95,
      breaking: false,
    },
    {
      id: 6,
      title: 'New Health Study Reveals Benefits of Preventive Care',
      description: 'Researchers report that preventive screening significantly lowers long-term healthcare costs.',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=HL',
      source: 'Healthline',
      date: '7h ago',
      readTime: '6 min read',
      category: 'Health',
      credibility: 96,
      sentiment: 'Positive',
      score: 94,
      breaking: false,
    },
    {
      id: 7,
      title: 'Space Mission Achieves Historic Milestone',
      description: 'The international team completes the next stage of a deep space data relay mission.',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=SC',
      source: 'Space.com',
      date: '8h ago',
      readTime: '7 min read',
      category: 'Science',
      credibility: 97,
      sentiment: 'Positive',
      score: 99,
      breaking: false,
    },
    {
      id: 8,
      title: 'Universities Introduce AI-Based Learning Systems',
      description: 'Educational institutions launch adaptive learning courses powered by smart tutoring systems.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/b833ff/ffffff?text=ED',
      source: 'EdTech Today',
      date: '9h ago',
      readTime: '5 min read',
      category: 'Education',
      credibility: 90,
      sentiment: 'Positive',
      score: 91,
      breaking: false,
    },
    {
      id: 9,
      title: 'International Summit Focuses on Global Security',
      description: 'World leaders meet to coordinate cybersecurity and climate resilience priorities.',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=WN',
      source: 'Al Jazeera',
      date: '10h ago',
      readTime: '6 min read',
      category: 'World News',
      credibility: 95,
      sentiment: 'Neutral',
      score: 93,
      breaking: false,
    },
    {
      id: 10,
      title: 'Digital Payments Continue Rapid Growth',
      description: 'Consumers are adopting digital wallets as financial technology expands into new markets.',
      image: 'https://images.unsplash.com/photo-151financial?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=FN',
      source: 'Financial Times',
      date: '11h ago',
      readTime: '4 min read',
      category: 'Finance',
      credibility: 92,
      sentiment: 'Positive',
      score: 90,
      breaking: false,
    },
    {
      id: 11,
      title: 'Climate Action Initiative Shows Positive Results',
      description: 'Regional programs deliver measurable reductions in emissions and sustainable investment.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/00d4ff/ffffff?text=EN',
      source: 'EcoWatch',
      date: '12h ago',
      readTime: '5 min read',
      category: 'Environment',
      credibility: 94,
      sentiment: 'Positive',
      score: 93,
      breaking: false,
    },
    {
      id: 12,
      title: 'Major Cities Invest in Smart Infrastructure',
      description: 'Urban centers deploy connected systems to improve traffic, safety, and energy efficiency.',
      image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=IN',
      source: 'The Verge',
      date: '13h ago',
      readTime: '6 min read',
      category: 'World News',
      credibility: 91,
      sentiment: 'Positive',
      score: 89,
      breaking: false,
    },
  ];

  const sportsHighlights = [
    {
      id: 12,
      title: 'League Final Sees Record Viewership Across Asia',
      description: 'A blockbuster championship match brings a new audience to live sports and digital coverage.',
      image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/ff006e/ffffff?text=SP',
      source: 'SportsNews',
      date: '1h ago',
      readTime: '4 min read',
      category: 'Sports',
      credibility: 90,
      sentiment: 'Positive',
      score: 88,
      breaking: false,
    },
    {
      id: 13,
      title: 'World Cup Qualifiers Heat Up After Surprising Upsets',
      description: 'Underdogs are changing the early narrative in the race to the next international tournament.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=WC',
      source: 'Global Sports',
      date: '2h ago',
      readTime: '5 min read',
      category: 'Sports',
      credibility: 88,
      sentiment: 'Positive',
      score: 87,
      breaking: false,
    },
    {
      id: 14,
      title: 'Star Athlete Announces Return from Injury Ahead of Season',
      description: 'The comeback announcement boosts expectations for the upcoming championship run.',
      image: 'https://images.unsplash.com/photo-1517632298126-4da8d5ef6f66?w=1200&h=700&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/b833ff/ffffff?text=SP',
      source: 'Athlete Weekly',
      date: '3h ago',
      readTime: '4 min read',
      category: 'Sports',
      credibility: 92,
      sentiment: 'Positive',
      score: 91,
      breaking: false,
    },
  ];

  const popularSources = [
    { name: 'BBC News', coverage: 'News, World, Politics', score: 95 },
    { name: 'Reuters', coverage: 'Business, Finance, Tech', score: 93 },
    { name: 'CNN', coverage: 'Politics, Breaking', score: 91 },
    { name: 'TechCrunch', coverage: 'Technology, Startups', score: 94 },
  ];

  const liveUpdates = [
    'AI search latency improved by 24% across global clusters.',
    'Breaking: New climate agreement signed by fifteen nations.',
    'Finance index shows record adoption of digital wallets.',
  ];

  const allFeaturedArticles = mergeArticles(publishedArticles, featuredArticles);
  const recommendedArticles = allFeaturedArticles.filter((item) => item.id !== allFeaturedArticles[0]?.id).slice(0, 4);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-dark-900/60 border border-white/10 shadow-glass-lg px-6 py-8 md:px-10 md:py-10 mb-10">
        <div className="absolute -left-24 top-0 w-72 h-72 rounded-full bg-neon-purple/20 blur-3xl"></div>
        <div className="absolute -right-24 bottom-0 w-72 h-72 rounded-full bg-neon-cyan/20 blur-3xl"></div>
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.8fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-neon-cyan font-semibold">
              <Sparkles size={18} /> AI NEWS HUB
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Welcome to <span className="gradient-text">NewsSphere AI</span>
            </h1>
            <p className="max-w-2xl text-gray-300 text-lg md:text-xl leading-relaxed">
              Discover curated global intelligence from technology, politics, business, health, science and more. A futuristic premium news experience built for modern readers.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="glass-morphism p-5 rounded-3xl border border-white/10">
                <p className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-3">AI Semantic Search</p>
                <p className="text-white font-semibold">Search smarter with contextual recommendation.</p>
              </div>
              <div className="glass-morphism p-5 rounded-3xl border border-white/10">
                <p className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-3">Live Ticker</p>
                <p className="text-white font-semibold">Stay updated with real-time breaking alerts.</p>
              </div>
            </div>
          </div>

          <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glow-md backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-14 h-14 rounded-3xl bg-gradient-neon flex items-center justify-center text-white shadow-neon-purple">
                <Globe size={28} />
              </span>
              <div>
                <p className="text-sm text-gray-400">Instant AI access</p>
                <p className="text-xl font-bold text-white">Launch your intelligent briefing.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-dark-800/80 rounded-3xl border border-neon-cyan/20">
              <Search className="text-neon-cyan" size={20} />
              <input
                type="text"
                placeholder="Search global news..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500"
              />
            </div>
            <div className="mt-6 space-y-4">
              {['Latest technology trends', 'Global economic updates', 'Health news today', 'Climate change updates'].map((item, idx) => (
                <button key={idx} className="w-full text-left p-4 rounded-3xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <BreakingNewsTicker />
      </div>

      {/* Top Searches Section */}
      <section className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg mb-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Top Searches</p>
            <h2 className="text-3xl font-bold text-white">Search queries readers are exploring</h2>
            <p className="text-gray-400 mt-2">These search insights are unique to the home page and show what other stories are not covering yet.</p>
          </div>
          <button className="rounded-3xl bg-gradient-neon px-5 py-3 text-sm font-semibold text-black hover:shadow-neon-cyan transition-all">
            Explore Search Trends
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { query: 'AI media bias detection', volume: '12.4K', reason: 'High interest, low coverage' },
            { query: 'Privacy-first recommendation systems', volume: '9.8K', reason: 'Research-driven demand' },
            { query: 'Global climate finance dashboard', volume: '8.1K', reason: 'Unique reader need' },
          ].map((item, idx) => (
            <div key={idx} className="rounded-3xl bg-dark-800/90 p-6 border border-white/10">
              <p className="text-sm text-gray-400">Top search</p>
              <h3 className="text-xl font-bold text-white mt-3">{item.query}</h3>
              <p className="text-sm text-gray-400 mt-4">{item.reason}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-neon-cyan">
                {item.volume} searches
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-10 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="space-y-10">
          <section className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Category Lens</p>
                <h2 className="text-3xl font-bold text-white">Explore Every News Category</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.slice(0, 7).map((category) => (
                  <button key={category} className="px-4 py-2 rounded-full bg-dark-800/90 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <TrendingSlider articles={allFeaturedArticles.slice(0, 5)} />
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Latest Coverage</p>
                <h2 className="text-3xl font-bold text-white">New Articles & Insights</h2>
              </div>
              <button className="px-5 py-3 bg-gradient-neon text-white rounded-3xl font-semibold shadow-neon-cyan hover:scale-105 transition-transform">
                View All</button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {allFeaturedArticles.slice(0, 4).map((item, idx) => (
                <NewsCard key={item.id} article={item} index={idx} />
              ))}
            </div>
          </section>

          <section className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Sports News</p>
                <h2 className="text-3xl font-bold text-white">Featured Sports Coverage</h2>
              </div>
              <button className="px-5 py-3 bg-gradient-neon text-white rounded-3xl font-semibold shadow-neon-cyan hover:scale-105 transition-transform">
                Explore Sports</button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {sportsHighlights.map((item, idx) => (
                <NewsCard key={item.id} article={item} index={idx} />
              ))}
            </div>
          </section>

          <section className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Recommended</p>
                <h2 className="text-3xl font-bold text-white">AI Curated Stories</h2>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {recommendedArticles.map((item, idx) => (
                <NewsCard key={item.id} article={item} index={idx} />
              ))}
            </div>
          </section>

          <section className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Architecture</p>
                <h2 className="text-3xl font-bold text-white">Tech Stack Visual</h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { label: 'React.js frontend', icon: <Cpu size={20} /> },
                { label: 'Tailwind CSS styling', icon: <Sparkles size={20} /> },
                { label: 'Framer Motion animations', icon: <TrendingUp size={20} /> },
                { label: 'Spring Boot backend', icon: <ShieldCheck size={20} /> },
                { label: 'PostgreSQL database', icon: <BarChart3 size={20} /> },
                { label: 'MongoDB article storage', icon: <Globe size={20} /> },
              ].map((item, idx) => (
                <div key={idx} className="glass-morphism p-5 rounded-3xl border border-white/10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-3xl bg-neon-cyan/15 text-neon-cyan flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={20} className="text-neon-cyan" />
              <div>
                <p className="text-sm text-gray-400">Live Updates</p>
                <h3 className="text-2xl font-bold text-white">Realtime Alerts</h3>
              </div>
            </div>
            <div className="space-y-4">
              {liveUpdates.map((update, idx) => (
                <div key={idx} className="rounded-3xl bg-dark-800/90 p-4 border border-white/10 text-gray-300">
                  {update}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex items-center gap-3 mb-6">
              <Globe size={20} className="text-neon-cyan" />
              <div>
                <p className="text-sm text-gray-400">Popular Sources</p>
                <h3 className="text-2xl font-bold text-white">Trusted Networks</h3>
              </div>
            </div>
            <div className="space-y-4">
              {popularSources.map((source, idx) => (
                <div key={idx} className="rounded-3xl bg-dark-800/90 p-4 border border-white/10 text-gray-300">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-white font-semibold">{source.name}</p>
                      <p className="text-sm text-gray-400">{source.coverage}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-neon-cyan/15 text-neon-cyan text-xs">{source.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Trending Now & Startup Spotlight */}
      <section className="max-w-7xl mx-auto mt-12 space-y-8">
        <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Trending Now</p>
              <h3 className="text-2xl font-bold text-white">Topics People Are Reading</h3>
            </div>
            <div className="text-sm text-gray-400">Live • Updated 2m ago</div>
          </div>
          <div className="overflow-x-auto flex gap-4 py-2 px-1">
            {['AI Ethics', 'Climate', 'Quantum Computing', 'Global Markets', 'Space Tech', 'Elections', 'Healthcare AI', 'Fintech', 'Energy'].map((tag, idx) => (
              <button key={idx} className="min-w-[180px] text-left glass-morphism p-4 rounded-2xl border border-white/8 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-neon flex items-center justify-center text-white text-sm font-bold shadow-neon-purple">{tag.split(' ').map(w=>w[0]).join('')}</div>
                  <div>
                    <p className="text-white font-semibold">{tag}</p>
                    <p className="text-sm text-gray-400">Trending • {Math.floor(5 + Math.random()*95)}K reads</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Startup Spotlight</p>
                <h3 className="text-2xl font-bold text-white">AI Startups to Watch</h3>
              </div>
              <div className="text-sm text-gray-400">Curated by NewsSphere AI</div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[{
                name: 'Aurora Labs',
                desc: 'Realtime edge inference platform accelerating ML at the edge.',
                funding: '$24M',
                metric: 'Latency down 42%'
              },{
                name: 'VectorNest',
                desc: 'High-density vector DB for semantic search and recommendations.',
                funding: '$12M',
                metric: 'Search relevance +18%'
              },{
                name: 'SentiFlow',
                desc: 'Sentiment-driven personalization engine for publishers.',
                funding: '$8.5M',
                metric: 'CTR +9%'
              }].map((s, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-dark-800/80 border border-white/8 flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-neon flex items-center justify-center text-white font-bold shadow-neon-cyan">{s.name.split(' ').map(w=>w[0]).join('').slice(0,3)}</div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{s.name}</p>
                    <p className="text-sm text-gray-400">{s.desc}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs">
                      <span className="px-2 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan">{s.funding}</span>
                      <span className="px-2 py-1 rounded-full bg-neon-purple/10 text-neon-purple">{s.metric}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neon-cyan font-semibold">Trending Sources</p>
                <h3 className="text-2xl font-bold text-white">Top Performing Sources</h3>
              </div>
              <div className="text-sm text-gray-400">Metrics • 24h</div>
            </div>
            <div className="space-y-3">
              {popularSources.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-dark-800/80 rounded-xl border border-white/8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-sm font-semibold">{s.name.split(' ').map(t=>t[0]).join('').slice(0,2)}</div>
                    <div>
                      <p className="text-white font-medium">{s.name}</p>
                      <p className="text-sm text-gray-400">{s.coverage}</p>
                    </div>
                  </div>
                  <div className="text-sm text-neon-cyan font-semibold">{s.score}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Homepage;

