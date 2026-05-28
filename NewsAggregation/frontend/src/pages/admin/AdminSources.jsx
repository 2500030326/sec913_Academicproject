import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ExternalLink, Globe, Loader2, Newspaper, Plus, Trash2 } from 'lucide-react';
import AdminNav from '../../components/AdminNav';
import { adminAPI } from '../../utils/api';

const sampleSources = [
  {
    id: 'bbc-news',
    name: 'BBC News',
    categories: 'World, Politics, Culture',
    score: 96,
    status: 'Active',
    url: 'https://www.bbc.com/news',
    articles: [
      { id: 'bbc-1', title: 'Global leaders discuss new climate finance plan', category: 'World', readTime: '6 min read' },
      { id: 'bbc-2', title: 'Inside the technology reshaping public services', category: 'Technology', readTime: '5 min read' },
      { id: 'bbc-3', title: 'Culture report: Cities invest in creative districts', category: 'Culture', readTime: '4 min read' },
    ],
  },
  {
    id: 'reuters',
    name: 'Reuters',
    categories: 'Business, Markets, Tech',
    score: 94,
    status: 'Active',
    url: 'https://www.reuters.com',
    articles: [
      { id: 'reuters-1', title: 'Markets steady as investors watch central bank signals', category: 'Business', readTime: '5 min read' },
      { id: 'reuters-2', title: 'Chip stocks climb on stronger AI infrastructure demand', category: 'Technology', readTime: '4 min read' },
      { id: 'reuters-3', title: 'Oil prices edge higher after supply outlook update', category: 'Markets', readTime: '3 min read' },
    ],
  },
  {
    id: 'the-hindu',
    name: 'The Hindu',
    categories: 'Politics, Education, Culture',
    score: 92,
    status: 'Active',
    url: 'https://www.thehindu.com',
    articles: [
      { id: 'hindu-1', title: 'Education policy review focuses on digital classrooms', category: 'Education', readTime: '6 min read' },
      { id: 'hindu-2', title: 'Parliament debate highlights data protection priorities', category: 'Politics', readTime: '5 min read' },
      { id: 'hindu-3', title: 'Festival calendar brings regional arts into focus', category: 'Culture', readTime: '4 min read' },
    ],
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    categories: 'AI, Startups, Gadgets',
    score: 95,
    status: 'Active',
    url: 'https://techcrunch.com',
    articles: [
      { id: 'tc-1', title: 'New AI startup launches tools for newsroom automation', category: 'AI', readTime: '5 min read' },
      { id: 'tc-2', title: 'Founders shift toward profitable growth in 2026', category: 'Startups', readTime: '4 min read' },
      { id: 'tc-3', title: 'Wearable device makers add stronger health signals', category: 'Gadgets', readTime: '3 min read' },
    ],
  },
  {
    id: 'al-jazeera',
    name: 'Al Jazeera',
    categories: 'World, Security, Environment',
    score: 94,
    status: 'Review',
    url: 'https://www.aljazeera.com',
    articles: [
      { id: 'aj-1', title: 'Regional talks continue amid renewed ceasefire push', category: 'World', readTime: '6 min read' },
      { id: 'aj-2', title: 'Water security report warns of pressure on major cities', category: 'Environment', readTime: '5 min read' },
      { id: 'aj-3', title: 'Analysts track shifting security alliances', category: 'Security', readTime: '4 min read' },
    ],
  },
];

const normalizeSource = (source) => ({
  ...source,
  articles: Array.isArray(source.articles) ? source.articles : [],
});

