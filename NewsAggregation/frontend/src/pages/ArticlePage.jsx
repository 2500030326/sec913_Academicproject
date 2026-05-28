import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Heart, Share2, Bookmark, Clock, User, Calendar, Smile } from 'lucide-react';
import { articlesAPI } from '../utils/api';
import { toNewsCardArticle } from '../utils/articleMapper';

const COMMENTS_STORAGE_KEY = 'newsphere_article_comments';

const defaultComments = [
  {
    id: 1,
    articleId: '1',
    articleTitle: 'AI Breakthrough Revolutionizes Global Industries',
    author: 'Leah Nova',
    role: 'AI Researcher',
    message: 'This article is a great explanation of the breakthrough. The reasoning improvements are exciting.',
    time: '12m ago',
    likes: 24,
    status: 'Approved',
  },
  {
    id: 2,
    articleId: '1',
    articleTitle: 'AI Breakthrough Revolutionizes Global Industries',
    author: 'Marcus Lee',
    role: 'Investment Analyst',
    message: 'The potential impact on finance and healthcare is huge. I love the clarity in this report.',
    time: '35m ago',
    likes: 16,
    status: 'Approved',
  },
];

const getStoredComments = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(COMMENTS_STORAGE_KEY) || '[]');
    return Array.isArray(stored) && stored.length > 0 ? stored : defaultComments;
  } catch {
    return defaultComments;
  }
};

