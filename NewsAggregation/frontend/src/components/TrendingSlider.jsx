import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';

const TrendingSlider = ({ articles }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + articles.length) % articles.length);
  }, [articles.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(interval);
  }, [paginate]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        <span className="gradient-text">Trending</span> Stories
      </h2>

      <div className="relative">
        <div className="relative h-96 md:h-96 bg-dark-800/50 rounded-3xl overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="absolute inset-0"
            >
              <NewsCard article={articles[current]} index={0} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-gradient-neon rounded-full text-white neon-cyan-glow hover:shadow-neon-purple transition-smooth"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-gradient-neon rounded-full text-white neon-cyan-glow hover:shadow-neon-purple transition-smooth"
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {articles.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              className={`transition-all ${
                idx === current
                  ? 'w-8 h-2 bg-gradient-neon'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              } rounded-full`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSlider;
