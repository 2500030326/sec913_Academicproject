import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  Bell,
  CheckCircle2,
  Clock3,
  Download,
  Edit3,
  Eye,
  FileText,
  LogOut,
  MessageSquare,
  Radio,
  Search,
  Trash2,
  User,
  Wifi,
  XCircle,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import ArticleManagement from './ArticleManagement';
import AdminSources from './admin/AdminSources';
import UserManagement from './UserManagement';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../utils/api';

const weekData = [
  { day: 'May 15', views: 42000, sessions: 18000, users: 7000 },
  { day: 'May 16', views: 56000, sessions: 30000, users: 14000 },
  { day: 'May 17', views: 69000, sessions: 23000, users: 11000 },
  { day: 'May 18', views: 44000, sessions: 26000, users: 13000 },
  { day: 'May 19', views: 65000, sessions: 31000, users: 16000 },
  { day: 'May 20', views: 47000, sessions: 27000, users: 12000 },
  { day: 'May 21', views: 84000, sessions: 43000, users: 21000 },
];

const categories = [
  { name: 'Technology', value: 28.5, color: '#8b5cf6' },
  { name: 'Sports', value: 20.4, color: '#00d4ff' },
  { name: 'Politics', value: 14.8, color: '#14b8a6' },
  { name: 'Business', value: 12.6, color: '#f59e0b' },
  { name: 'Entertainment', value: 10.3, color: '#ff006e' },
  { name: 'Health', value: 6.7, color: '#60a5fa' },
  { name: 'Science', value: 4.2, color: '#ef4444' },
  { name: 'Others', value: 2.5, color: '#6366f1' },
];

const activeUsers = [
  { day: 'May 15', users: 18000 },
  { day: 'May 16', users: 21000 },
  { day: 'May 17', users: 21500 },
  { day: 'May 18', users: 21200 },
  { day: 'May 19', users: 22600 },
  { day: 'May 20', users: 23200 },
  { day: 'May 21', users: 21400 },
];

const metrics = [
  { label: 'Total Articles', value: '12,458', change: '+12.5%', icon: FileText, color: 'from-neon-purple to-neon-blue', data: [24, 18, 23, 16, 22, 31, 29, 18, 27, 35] },
  { label: 'Total Users', value: '25,430', change: '+18.6%', icon: User, color: 'from-neon-blue to-neon-cyan', data: [28, 20, 26, 21, 24, 34, 29, 23, 32, 32] },
  { label: 'Total Views', value: '1.28M', change: '+24.3%', icon: Eye, color: 'from-neon-pink to-fuchsia-500', data: [31, 24, 27, 22, 33, 32, 36, 24, 27, 35] },
  { label: 'Avg. Read Time', value: '3m 42s', change: '+8.4%', icon: Clock3, color: 'from-orange-500 to-amber-400', data: [20, 14, 17, 22, 18, 28, 33, 22, 18, 16] },
  { label: 'Active Now', value: '1,324', change: '+15.2%', icon: Wifi, color: 'from-emerald-500 to-teal-400', data: [12, 20, 16, 23, 14, 17, 28, 22, 15, 13] },
];

const sourceScores = [
  ['BBC News', 98],
  ['Reuters', 96],
  ['The Hindu', 94],
  ['Al Jazeera', 93],
  ['CNN', 91],
  ['Times of India', 89],
  ['TechCrunch', 87],
];

const topics = [
  ['Elections 2024', 'sm'],
  ['AI Revolution', 'lg'],
  ['Global Explosion', 'sm'],
  ['Olympics 2024', 'sm'],
  ['Climate Change', 'xl'],
  ['Metaverse', 'sm'],
  ['Ukraine Crisis', 'sm'],
  ['Cricket World Cup', 'lg'],
  ['Earthquake', 'sm'],
  ['Health & Wellness', 'sm'],
  ['Renewable Energy', 'sm'],
  ['Interest Rates', 'sm'],
];