const AdminSources = ({ showNav = true }) => {
  const [sources, setSources] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newSource, setNewSource] = useState({
    name: '',
    categories: '',
    score: 90,
    status: 'Active',
  });

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminAPI.listSources();
      const backendSources = Array.isArray(data) ? data.map(normalizeSource) : [];
      setSources(backendSources.length > 0 ? backendSources : sampleSources);
    } catch (err) {
      setSources(sampleSources);
      setError('Backend is offline. Showing trusted source articles locally.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSource = async () => {
    if (!newSource.name.trim() || !newSource.categories.trim()) {
      setError('Name and categories are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = { ...newSource, url: '', articles: [] };
      const created = await adminAPI.createSource(payload).catch(() => ({
        ...payload,
        id: Date.now(),
      }));
      setSources((prev) => [created, ...prev]);
      setShowForm(false);
      setNewSource({ name: '', categories: '', score: 90, status: 'Active' });
    } catch (err) {
      setError('Failed to add source. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full px-4 py-12 md:px-6 mt-20">
      <div className="mx-auto max-w-7xl">
        {showNav && <AdminNav />}

        <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-glass-lg backdrop-blur-2xl mb-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan">Source Operations</p>
              <h1 className="text-3xl font-black text-white">Manage News Sources</h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-400">Track publishers and the articles NewsSphere reads from each source.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowForm((prev) => !prev);
                setError('');
              }}
              className="inline-flex items-center gap-2 rounded-3xl bg-gradient-neon px-5 py-3 font-bold text-white shadow-neon-cyan hover:opacity-95 transition-all"
            >
              <Plus size={18} /> Add Source
            </button>
          </div>

          {showForm && (
            <div className="mb-6 rounded-3xl bg-dark-800/90 p-6 border border-white/10">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm text-gray-300">Source Name</span>
                  <input
                    type="text"
                    value={newSource.name}
                    onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-neon-cyan"
                    placeholder="Reuters"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm text-gray-300">Categories</span>
                  <input
                    type="text"
                    value={newSource.categories}
                    onChange={(e) => setNewSource({ ...newSource, categories: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-neon-cyan"
                    placeholder="Business, Markets"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm text-gray-300">Approval Status</span>
                  <select
                    value={newSource.status}
                    onChange={(e) => setNewSource({ ...newSource, status: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-neon-cyan"
                  >
                    <option>Active</option>
                    <option>Review</option>
                    <option>Inactive</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm text-gray-300">Reputation Score</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newSource.score}
                    onChange={(e) => setNewSource({ ...newSource, score: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-neon-cyan"
                  />
                </label>
              </div>
              {error && <p className="mt-4 text-sm text-neon-pink">{error}</p>}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCreateSource}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-3xl bg-neon-cyan px-5 py-3 text-black font-semibold hover:opacity-90 transition-all"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                  {saving ? 'Saving...' : 'Save Source'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="inline-flex items-center gap-2 rounded-3xl border border-white/10 px-5 py-3 text-white hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="py-10 text-center text-gray-400">Loading sources...</div>
          )}

          {!loading && sources.length === 0 && (
            <div className="rounded-3xl bg-dark-800/90 p-8 text-center text-gray-400">No sources available yet.</div>
          )}

          {!loading && (
            <div className="grid gap-4">
              {sources.map((source) => (
                <article key={source.id} className="rounded-2xl border border-white/10 bg-dark-800/90 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon-cyan/15 text-neon-cyan">
                        <Globe />
                      </div>
                      <div>
                        <p className="font-bold text-white">{source.name}</p>
                        <p className="text-sm text-gray-400">{source.categories}</p>
                        {source.url && (
                          <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-xs text-neon-cyan hover:text-white">
                            Visit source <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-neon-cyan/15 px-3 py-1 text-sm text-neon-cyan">{source.score}%</span>
                      <span className={`rounded-full px-3 py-1 text-sm ${source.status === 'Active' ? 'bg-emerald-500/15 text-emerald-300' : source.status === 'Review' ? 'bg-amber-500/15 text-amber-300' : 'bg-red-500/15 text-red-300'}`}>
                        {source.status}
                      </span>
                      <button className="rounded-xl bg-neon-pink/10 p-3 text-neon-pink" title="Delete source">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                        <Newspaper size={16} className="text-neon-cyan" /> Articles from {source.name}
                      </p>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">{source.articles?.length || 0} linked</span>
                    </div>
                    {source.articles?.length > 0 ? (
                      <div className="grid gap-3 lg:grid-cols-3">
                        {source.articles.map((article) => (
                          <div key={article.id || article.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <p className="line-clamp-2 text-sm font-semibold text-white">{article.title}</p>
                            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-gray-400">
                              <span>{article.category || source.categories?.split(',')[0] || 'News'}</span>
                              <span>{article.readTime || '4 min read'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No articles linked to this source yet.</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </motion.main>
  );
};

export default AdminSources;