const ArticlePage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [apiArticle, setApiArticle] = useState(null);
  const [comments, setComments] = useState(getStoredComments);

  const { id } = useParams();

  useEffect(() => {
    articlesAPI.getById(id)
      .then((data) => setApiArticle(data))
      .catch(() => setApiArticle(null));
  }, [id]);

  const articleOptions = [
    {
      id: '1',
      category: 'Technology',
      title: 'AI Breakthrough Revolutionizes Global Industries',
      subtitle: 'A new generation model delivers unmatched context understanding and enterprise adoption.',
      author: 'Sofia Rivera',
      source: 'Global Tech Review',
      date: 'May 20, 2026',
      readTime: '8 min read',
      heroImage: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1400&h=700&fit=crop',
      credibility: 96,
      sentiment: 'Highly Positive',
      score: 98,
    },
    {
      id: '2',
      category: 'Sports',
      title: 'India Beats Australia by 6 Wickets in Thrilling Champions Trophy Match',
      subtitle: 'A superb all-round performance seals a dramatic victory in the final over.',
      author: 'Arjun Mehta',
      source: 'SportsSphere',
      date: 'May 20, 2026',
      readTime: '7 min read',
      heroImage: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1400&h=700&fit=crop',
      credibility: 93,
      sentiment: 'Positive',
      score: 92,
    },
  ];

  const mappedApiArticle = apiArticle ? toNewsCardArticle(apiArticle) : null;
  const article = mappedApiArticle
    ? {
        id: String(mappedApiArticle.id),
        category: mappedApiArticle.category,
        title: mappedApiArticle.title,
        subtitle: mappedApiArticle.description,
        author: apiArticle.author || 'NewsSphere AI',
        source: 'NewsSphere AI',
        date: mappedApiArticle.date,
        readTime: mappedApiArticle.readTime,
        heroImage: mappedApiArticle.image,
        credibility: mappedApiArticle.credibility,
        sentiment: mappedApiArticle.sentiment,
        score: mappedApiArticle.score,
        summary: apiArticle.summary,
        content: apiArticle.content,
      }
    : articleOptions.find((item) => item.id === id) || articleOptions[0];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const relatedArticles = [
    {
      id: 12,
      title: 'India vs Australia: Top Turning Points',
      description: 'Key moments that shaped the final result in the Champions Trophy.',
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/ff006e/ffffff?text=SP',
      source: 'SportsWire',
      date: '1h ago',
      readTime: '4 min read',
      category: 'Sports',
      credibility: 91,
      sentiment: 'Positive',
      score: 90,
      breaking: false,
    },
    {
      id: 13,
      title: 'Match Review: Bold Strategies for the Final Over',
      description: 'Analysis of the decisive moments and the coaching calls behind them.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop',
      sourceLogo: 'https://via.placeholder.com/40/0066ff/ffffff?text=AN',
      source: 'Arena News',
      date: '3h ago',
      readTime: '5 min read',
      category: 'Sports',
      credibility: 92,
      sentiment: 'Positive',
      score: 89,
      breaking: false,
    },
  ];

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => {
      const next = [
        {
        id: Date.now(),
        articleId: String(article.id),
        articleTitle: article.title,
        author: 'You',
        role: 'Reader',
        message: commentText.trim(),
        time: 'Just now',
        likes: 0,
        status: 'Pending',
      },
      ...prev,
      ];
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setCommentText('');
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full mt-24"
    >
      <motion.div className="fixed top-0 left-0 h-1 bg-gradient-neon z-50" style={{ width: `${scrollProgress}%` }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-96 md:h-[520px] overflow-hidden rounded-b-[3rem]"
      >
        <img src={article.heroImage} alt="Article Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid gap-10 lg:grid-cols-[2fr_0.95fr]">
        <section className="space-y-10">
          <div className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-2 rounded-full bg-neon-cyan/20 text-sm font-semibold text-neon-cyan">{article.category}</span>
              <span className="px-4 py-2 rounded-full bg-neon-purple/15 text-sm font-semibold text-purple-300">{article.sentiment}</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-sm text-gray-300">{article.score}% AI Match</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">{article.title}</h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">{article.subtitle}</p>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-white/10 pt-6">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white text-lg font-bold">SR</div>
                <div>
                  <p className="text-white font-semibold">{article.author}</p>
                  <p className="text-sm text-gray-400">{article.source} • {article.date}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2"><Calendar size={16} />{article.date}</span>
                <span className="flex items-center gap-2"><Clock size={16} />{article.readTime}</span>
                <span className="flex items-center gap-2"><User size={16} />4.8K reads</span>
              </div>
            </div>
          </div>

          <article className="space-y-8 text-gray-300">
            <div className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg">
              <h2 className="text-2xl font-bold text-white mb-4">AI-Generated Insight</h2>
              <p className="leading-relaxed">{article.summary || 'The model unveiled this week has surpassed previous benchmarks by integrating multimodal reasoning across text, vision, and structured data. Industries are already testing the newest inference pipeline for predictive analytics and decision support.'}</p>
            </div>

            <div className="grid gap-8">
              {(article.content ? [{ title: 'Full article', text: article.content }] : [
                {
                  title: 'Why it matters',
                  text: 'A more intelligent AI stack reduces manual review cycles, accelerates product launches, and provides detailed context across global news feeds.',
                },
                {
                  title: 'Real world impact',
                  text: 'Healthcare diagnostics, financial forecasting, and infrastructure planning are expected to benefit from faster, richer intelligence derived from this platform.',
                },
              ]).map((section) => (
                <div key={section.title} className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg">
                  <h3 className="text-2xl font-semibold text-white mb-3">{section.title}</h3>
                  <p className="leading-relaxed text-gray-300">{section.text}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => setIsLiked((prev) => !prev)} className="flex items-center gap-2 rounded-3xl bg-gradient-neon px-6 py-3 text-white font-semibold shadow-neon-cyan hover:shadow-neon-purple transition-all">
              <Heart size={18} /> {isLiked ? 'Liked' : 'Like'}
            </button>
            <button className="flex items-center gap-2 rounded-3xl bg-white/10 px-6 py-3 text-white hover:bg-white/20 transition-all" onClick={() => setIsLiked((prev) => !prev)}>
              <Heart size={18} className={isLiked ? 'fill-neon-pink text-neon-pink' : 'text-white'} /> {isLiked ? 'Liked' : 'Like'}
            </button>
            <button className="flex items-center gap-2 rounded-3xl bg-white/10 px-6 py-3 text-white hover:bg-white/20 transition-all" onClick={() => setIsBookmarked((prev) => !prev)}>
              <Bookmark size={18} /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, text: article.subtitle, url: window.location.href });
                } else {
                  navigator.clipboard?.writeText(window.location.href);
                }
              }}
              className="flex items-center gap-2 rounded-3xl bg-white/10 px-6 py-3 text-white hover:bg-white/20 transition-all"
            >
              <Share2 size={18} /> Share
            </button>
          </div>

          <div className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Comments</h2>
            <form onSubmit={handlePostComment} className="space-y-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                placeholder="Share your thoughts on this article"
                className="w-full rounded-3xl border border-white/10 bg-dark-900/90 px-5 py-4 text-white outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
              />
              <button type="submit" className="rounded-3xl bg-gradient-neon px-6 py-3 text-white font-semibold shadow-neon-cyan hover:shadow-neon-purple transition-all">
                Post Comment
              </button>
            </form>

            <div className="mt-8 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="glass-morphism p-5 rounded-3xl border border-white/10">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div>
                      <p className="text-white font-semibold">{comment.author}</p>
                      <p className="text-sm text-gray-400">{comment.role}</p>
                    </div>
                    <span className="text-xs text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{comment.message}</p>
                  <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
                    <button className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 hover:bg-white/10 transition-colors">
                      <Smile size={16} /> Like <span>{comment.likes}</span>
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 hover:bg-white/10 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <h3 className="text-xl font-semibold text-white mb-3">AI Summary</h3>
            <p className="text-gray-300 leading-relaxed">This article describes a major AI breakthrough with broad industrial impact and a strong credibility score. It highlights strategic adoption across multiple global sectors.</p>
          </div>

          <div className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Source Credibility</h3>
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-gray-400">Reliability Score</p>
                <p className="text-3xl font-bold text-white">{article.credibility}%</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-gray-400">AI Verified</p>
                <p className="text-xl font-semibold text-neon-cyan">Highest confidence</p>
              </div>
            </div>
          </div>

          <div className="glass-morphism p-8 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Related Stories</h3>
            <div className="space-y-4">
              {relatedArticles.map((article, idx) => (
                <div key={article.id} className="rounded-3xl bg-dark-900/90 p-4 border border-white/10">
                  <p className="text-white font-semibold">{article.title}</p>
                  <p className="text-sm text-gray-400 mt-2">{article.source} • {article.readTime}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </motion.main>
  );
};

export default ArticlePage;