const articles = [
  ['AI Breakthrough Revolutionizes Global Industries', 'Technology', 'John Doe', 'Published', '45.2K'],
  ['India Beats Australia by 6 Wickets in Thrilling Match', 'Sports', 'Mike Ross', 'Published', '38.7K'],
  ['Government Announces New Digital Policy for Citizens', 'Politics', 'Sarah Connor', 'Published', '32.1K'],
  ['New Sci-Fi Movie Breaks Box Office Records', 'Entertainment', 'David Smith', 'Published', '29.3K'],
  ['Stock Markets Reach New Highs Amid Economic Growth', 'Business', 'Emma Watson', 'Published', '28.9K'],
];

const activity = [
  ['New article published', '2 min ago', FileText],
  ['User registered', '5 min ago', User],
  ['Comment added', '7 min ago', MessageSquare],
  ['Article updated', '12 min ago', Edit3],
  ['New source added', '18 min ago', Radio],
  ['Article deleted', '22 min ago', Trash2],
];

const topArticles = [
  ['AI Breakthrough Revolutionizes...', 'Technology', '45.2K'],
  ['India Wins Thrilling Match...', 'Sports', '38.7K'],
  ['Global Leaders Meet for Climate...', 'Politics', '32.1K'],
  ['Stock Markets Reach New Highs', 'Business', '28.9K'],
  ['New Space Mission Achieves...', 'Science', '25.4K'],
];

const tagColors = {
  Technology: 'bg-neon-purple/25 text-violet-200',
  Sports: 'bg-emerald-500/25 text-emerald-200',
  Politics: 'bg-neon-blue/25 text-blue-200',
  Entertainment: 'bg-fuchsia-500/25 text-fuchsia-200',
  Business: 'bg-amber-500/25 text-amber-200',
  Science: 'bg-cyan-500/25 text-cyan-200',
};

const tabPathMap = {
  dashboard: '/admin',
  articles: '/admin/articles',
  categories: '/admin/categories',
  sources: '/admin/sources',
  users: '/admin/users',
  analytics: '/admin/analytics',
  comments: '/admin/comments',
  reports: '/admin/reports',
  moderation: '/admin/moderation',
  'ai-analytics': '/admin/ai-analytics',
  settings: '/admin/settings',
  'system-logs': '/admin/system-logs',
};

const pathTabMap = Object.entries(tabPathMap).reduce((acc, [key, path]) => {
  acc[path] = key;
  return acc;
}, {});

const Card = ({ children, className = '' }) => (
  <section className={`rounded-xl border border-white/10 bg-dark-800/80 shadow-glass-md backdrop-blur-2xl ${className}`}>
    {children}
  </section>
);

const SectionHeader = ({ title, action }) => (
  <div className="mb-4 flex items-center justify-between gap-3">
    <h2 className="text-base font-bold text-white">{title}</h2>
    {action}
  </div>
);

