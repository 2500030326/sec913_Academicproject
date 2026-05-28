import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Bookmark, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewsCard = ({ article, index }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const openArticle = () => {
    const externalUrl = article.url || article.link;
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noreferrer');
    } else {
      navigate(`/news/${article.id}`);
    }
  };

  const shareUrl = article.url || article.link || `${window.location.origin}/news/${article.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      onClick={openArticle}
      className="glass-morphism rounded-[2rem] overflow-hidden cursor-pointer group card-hover-lift border border-white/10"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"></div>

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-neon-cyan/20 border border-neon-cyan rounded-full text-[11px] font-semibold text-neon-cyan">
            {article.category}
          </span>
          {article.breaking && (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="px-3 py-1 bg-neon-pink/20 border border-neon-pink rounded-full text-[11px] font-semibold text-neon-pink"
            >
              BREAKING
            </motion.span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 text-right">
          <span className="px-3 py-1 bg-dark-900/90 border border-white/10 rounded-full text-[11px] text-neon-cyan">
            {article.score}% AI Score
          </span>
          <span className="px-3 py-1 bg-dark-900/90 border border-white/10 rounded-full text-[11px] text-gray-300">
            {article.sentiment}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3 mb-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <img src={article.sourceLogo} alt={article.source} className="w-7 h-7 rounded-full" />
            <span>{article.source}</span>
          </div>
          <span>{article.date}</span>
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-tight group-hover:text-neon-cyan transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-gray-300 mb-5 line-clamp-3">{article.description}</p>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={14} />
            {article.credibility}%
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 size={14} />
            {article.category === 'Breaking' ? 'Hot' : `${article.sentiment} Trend`}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked((prev) => !prev);
              }}
              className="p-2 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <Heart size={16} className={isLiked ? 'fill-neon-pink text-neon-pink' : 'text-gray-300'} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked((prev) => !prev);
              }}
              className="p-2 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <Bookmark size={16} className={isBookmarked ? 'fill-neon-cyan text-neon-cyan' : 'text-gray-300'} />
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              if (navigator.share) {
                navigator.share({ title: article.title, text: article.description, url: shareUrl });
              } else {
                navigator.clipboard?.writeText(shareUrl);
              }
            }}
            className="p-2 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <Share2 size={16} className="text-gray-300" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
