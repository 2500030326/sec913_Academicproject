import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Menu, Sparkles, LogOut, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, onDarkModeToggle, onMenuToggle, isMobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    'Technology', 'Sports', 'Politics', 'Entertainment', 'Business', 'Health', 'Science', 'Education', 'World', 'Finance', 'Environment', 'Breaking',
  ];

  const navItems = [
    { label: 'Home', path: '/home' },
    { label: 'Sports', path: '/sports' },
    { label: 'Categories', path: '/categories' },
    { label: 'Trending', path: '/trending' },
    { label: 'AI Search', path: '/search' },
    { label: 'Sources', path: '/sources' },
    { label: 'Saved', path: '/saved' },
    { label: 'Profile', path: '/profile' },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-dark-900/85 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-3"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-neon shadow-neon-purple flex items-center justify-center text-base font-bold text-white">
              NS
            </div>
            <div className="hidden md:block">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">NewsSphere</p>
              <p className="text-lg font-bold text-white">NewsSphere AI</p>
            </div>
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-4 text-sm text-gray-200">
          {navItems.slice(0, 2).map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}

          <div className="relative">
            <button
              onClick={() => setShowCategories((prev) => !prev)}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Categories
              <Sparkles size={16} className="text-neon-cyan" />
            </button>
            {showCategories && (
              <div className="absolute left-0 top-12 w-64 bg-dark-800/95 border border-white/10 rounded-3xl p-4 backdrop-blur-xl shadow-glass-lg">
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        navigate(`/categories?category=${encodeURIComponent(category)}`);
                        setShowCategories(false);
                      }}
                      className="text-left text-sm text-gray-300 hover:text-white rounded-2xl px-3 py-2 bg-white/5 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navItems.slice(2).map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 glass-morphism rounded-full border border-white/10">
            <Search size={18} className="text-neon-cyan" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-44"
            />
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <User size={18} className="text-white" />
          </button>
          <button
            onClick={() => navigate('/saved')}
            className="p-2 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <Bookmark size={18} className="text-white" />
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/login', { replace: true });
            }}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/15 text-neon-pink rounded-2xl font-semibold border border-neon-pink/30"
          >
            <LogOut size={16} /> Logout
          </button>

          {isMobile && (
            <button onClick={onMenuToggle} className="p-2 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <Menu size={20} className="text-white" />
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