const ManageCategories = () => {
  const defaultCategories = [
    { id: 1, name: 'Technology', articles: 452, status: 'Active' },
    { id: 2, name: 'Sports', articles: 318, status: 'Active' },
    { id: 3, name: 'Politics', articles: 204, status: 'Review' },
    { id: 4, name: 'Business', articles: 180, status: 'Active' },
    { id: 5, name: 'Health', articles: 96, status: 'Inactive' },
  ];
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await adminAPI.listCategories();
        if (Array.isArray(response) && response.length > 0) {
          setCategories(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    setSaving(true);
    try {
      const savedCategory = await adminAPI.createCategory({
        name: newCategory.trim(),
        articles: 0,
        status: 'Active',
      });
      setCategories((prev) => {
        const exists = prev.some((category) => category.id === savedCategory.id || category.name.toLowerCase() === savedCategory.name.toLowerCase());
        return exists
          ? prev.map((category) => (
              category.id === savedCategory.id || category.name.toLowerCase() === savedCategory.name.toLowerCase()
                ? savedCategory
                : category
            ))
          : [...prev, savedCategory];
      });
      setNewCategory('');
    } catch (error) {
      console.error(error);
      setCategories((prev) => [
        ...prev,
        { id: `local-${Date.now()}`, name: newCategory.trim(), articles: 0, status: 'Active' },
      ]);
      setNewCategory('');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan">Category Operations</p>
          <h1 className="text-3xl font-black text-white">Manage Categories</h1>
          <p className="text-gray-400 mt-2">Create and review content categories for articles.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
            className="rounded-3xl border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none"
          />
          <button
            type="button"
            onClick={addCategory}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-3xl bg-gradient-neon px-5 py-3 text-sm font-semibold text-black shadow-neon-cyan hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Add Category'}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#081129]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#091730] text-xs uppercase tracking-[0.2em] text-gray-400">
            <tr>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Articles</th>
              <th className="px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-white/10 text-gray-300">
                <td className="px-4 py-4 text-white">{category.name}</td>
                <td className="px-4 py-4">{category.articles}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs ${
                    category.status === 'Active'
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : category.status === 'Review'
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'bg-red-500/15 text-red-300'
                  }`}>
                    {category.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const PlaceholderTab = ({ title, description }) => (
  <section className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
    <div className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-neon-cyan">{title}</p>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="mt-2 text-gray-400">{description}</p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-dark-800/90 p-8 text-gray-300">
        This content is rendered inside the admin dashboard without any route navigation.
      </div>
    </div>
  </section>
);

const CommentsManagement = () => {
  const defaultComments = [
    {
      id: 1,
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
      articleTitle: 'India Beats Australia by 6 Wickets in Thrilling Match',
      author: 'Marcus Lee',
      role: 'Reader',
      message: 'Great coverage. The final over analysis was especially useful.',
      time: '35m ago',
      likes: 16,
      status: 'Pending',
    },
    {
      id: 3,
      articleTitle: 'Government Announces New Digital Policy for Citizens',
      author: 'Ananya Rao',
      role: 'Subscriber',
      message: 'The policy summary is clear, but it would help to include links to the official announcement.',
      time: '48m ago',
      likes: 11,
      status: 'Pending',
    },
    {
      id: 4,
      articleTitle: 'Stock Markets Reach New Highs Amid Economic Growth',
      author: 'Daniel Kim',
      role: 'Market Analyst',
      message: 'Useful market context. The sector-wise breakdown made the story easier to understand.',
      time: '1h ago',
      likes: 31,
      status: 'Approved',
    },
    {
      id: 5,
      articleTitle: 'New Space Mission Achieves Historic Milestone',
      author: 'Meera Iyer',
      role: 'Reader',
      message: 'Loved the mission timeline. Please add more science explainers like this.',
      time: '2h ago',
      likes: 19,
      status: 'Approved',
    },
    {
      id: 6,
      articleTitle: 'Global Leaders Meet for Climate Summit',
      author: 'Chris Nolan',
      role: 'Reader',
      message: 'This comment needs fact-checking before it should be visible to everyone.',
      time: '3h ago',
      likes: 3,
      status: 'Hidden',
    },
  ];
  const [comments, setComments] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('newsphere_article_comments') || '[]');
      if (!Array.isArray(stored) || stored.length === 0) {
        return defaultComments;
      }
      const storedIds = new Set(stored.map((comment) => comment.id));
      return [...stored, ...defaultComments.filter((comment) => !storedIds.has(comment.id))];
    } catch {
      return defaultComments;
    }
  });
  const [statusFilter, setStatusFilter] = useState('All');

  const persist = (next) => {
    setComments(next);
    localStorage.setItem('newsphere_article_comments', JSON.stringify(next));
  };

  const updateStatus = (id, status) => {
    persist(comments.map((comment) => (comment.id === id ? { ...comment, status } : comment)));
  };

  const deleteComment = (id) => {
    persist(comments.filter((comment) => comment.id !== id));
  };

  const visibleComments = useMemo(
    () => comments.filter((comment) => statusFilter === 'All' || comment.status === statusFilter),
    [comments, statusFilter]
  );

  const stats = useMemo(() => ({
    total: comments.length,
    pending: comments.filter((comment) => comment.status === 'Pending').length,
    approved: comments.filter((comment) => comment.status === 'Approved').length,
    hidden: comments.filter((comment) => comment.status === 'Hidden').length,
  }), [comments]);

  return (
    <section className="glass-morphism rounded-[2rem] border border-white/10 p-6 shadow-glass-lg">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan">Comment Moderation</p>
          <h1 className="text-3xl font-black text-white">Comments</h1>
          <p className="mt-2 text-gray-400">Review reader feedback, approve helpful comments, and hide low-quality replies.</p>
        </div>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-3xl border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none"
        >
          {['All', 'Pending', 'Approved', 'Hidden'].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          ['Total', stats.total],
          ['Pending', stats.pending],
          ['Approved', stats.approved],
          ['Hidden', stats.hidden],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-dark-800/80 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-400">{label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {visibleComments.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-dark-800/80 p-8 text-center text-gray-400">No comments match this filter.</div>
        ) : (
          visibleComments.map((comment) => (
            <article key={comment.id} className="rounded-xl border border-white/10 bg-dark-800/80 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-white">{comment.author}</p>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">{comment.role || 'Reader'}</span>
                    <span className={`rounded-full px-3 py-1 text-xs ${
                      comment.status === 'Approved'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : comment.status === 'Hidden'
                        ? 'bg-red-500/15 text-red-300'
                        : 'bg-amber-500/15 text-amber-300'
                    }`}>
                      {comment.status || 'Pending'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neon-cyan">{comment.articleTitle || 'NewsSphere article'}</p>
                  <p className="mt-3 leading-relaxed text-gray-300">{comment.message}</p>
                  <p className="mt-3 text-xs text-gray-500">{comment.time} · {comment.likes || 0} likes</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button type="button" onClick={() => updateStatus(comment.id, 'Approved')} className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20" title="Approve">
                    <CheckCircle2 size={18} />
                  </button>
                  <button type="button" onClick={() => updateStatus(comment.id, 'Hidden')} className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-300 hover:bg-amber-500/20" title="Hide">
                    <XCircle size={18} />
                  </button>
                  <button type="button" onClick={() => deleteComment(comment.id)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neon-pink/10 text-neon-pink hover:bg-neon-pink/20" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

const fallbackReportArticles = articles.map(([title, category, author, status, views], index) => ({
  id: `report-${index}`,
  title,
  category,
  author,
  status,
  views: Number(String(views).replace(/[^\d.]/g, '')) * (String(views).includes('K') ? 1000 : 1),
  shares: 240 - index * 24,
  likes: 860 - index * 70,
  createdAt: `2026-05-${21 - index}T09:30:00`,
  summary: `${category} coverage is gaining reader attention across NewsSphere AI.`,
}));

const formatNumber = (value) => Number(value || 0).toLocaleString('en-IN');

const formatDate = (value) => {
  if (!value) return 'Recently';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Recently';
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const ReportsPanel = () => {
  const [reportArticles, setReportArticles] = useState(fallbackReportArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      setLoading(true);
      try {
        const response = await adminAPI.listArticles();
        const nextArticles = Array.isArray(response) ? response : response?.articles;
        if (Array.isArray(nextArticles) && nextArticles.length > 0) {
          setReportArticles(nextArticles);
        }
      } catch (error) {
        console.error(error);
        setReportArticles(fallbackReportArticles);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  const latestNews = useMemo(() => (
    [...reportArticles]
      .sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0))
      .slice(0, 6)
  ), [reportArticles]);

  const reportStats = useMemo(() => {
    const totalViews = reportArticles.reduce((sum, article) => sum + Number(article.views || 0), 0);
    const totalShares = reportArticles.reduce((sum, article) => sum + Number(article.shares || 0), 0);
    const published = reportArticles.filter((article) => (article.status || '').toLowerCase() === 'published').length;
    const trending = reportArticles.filter((article) => article.trending || article.featured || Number(article.popularityScore || 0) >= 80).length;

    return [
      { label: 'Latest Articles', value: reportArticles.length, icon: FileText },
      { label: 'Published', value: published || reportArticles.length, icon: CheckCircle2 },
      { label: 'Total Views', value: formatNumber(totalViews), icon: Eye },
      { label: 'Shares', value: formatNumber(totalShares), icon: Radio },
      { label: 'Trending Signals', value: trending || latestNews.length, icon: Activity },
    ];
  }, [latestNews.length, reportArticles]);

  const categoryReport = useMemo(() => {
    const totals = reportArticles.reduce((acc, article) => {
      const category = article.category || 'General';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(totals)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [reportArticles]);

  const exportLatestReport = () => {
    const rows = [
      ['Title', 'Category', 'Author', 'Status', 'Views', 'Published On'],
      ...latestNews.map((article) => [
        article.title || 'Untitled',
        article.category || 'General',
        article.author || 'NewsSphere Desk',
        article.status || 'Published',
        article.views || 0,
        formatDate(article.createdAt || article.updatedAt),
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'newsphere-latest-news-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="glass-morphism rounded-[2rem] border border-white/10 p-6 shadow-glass-lg">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan">Reports</p>
          <h1 className="text-3xl font-black text-white">Latest News Reports</h1>
          <p className="mt-2 text-gray-400">
            Generated from the newest articles available in the admin news feed.
          </p>
        </div>
        <button
          type="button"
          onClick={exportLatestReport}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-200 hover:bg-white/10"
        >
          <Download size={16} /> Export Latest Report
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {reportStats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-dark-800/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">{label}</p>
              <Icon size={18} className="text-neon-cyan" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-white/10 bg-dark-800/80 p-5">
          <SectionHeader title="Latest News Summary" action={<span className="text-xs text-gray-400">{loading ? 'Refreshing' : 'Updated now'}</span>} />
          <div className="space-y-3">
            {latestNews.map((article) => (
              <article key={article.id || article.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-md px-2 py-1 text-xs ${tagColors[article.category] || 'bg-white/10 text-gray-200'}`}>
                        {article.category || 'General'}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(article.createdAt || article.updatedAt)}</span>
                    </div>
                    <h2 className="mt-2 text-base font-semibold text-white">{article.title || 'Untitled article'}</h2>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                      {article.summary || article.content || 'No summary available yet.'}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-3 text-xs text-gray-300">
                    <span className="inline-flex items-center gap-1"><Eye size={14} /> {formatNumber(article.views)}</span>
                    <span className="inline-flex items-center gap-1"><Radio size={14} /> {formatNumber(article.shares)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-dark-800/80 p-5">
          <SectionHeader title="Category Report" />
          <div className="space-y-4">
            {categoryReport.map((category) => {
              const percentage = Math.round((category.count / Math.max(reportArticles.length, 1)) * 100);
              return (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-300">{category.name}</span>
                    <span className="text-white">{percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-neon" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const AnalyticsPanel = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await adminAPI.getDashboard();
        setSummary(response);
      } catch (error) {
        console.error(error);
      }
    };

    loadAnalytics();
  }, []);

  const trafficData = summary?.dailyTrafficAnalytics || weekData.map((item) => ({
    label: item.day.replace('May ', 'May '),
    value: item.views,
  }));

  const categoryData = summary?.trendingCategories?.length
    ? summary.trendingCategories.map((item, index) => ({
        name: item.category || 'General',
        value: item.count || 0,
        color: categories[index % categories.length].color,
      }))
    : categories.slice(0, 6);

  const sentiment = summary?.aiSentimentStats || { positive: 62, neutral: 24, negative: 14 };
  const sentimentData = [
    { name: 'Positive', value: sentiment.positive || 0, color: '#14b8a6' },
    { name: 'Neutral', value: sentiment.neutral || 0, color: '#00d4ff' },
    { name: 'Negative', value: sentiment.negative || 0, color: '#ff006e' },
  ];

  const topNews = summary?.mostViewedNews?.length
    ? summary.mostViewedNews
    : topArticles.map(([title, category, views], index) => ({
        id: index,
        title,
        category,
        views: Number(String(views).replace(/[^\d.]/g, '')) * (String(views).includes('K') ? 1000 : 1),
      }));

  const analyticsCards = [
    { label: 'Total Users', value: formatNumber(summary?.totalUsers || 25430), icon: User },
    { label: 'Active Users', value: formatNumber(summary?.activeUsers || 21340), icon: Wifi },
    { label: 'Articles', value: formatNumber(summary?.totalArticles || 12458), icon: FileText },
    { label: 'Searches', value: formatNumber(summary?.totalSearches || 84600), icon: Search },
  ];

  return (
    <section className="glass-morphism rounded-[2rem] border border-white/10 p-6 shadow-glass-lg">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan">Analytics</p>
        <h1 className="text-3xl font-black text-white">Dashboard Analytics</h1>
        <p className="mt-2 text-gray-400">Traffic, engagement, source categories, and AI sentiment performance.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-dark-800/80 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">{label}</p>
              <Icon size={18} className="text-neon-cyan" />
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5">
          <SectionHeader title="Traffic Trend" action={<span className="text-xs text-gray-400">Latest activity</span>} />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="analyticsTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f2745" vertical={false} />
                <XAxis dataKey="label" stroke="#8b93a7" tick={{ fontSize: 11 }} />
                <YAxis stroke="#8b93a7" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid rgba(255,255,255,0.12)' }} />
                <Area type="monotone" dataKey="value" stroke="#00d4ff" fill="url(#analyticsTraffic)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader title="AI Sentiment" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={100} paddingAngle={2}>
                  {sentimentData.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid rgba(255,255,255,0.12)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {sentimentData.map((item) => (
              <div key={item.name} className="rounded-lg bg-white/5 p-3 text-center">
                <p className="text-xs text-gray-400">{item.name}</p>
                <p className="mt-1 text-lg font-bold text-white">{item.value}%</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-5">
          <SectionHeader title="Category Reach" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" stroke="#8b93a7" tick={{ fontSize: 11 }} />
                <YAxis stroke="#8b93a7" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid rgba(255,255,255,0.12)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {categoryData.map((item) => <Cell key={item.name} fill={item.color || '#00d4ff'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader title="Most Viewed News" />
          <div className="space-y-3">
            {topNews.slice(0, 5).map((article, index) => (
              <div key={article.id || article.title} className="grid grid-cols-[36px_1fr_90px] items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-neon text-sm font-bold text-black">{index + 1}</div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{article.title}</p>
                  <p className="text-xs text-neon-cyan">{article.category || 'General'}</p>
                </div>
                <p className="text-right text-sm text-gray-300">{formatNumber(article.views)} views</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    setActiveTab(pathTabMap[location.pathname] || 'dashboard');
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tabPathMap[tab] || '/admin');
  };

  const exportReport = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Total Articles', '12458'],
      ['Total Users', '25430'],
      ['Total Views', '1.28M'],
      ['Avg Read Time', '3m 42s'],
      ['Active Now', '1324'],
    ];
    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'newsphere-admin-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-dark-900 text-white">
      <div className="fixed inset-y-0 left-0 z-40 hidden w-72 xl:block">
        <AdminNav layout="sidebar" activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="absolute bottom-4 left-4 right-4 space-y-3">
          <Card className="p-4">
            <p className="text-sm font-semibold text-fuchsia-200">AI Recommendation Engine</p>
            <div className="my-4 flex h-24 items-center justify-center rounded-lg border border-neon-purple/30 bg-neon-purple/10">
              <div className="rounded-full border border-neon-purple/60 px-5 py-3 text-sm font-bold text-neon-purple">AI</div>
            </div>
            <p className="text-xs text-gray-400">Delivering personalized news</p>
            <p className="mt-2 text-3xl font-black">98.7%</p>
          </Card>
          <Card className="p-4">
            <p className="mb-4 text-sm font-bold text-white">System Status</p>
            {['Backend Server', 'Database', 'AI Engine', 'Search Engine'].map((item) => (
              <div key={item} className="mb-3 flex items-center justify-between text-xs last:mb-0">
                <span className="text-gray-300">{item}</span>
                <span className="flex items-center gap-2 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Operational
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div className="xl:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-dark-900/90 px-4 py-4 backdrop-blur-2xl md:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 xl:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-neon text-sm font-black">NS</div>
              <p className="text-xl font-bold">NewsSphere <span className="text-neon-cyan">AI</span></p>
            </div>
            <div className="hidden items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 lg:flex lg:w-[420px]">
              <Search size={18} className="text-gray-400" />
              <input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500" placeholder="Search news, articles, users..." />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-lg border border-white/10 bg-white/5 p-3 text-gray-200"><Bell size={18} /></button>
              <button className="rounded-lg border border-white/10 bg-white/5 p-3 text-gray-200"><MessageSquare size={18} /></button>
              <button
                onClick={() => {
                  logout();
                  navigate('/login', { replace: true });
                }}
                className="rounded-lg border border-neon-pink/30 bg-neon-pink/10 p-3 text-neon-pink"
              >
                <LogOut size={18} />
              </button>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="h-10 w-10 rounded-full bg-gradient-neon" />
                <div>
                  <p className="text-sm font-bold">Admin</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="space-y-4 px-4 py-6 md:px-8">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
                  <p className="mt-1 text-sm text-gray-400">Here is what is happening with NewsSphere AI today.</p>
                </div>
                <div className="flex flex-wrap gap-3">
              <button onClick={exportReport} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-200">
                <Download size={16} /> Export Report
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              const spark = metric.data.map((value, index) => ({ index, value }));

              return (
                <Card key={metric.label} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${metric.color} shadow-glass-sm`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs text-emerald-400">{metric.change} vs last 7 days</p>
                    </div>
                  </div>
                  <div className="mt-3 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={spark}>
                        <Line type="monotone" dataKey="value" stroke="#b833ff" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_240px]">
            <div className="space-y-4">
              <div className="grid gap-4 xl:grid-cols-[1.15fr_0.9fr_1fr]">
                <Card className="p-4">
                  <SectionHeader title="Article Views Overview" action={<span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300">Last 7 Days</span>} />
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weekData}>
                        <defs>
                          <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#b833ff" stopOpacity={0.45} />
                            <stop offset="95%" stopColor="#b833ff" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#1f2745" vertical={false} />
                        <XAxis dataKey="day" stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid rgba(255,255,255,0.12)' }} />
                        <Area type="monotone" dataKey="views" stroke="#b833ff" fill="url(#views)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-4">
                  <SectionHeader title="Category Wise Traffic" />
                  <div className="grid gap-4 md:grid-cols-[1fr_130px]">
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={categories} dataKey="value" innerRadius={48} outerRadius={88} paddingAngle={1}>
                            {categories.map((item) => <Cell key={item.name} fill={item.color} />)}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 self-center">
                      {categories.map((item) => (
                        <div key={item.name} className="flex items-center justify-between gap-2 text-xs">
                          <span className="flex items-center gap-2 text-gray-300"><span className="h-2 w-2 rounded-full" style={{ background: item.color }} />{item.name}</span>
                          <span className="text-gray-300">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <SectionHeader title="User Engagement" action={<span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300">Last 7 Days</span>} />
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weekData}>
                        <CartesianGrid stroke="#1f2745" vertical={false} />
                        <XAxis dataKey="day" stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid rgba(255,255,255,0.12)' }} />
                        <Line type="monotone" dataKey="views" stroke="#b833ff" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="sessions" stroke="#00d4ff" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="users" stroke="#14b8a6" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              <div className="grid gap-4 xl:grid-cols-[0.9fr_0.95fr_1fr]">
                <Card className="p-4">
                  <SectionHeader title="Source Credibility Score" />
                  <div className="space-y-3">
                    {sourceScores.map(([name, score]) => (
                      <div key={name} className="grid grid-cols-[90px_1fr_44px] items-center gap-3 text-xs">
                        <span className="text-gray-300">{name}</span>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-neon" style={{ width: `${score}%` }} />
                        </div>
                        <span className="text-right text-gray-200">{score}/100</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <SectionHeader title="Trending Topics" />
                  <div className="flex flex-wrap gap-3">
                    {topics.map(([topic, size]) => (
                      <span
                        key={topic}
                        className={`rounded-lg bg-white/5 px-3 py-2 font-semibold ${
                          size === 'xl' ? 'text-2xl text-neon-cyan' : size === 'lg' ? 'text-xl text-fuchsia-300' : 'text-xs text-gray-300'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <SectionHeader title="Daily Active Users" action={<span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300">Last 7 Days</span>} />
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activeUsers}>
                        <defs>
                          <linearGradient id="bars" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff4bd8" />
                            <stop offset="100%" stopColor="#00a3ff" />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid rgba(255,255,255,0.12)' }} />
                        <Bar dataKey="users" fill="url(#bars)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              <Card className="overflow-hidden p-4">
                <SectionHeader title="Recent Articles" />
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="text-xs text-gray-400">
                      <tr>
                        <th className="px-3 py-3 font-medium">Title</th>
                        <th className="px-3 py-3 font-medium">Category</th>
                        <th className="px-3 py-3 font-medium">Author</th>
                        <th className="px-3 py-3 font-medium">Status</th>
                        <th className="px-3 py-3 font-medium">Views</th>
                        <th className="px-3 py-3 font-medium">Published On</th>
                        <th className="px-3 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map(([title, category, author, status, views]) => (
                        <tr key={title} className="border-t border-white/5 text-gray-300">
                          <td className="max-w-[360px] px-3 py-4 text-white">{title}</td>
                          <td className="px-3 py-4"><span className={`rounded-md px-2 py-1 text-xs ${tagColors[category]}`}>{category}</span></td>
                          <td className="px-3 py-4">{author}</td>
                          <td className="px-3 py-4"><span className="rounded-md bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">{status}</span></td>
                          <td className="px-3 py-4">{views}</td>
                          <td className="px-3 py-4">May 21, 2026</td>
                          <td className="px-3 py-4">
                            <div className="flex gap-3 text-gray-300">
                              <Eye size={16} />
                              <Edit3 size={16} />
                              <Trash2 size={16} className="text-neon-pink" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <aside className="space-y-4">
              <Card className="p-4">
                <SectionHeader title="Real-time Activity" action={<span className="flex items-center gap-2 text-xs text-neon-pink"><span className="h-2 w-2 rounded-full bg-neon-pink" />Live</span>} />
                <div className="space-y-4">
                  {activity.map(([event, time, Icon]) => (
                    <div key={event} className="flex items-center justify-between gap-3 text-xs">
                      <span className="flex items-center gap-3 text-gray-200"><Icon size={16} className="text-gray-300" />{event}</span>
                      <span className="text-gray-500">{time}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-5 w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm text-blue-300">View All Activity</button>
              </Card>

              <Card className="p-4">
                <SectionHeader title="Top Performing Articles" />
                <div className="space-y-3">
                  {topArticles.map(([title, category, views], index) => (
                    <div key={title} className="flex items-center gap-3">
                      <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple text-xs font-bold">{index + 1}</div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-white">{title}</p>
                        <p className="text-xs text-neon-cyan">{category}</p>
                      </div>
                      <span className="text-xs text-gray-300">{views}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-5 w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm text-blue-300">View All Articles</button>
              </Card>

              <Card className="p-4">
                <SectionHeader title="AI Search Analytics" />
                <div className="grid gap-4 md:grid-cols-[1fr_120px] 2xl:grid-cols-1">
                  <div className="flex h-36 items-center justify-center rounded-lg border border-neon-blue/20 bg-[radial-gradient(circle,_rgba(0,212,255,0.22),_transparent_60%)]">
                    <Activity size={64} className="text-neon-cyan" />
                  </div>
                  <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-3">
                    {[
                      ['Articles', 18, '#6366f1'],
                      ['Comments', 10, '#b833ff'],
                      ['Users', 4, '#f59e0b'],
                    ].map(([label, value, color]) => (
                      <div key={label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-300"><span className="h-3 w-3 rounded" style={{ background: color }} />{label}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="mt-5 w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm text-blue-300">View Full Analytics</button>
              </Card>
            </aside>
          </div>
        </>
      )}
        {activeTab === 'articles' && (
          <ArticleManagement showNav={false} />
        )}
        {activeTab === 'sources' && (
          <AdminSources showNav={false} />
        )}
        {activeTab === 'users' && (
          <UserManagement showNav={false} />
        )}
        {activeTab === 'categories' && (
          <ManageCategories />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsPanel />
        )}
        {activeTab === 'comments' && (
          <CommentsManagement />
        )}
        {activeTab === 'reports' && (
          <ReportsPanel />
        )}
        {activeTab === 'moderation' && (
          <PlaceholderTab title="Content Moderation" description="Handle moderation tasks without leaving the dashboard." />
        )}
        {activeTab === 'ai-analytics' && (
          <PlaceholderTab title="AI Search Analytics" description="AI Search analytics inside the dashboard." />
        )}
        {activeTab === 'settings' && (
          <PlaceholderTab title="Settings" description="Admin settings and platform controls." />
        )}
        {activeTab === 'system-logs' && (
          <PlaceholderTab title="System Logs" description="System logs and diagnostics shown here." />
        )}
      </main>
    </div>
    </motion.div>
  );
};

export default AdminDashboard;
