import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, TrendingUp, Zap } from 'lucide-react';
import NewsCard from '../components/NewsCard';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const exampleSearches = [
    'Latest technology trends',
    'Global economic updates',
    'Climate change initiatives',
    'Space exploration news',
  ];

  const trendingKeywords = [
    { keyword: 'Artificial Intelligence', searches: 45230 },
    { keyword: 'Quantum Computing', searches: 32100 },
    { keyword: 'Blockchain', searches: 28950 },
    { keyword: 'Cybersecurity', searches: 25680 },
    { keyword: 'Green Energy', searches: 22450 },
  ];

  const mockResults = [
    {
      id: 1,
      title: 'Latest AI Breakthrough Revolutionizes Technology Industry',
      description: 'Researchers unveil a groundbreaking AI model that surpasses previous benchmarks.',
      image: 'https://images.unsplash.com/photo-1677442d019cecf8978f4a4c41b3b4fe78a929ae?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40',
      source: 'TechNews Daily',
      date: '2 hours ago',
      readTime: '5 min read',
      category: 'Technology',
      credibility: 98,
      sentiment: 'Positive',
      score: 98,
      breaking: true,
    },
    {
      id: 2,
      title: 'AI Industry Growth Accelerates Globally',
      description: 'Major tech companies invest heavily in artificial intelligence research.',
      image: 'https://images.unsplash.com/photo-1555949519-88f09e0bfed5?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40',
      source: 'Tech Weekly',
      date: '1 hour ago',
      readTime: '5 min read',
      category: 'Technology',
      credibility: 96,
      sentiment: 'Positive',
      score: 96,
      breaking: false,
    },
    {
      id: 3,
      title: 'Future of Machine Learning Unveiled',
      description: 'New algorithms promise faster and more efficient AI processing.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40',
      source: 'AI Today',
      date: '2 hours ago',
      readTime: '6 min read',
      category: 'Technology',
      credibility: 94,
      sentiment: 'Positive',
      score: 94,
      breaking: false,
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        setResults(mockResults);
        setIsSearching(false);
      }, 800);
    }
  };

  const SemanticVisualization = () => {
    const nodes = [
      { x: 20, y: 30, label: 'AI', color: '#00d4ff' },
      { x: 50, y: 20, label: 'Machine Learning', color: '#b833ff' },
      { x: 80, y: 35, label: 'Neural Networks', color: '#ff006e' },
      { x: 35, y: 65, label: 'Deep Learning', color: '#0066ff' },
      { x: 65, y: 70, label: 'NLP', color: '#00d4ff' },
      { x: 50, y: 50, label: 'Search Query', color: '#00ff00' },
    ];

    return (
      <div className="relative w-full h-80 glass-morphism rounded-2xl p-6 mb-8 overflow-hidden">
        <svg className="w-full h-full absolute top-0 left-0">
          {nodes.map((node1, idx1) =>
            nodes.map((node2, idx2) => {
              if (idx1 < idx2) {
                const dist = Math.hypot(node2.x - node1.x, node2.y - node1.y);
                const opacity = Math.max(0, 1 - dist / 100);
                return (
                  <line
                    key={`${idx1}-${idx2}`}
                    x1={`${node1.x}%`}
                    y1={`${node1.y}%`}
                    x2={`${node2.x}%`}
                    y2={`${node2.y}%`}
                    stroke={node1.color}
                    strokeWidth="1"
                    opacity={opacity * 0.5}
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        {nodes.map((node, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15 }}
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xs border-2"
              style={{
                backgroundColor: `${node.color}20`,
                borderColor: node.color,
                boxShadow: `0 0 20px ${node.color}`,
              }}
            >
              {node.label.split(' ')[0]}
            </motion.div>
          </motion.div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-400">AI Semantic Search Network</p>
        </div>
      </div>
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-4 md:px-6 py-12 mt-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text-cyber">AI-Powered</span> Search
          </h1>
          <p className="text-gray-400 text-lg">Search across millions of articles using semantic understanding</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="glass-morphism p-2 md:p-3 rounded-2xl flex items-center gap-3 neon-cyan-glow focus-within:shadow-neon-purple">
            <Search className="text-neon-cyan flex-shrink-0" size={24} />
            <input
              type="text"
              placeholder="Ask anything about news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
            >
              <Mic size={20} className="text-neon-cyan" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="px-6 py-2 bg-gradient-neon text-white rounded-lg font-semibold neon-cyan-glow"
            >
              Search
            </motion.button>
          </div>
        </motion.div>

        {/* Semantic Visualization */}
        {!results.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SemanticVisualization />
          </motion.div>
        )}

        {/* Example Searches */}
        {!results.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-neon-cyan" />
              Try These Searches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exampleSearches.map((search, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSearchQuery(search);
                    setTimeout(handleSearch, 100);
                  }}
                  className="glass-morphism p-4 rounded-xl text-left hover:bg-white/10 transition-smooth group"
                >
                  <p className="text-white font-medium group-hover:text-neon-cyan transition-colors">{search}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trending Keywords */}
        {!results.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-neon-cyan" />
              Trending Keywords
            </h3>
            <div className="space-y-3">
              {trendingKeywords.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="glass-morphism p-4 rounded-xl flex justify-between items-center cursor-pointer hover:bg-white/10 transition-smooth"
                  onClick={() => {
                    setSearchQuery(item.keyword);
                    setTimeout(handleSearch, 100);
                  }}
                >
                  <span className="text-white font-medium">{item.keyword}</span>
                  <span className="text-xs text-gray-400">{item.searches.toLocaleString()} searches</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-8">
              <h3 className="text-white font-semibold text-lg mb-4">
                {results.length} results found for <span className="gradient-text">"{searchQuery}"</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {results.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <NewsCard article={article} index={idx} />
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setResults([])}
              className="mt-8 w-full px-6 py-3 bg-gradient-neon text-white rounded-xl font-semibold neon-cyan-glow"
            >
              Clear Results
            </motion.button>
          </motion.div>
        )}

        {isSearching && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-center py-12"
          >
            <p className="text-neon-cyan font-semibold">Searching with AI...</p>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
};

export default SearchPage;
