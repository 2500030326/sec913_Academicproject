import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, Sparkles, Radio, BookOpen, Eye, MessageCircle, Star, Search, Filter, CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import { adminAPI, articlesAPI } from '../utils/api';

const STORAGE_KEY = 'newsphere_admin_articles';

const initialForm = {
  title: '',
  author: '',
  category: '',
  status: 'PUBLISHED',
  tags: '',
  imageUrl: '',
  summary: '',
  content: '',
  breaking: false,
  trending: false,
  featured: false,
  views: 0,
  likes: 0,
  aiScore: 85,
  sentiment: 'Positive',
};

const statusOptions = ['All', 'PUBLISHED', 'DRAFT', 'SCHEDULED', 'REVIEW'];

const sampleArticles = [
  {
    id: -1,
    title: 'AI Breakthrough Revolutionizes News Delivery',
    author: 'NewsSphere AI',
    category: 'Technology',
    status: 'PUBLISHED',
    tags: 'AI,News,Tech',
    imageUrl: '',
    summary: 'A new AI engine helps curate the most relevant news for each reader.',
    content: 'This sample article is shown when the database has no articles.',
    breaking: true,
    trending: true,
    featured: false,
    views: 1423,
    popularityScore: 85,
    createdAt: new Date().toISOString(),
  },
  {
    id: -2,
    title: 'Draft Editorial Workflow Simplified',
    author: 'Admin Team',
    category: 'Business',
    status: 'DRAFT',
    tags: 'Draft,Workflow',
    imageUrl: '',
    summary: 'A sample draft article to seed the admin table when no database data exists.',
    content: 'Draft content placeholder for the article management view.',
    breaking: false,
    trending: false,
    featured: false,
    views: 0,
    popularityScore: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: -3,
    title: 'Scheduled Release: NewsSphere UI Upgrade',
    author: 'Product Team',
    category: 'Updates',
    status: 'SCHEDULED',
    tags: 'Release,Scheduled',
    imageUrl: '',
    summary: 'A preview of an upcoming release scheduled in the article database.',
    content: 'This sample scheduled article is part of the seed data.',
    breaking: false,
    trending: false,
    featured: false,
    views: 0,
    popularityScore: 19,
    createdAt: new Date().toISOString(),
  },
];

