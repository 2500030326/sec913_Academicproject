const fallbackImages = {
  Technology: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=700&fit=crop',
  Sports: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200&h=700&fit=crop',
  Business: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=700&fit=crop',
  Health: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=700&fit=crop',
  Politics: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=700&fit=crop',
  Science: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=700&fit=crop',
  default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=700&fit=crop',
};

const stripHTML = (value) => {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, '').trim();
};

const formatDate = (value) => {
  if (!value) return 'Just now';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Just now';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const createImageSeed = (article, category) => {
  const base = article.objectID || article.id || article.guid || article.link || article.title || article.story_title || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return encodeURIComponent(`${category}-${String(base).slice(0, 50).replace(/\s+/g, '-').toLowerCase()}`);
};

const getUniqueFallbackImage = (article, category) => {
  const seed = createImageSeed(article, category);
  return `https://picsum.photos/seed/${seed}/1200/700`;
};

export const toNewsCardArticle = (article) => {
  const category = article.category || (Array.isArray(article.categories) && article.categories[0]) || 'Breaking';
  const rawDescription = article.summary || article.content || article.description || '';
  return {
    id: article.objectID || article.id || article.guid || article.link || `article-${Math.random().toString(36).slice(2, 10)}`,
    title: article.title || article.story_title || 'Untitled Article',
    description: stripHTML(rawDescription) || article.comment_text || 'Read the latest update from NewsSphere AI.',
    image: article.imageUrl || article.thumbnail || article.enclosure?.thumbnail || getUniqueFallbackImage(article, category),
    sourceLogo: `https://via.placeholder.com/40/00d4ff/ffffff?text=${category.slice(0, 2).toUpperCase()}`,
    source: article.author || article.story_author || 'Hacker News',
    date: formatDate(article.created_at || article.createdAt || article.pubDate),
    readTime: `${Math.max(3, Math.ceil((rawDescription || article.story_text || '').split(/\s+/).filter(Boolean).length / 180))} min read`,
    category,
    credibility: 94,
    sentiment: article.trending ? 'Positive' : 'Neutral',
    score: article.featured ? 98 : 92,
    breaking: Boolean(article.breaking),
    trending: Boolean(article.trending),
    featured: Boolean(article.featured),
    raw: article,
  };
};

export const mergeArticles = (apiArticles, fallbackArticles) => {
  const mapped = apiArticles.map(toNewsCardArticle);
  const existingIds = new Set(mapped.map((article) => String(article.id)));
  return [
    ...mapped,
    ...fallbackArticles.filter((article) => !existingIds.has(String(article.id))),
  ];
};