const loadStoredArticles = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const saveStoredArticles = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const ArticleManagement = ({ showNav = true }) => {
  const [articles, setArticles] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOption, setSortOption] = useState('latest');
  const [noteArticle, setNoteArticle] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    setFetchError('');
    setMessage('');
    try {
      const response = await adminAPI.listArticles().catch(() => articlesAPI.getAll());
      console.log('Articles API response:', response);
      if (Array.isArray(response) && response.length > 0) {
        setArticles(response);
        saveStoredArticles(response);
      } else {
        const storedArticles = loadStoredArticles();
        setArticles(storedArticles.length > 0 ? storedArticles : sampleArticles);
        setMessage('No articles found in database. Displaying sample seed data.');
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
      const storedArticles = loadStoredArticles();
      setArticles(storedArticles.length > 0 ? storedArticles : sampleArticles);
      setMessage('Backend is offline. You can continue managing articles locally, and backend data will load when the API is available.');
    } finally {
      setLoading(false);
    }
  };

  const selectArticle = (article) => {
    setSelected(article);
    setForm({
      title: article.title || '',
      author: article.author || '',
      category: article.category || '',
      status: article.status || 'PUBLISHED',
      tags: article.tags || '',
      imageUrl: article.imageUrl || '',
      summary: article.summary || '',
      content: article.content || '',
      breaking: article.breaking || false,
      trending: article.trending || false,
      featured: article.featured || false,
      views: article.views || 0,
      likes: article.likes || 0,
      aiScore: article.aiScore || 85,
      sentiment: article.sentiment || 'Positive',
    });
    setEditing(true);
    setMessage('');
  };

  const saveArticle = async (finalStatus) => {
    if (!form.title.trim() || !form.author.trim() || !form.category.trim() || !form.content.trim()) {
      setMessage('Title, author, category, and content are required.');
      return;
    }
    setSaving(true);
    setMessage('');

    try {
      const payload = {
        title: form.title,
        author: form.author,
        category: form.category,
        status: finalStatus,
        tags: form.tags,
        imageUrl: form.imageUrl,
        summary: form.summary,
        content: form.content,
        breaking: form.breaking,
        trending: form.trending,
        featured: form.featured,
        views: form.views || 0,
        likes: form.likes || 0,
        aiScore: form.aiScore || 85,
        sentiment: form.sentiment || 'Positive',
      };
      if (editing && selected) {
        const updated = selected.id > 0
          ? await articlesAPI.updateArticle(selected.id, payload).catch(() => ({ ...selected, ...payload, updatedAt: new Date().toISOString() }))
          : { ...selected, ...payload, updatedAt: new Date().toISOString() };
        setArticles((prev) => {
          const next = prev.map((item) => (item.id === updated.id ? updated : item));
          saveStoredArticles(next);
          return next;
        });
        setMessage('Article updated successfully.');
      } else {
        const created = await articlesAPI.createArticle(payload).catch(() => ({
          ...payload,
          id: Date.now(),
          popularityScore: payload.aiScore,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
        setArticles((prev) => {
          const next = [created, ...prev.filter((item) => item.id > 0)];
          saveStoredArticles(next);
          return next;
        });
        setMessage('Article created successfully.');
      }
      setSelected(null);
      setForm(initialForm);
      setEditing(false);
    } catch (error) {
      console.error(error.response || error);
      setMessage('Could not save article.');
    } finally {
      setSaving(false);
    }
  };

  const publishArticle = async (e) => {
    e.preventDefault();
    await saveArticle('PUBLISHED');
  };

  const saveDraft = async () => {
    await saveArticle('DRAFT');
  };

  const scheduleArticle = async () => {
    await saveArticle('SCHEDULED');
  };

  const removeArticle = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return;
    try {
      if (id > 0) {
        await articlesAPI.deleteArticle(id).catch(() => undefined);
      }
      setArticles((prev) => {
        const next = prev.filter((article) => article.id !== id);
        saveStoredArticles(next);
        return next;
      });
      if (selected?.id === id) {
        setSelected(null);
        setForm(initialForm);
        setEditing(false);
      }
    } catch (error) {
      console.error(error.response || error);
      setMessage('Failed to delete the article.');
    }
  };

  const startNewArticle = () => {
    setSelected(null);
    setEditing(false);
    setForm(initialForm);
    setMessage('');
    setNoteArticle(null);
  };

  const quickEdit = (article) => {
    selectArticle(article);
  };

  const quickView = (article) => {
    navigate(`/article/${article.id}`);
  };

  const toggleFeatured = async (article) => {
    try {
      const optimistic = { ...article, featured: !article.featured, updatedAt: new Date().toISOString() };
      const updated = article.id > 0
        ? await articlesAPI.updateArticle(article.id, optimistic).catch(() => optimistic)
        : optimistic;
      setArticles((prev) => {
        const next = prev.map((item) => (item.id === updated.id ? updated : item));
        saveStoredArticles(next);
        return next;
      });
      if (selected?.id === updated.id) {
        setSelected(updated);
        setForm((prev) => ({ ...prev, featured: updated.featured }));
      }
    } catch (error) {
      console.error(error.response || error);
    }
  };

  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => {
        const query = searchText.toLowerCase();
        const matchesSearch =
          article.title?.toLowerCase().includes(query) ||
          article.author?.toLowerCase().includes(query) ||
          article.category?.toLowerCase().includes(query);
        const matchesStatus = statusFilter === 'All' || article.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOption === 'latest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        if (sortOption === 'views') return (b.views || 0) - (a.views || 0);
        if (sortOption === 'score') return (b.popularityScore || 0) - (a.popularityScore || 0);
        return 0;
      });
  }, [articles, searchText, statusFilter, categoryFilter, sortOption]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category).filter(Boolean)));
    return ['All', ...unique];
  }, [articles]);

  const stats = useMemo(() => ({
    total: articles.length,
    published: articles.filter((article) => article.status === 'PUBLISHED').length,
    drafts: articles.filter((article) => article.status === 'DRAFT').length,
    scheduled: articles.filter((article) => article.status === 'SCHEDULED').length,
  }), [articles]);

  const articleSentiment = (article) => {
    if (article.trending) return 'Positive';
    if (article.breaking) return 'Neutral';
    return 'Neutral';
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full px-4 md:px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto">
        {showNav && <AdminNav />}

        <section className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h1 className="text-4xl font-black text-white">Manage Articles</h1>
              <p className="text-gray-400 mt-2">Create, edit, and manage all news articles with AI-powered insights.</p>
            </div>
            <button onClick={startNewArticle} className="inline-flex items-center gap-3 rounded-3xl bg-gradient-neon px-6 py-3 text-sm font-semibold text-black shadow-neon-cyan transition-all hover:opacity-90">
              <Plus size={18} /> Create New Article
            </button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-[2rem] bg-dark-900/80 p-6 border border-white/10 shadow-glass-md">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Total Articles</p>
              <p className="text-3xl font-bold text-white mt-4">{stats.total}</p>
              <p className="text-sm text-emerald-400 mt-2">+12.5% vs last 7 days</p>
            </div>
            <div className="rounded-[2rem] bg-dark-900/80 p-6 border border-white/10 shadow-glass-md">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Published</p>
              <p className="text-3xl font-bold text-white mt-4">{stats.published}</p>
              <p className="text-sm text-teal-400 mt-2">+10.2% vs last 7 days</p>
            </div>
            <div className="rounded-[2rem] bg-dark-900/80 p-6 border border-white/10 shadow-glass-md">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Drafts</p>
              <p className="text-3xl font-bold text-white mt-4">{stats.drafts}</p>
              <p className="text-sm text-pink-400 mt-2">-3.4% vs last 7 days</p>
            </div>
            <div className="rounded-[2rem] bg-dark-900/80 p-6 border border-white/10 shadow-glass-md">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Scheduled</p>
              <p className="text-3xl font-bold text-white mt-4">{stats.scheduled}</p>
              <p className="text-sm text-green-400 mt-2">+6.8% vs last 7 days</p>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <section className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search articles by title, author, category..."
                    className="w-full rounded-full border border-white/10 bg-dark-800/90 px-12 py-3 text-white outline-none"
                  />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-full border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none">
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-full border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                <Filter size={16} /> Sort by
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-transparent text-white outline-none">
                  <option value="latest">Latest</option>
                  <option value="views">Most Views</option>
                  <option value="score">AI Score</option>
                </select>
              </div>
            </div>

            {fetchError && (
              <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-sm text-red-100">
                {fetchError}
              </div>
            )}
            <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-dark-900/80 shadow-glass-md">
              <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_0.8fr_2fr] gap-4 border-b border-white/10 bg-[#091730] px-6 py-4 text-xs uppercase tracking-[0.3em] text-gray-400">
                <span>Article</span>
                <span>Category</span>
                <span>Status</span>
                <span>Views</span>
                <span>AI</span>
                <span className="text-right">Actions</span>
              </div>
              {loading ? (
                <div className="px-6 py-10 text-center text-gray-400">Loading articles...</div>
              ) : filteredArticles.length === 0 ? (
                <div className="px-6 py-10 text-center text-gray-400">No matching articles found.</div>
              ) : (
                filteredArticles.map((article) => (
                  <div key={article.id} className="grid grid-cols-[2.5fr_1fr_1fr_1fr_0.8fr_2fr] gap-4 border-b border-white/10 px-6 py-5 text-sm text-gray-300 items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-3xl bg-white/5 flex items-center justify-center text-neon-cyan font-bold">{article.title?.split(' ').slice(0,2).map((word) => word[0]).join('')}</div>
                        <div>
                          <p className="font-semibold text-white truncate">{article.title}</p>
                          <p className="text-xs text-gray-500 truncate">{article.tags || 'No tags'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">{article.category || 'General'}</div>
                    <div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${article.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-300' : article.status === 'DRAFT' ? 'bg-slate-500/15 text-slate-200' : 'bg-amber-500/10 text-amber-300'}`}>
                        {article.status}
                      </span>
                    </div>
                    <div>{article.views?.toLocaleString() || '0'}</div>
                    <div>
                      <span className="inline-flex rounded-full bg-white/5 px-2 py-1 text-xs text-teal-300">{article.popularityScore || 0}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => quickView(article)} className="group relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-gray-200 hover:bg-white/10 transition-all">
                        <Eye size={16} />
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/90 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          View
                        </span>
                      </button>
                      <button type="button" onClick={() => setNoteArticle(article)} className="group relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-gray-200 hover:bg-white/10 transition-all">
                        <MessageCircle size={16} />
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/90 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          Notes
                        </span>
                      </button>
                      <button type="button" onClick={() => toggleFeatured(article)} className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-2xl ${article.featured ? 'bg-neon-cyan/15 text-neon-cyan' : 'bg-white/5 text-gray-200 hover:bg-white/10'} transition-all`}>
                        <Star size={16} />
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/90 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          {article.featured ? 'Unfeature' : 'Feature'}
                        </span>
                      </button>
                      <button type="button" onClick={() => quickEdit(article)} className="group relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-gray-200 hover:bg-white/10 transition-all">
                        <Edit3 size={16} />
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/90 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          Edit
                        </span>
                      </button>
                      <button type="button" onClick={() => removeArticle(article.id)} className="group relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neon-pink/10 text-neon-pink hover:bg-neon-pink/20 transition-all">
                        <Trash2 size={16} />
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/90 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-neon-cyan">Article Editor</p>
                <h2 className="text-2xl font-bold text-white">Edit or publish article</h2>
              </div>
              <span className="rounded-full bg-neon-cyan/10 px-3 py-2 text-xs font-semibold text-neon-cyan">Live AI</span>
            </div>

            <form className="space-y-4" onSubmit={publishArticle}>
              <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Title" className="w-full rounded-3xl border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none" />
              <input value={form.author} onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))} placeholder="Author" className="w-full rounded-3xl border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none" />
              <div className="grid gap-4 md:grid-cols-2">
                <input value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} placeholder="Category" className="w-full rounded-3xl border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none" />
                <input value={form.tags} onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))} placeholder="Tags" className="w-full rounded-3xl border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none" />
              </div>
              <textarea value={form.summary} onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))} rows={4} placeholder="AI Generated Summary" className="w-full rounded-3xl border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none"></textarea>
              <textarea value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} rows={6} placeholder="Article body" className="w-full rounded-3xl border border-white/10 bg-dark-800/90 px-4 py-3 text-white outline-none"></textarea>

              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={saveDraft} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-200 hover:bg-white/10 transition-all disabled:opacity-60">
                  Save Draft
                </button>
                <button type="button" onClick={scheduleArticle} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-200 hover:bg-white/10 transition-all disabled:opacity-60">
                  <CalendarClock size={16} /> Schedule
                </button>
              </div>

              <button disabled={saving} className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-neon px-5 py-3 text-sm font-semibold text-black transition-all disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? 'Saving...' : editing ? 'Update Article' : 'Publish Article'}
              </button>
            </form>

            {noteArticle && (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#071127] p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-white">Notes - {noteArticle.title}</h3>
                  <button type="button" onClick={() => setNoteArticle(null)} className="text-gray-400 hover:text-white">Close</button>
                </div>
                <p className="text-sm text-gray-300 mb-3">{noteArticle.summary || 'No note summary available. Edit the article and add a summary to save note details.'}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Author</p>
                    <p className="mt-2 text-white">{noteArticle.author}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Sentiment</p>
                    <p className="mt-2 text-white">{articleSentiment(noteArticle)}</p>
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div className="mt-6 rounded-3xl border border-white/10 bg-neon-cyan/5 p-4 text-sm text-neon-cyan">{message}</div>
            )}
          </aside>
        </div>
      </div>
    </motion.main>
  );
};

export default ArticleManagement;
