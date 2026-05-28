import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';

console.log('[API] Using backend base URL:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('newsphere_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Token = token;
  }
  return config;
});

const handleResponse = (response) => response.data;
const handleError = (error) => {
  console.error('API Error:', error?.response?.data || error.message || error);
  throw error;
};

export const authAPI = {
  signin: (data) => apiClient.post('/authservice/signin', data).then(handleResponse).catch(handleError),
  signup: (data) => apiClient.post('/authservice/signup', data).then(handleResponse).catch(handleError),
  uinfo: () => apiClient.get('/authservice/uinfo').then(handleResponse).catch(handleError),
};

export const adminAPI = {
  getDashboard: () => apiClient.get('/api/admin/dashboard').then(handleResponse).catch(handleError),
  getAnalytics: () => apiClient.get('/api/admin/analytics').then(handleResponse).catch(handleError),
  getTrending: () => apiClient.get('/api/admin/trending').then(handleResponse).catch(handleError),
  getShareAnalytics: () => apiClient.get('/api/admin/share-analytics').then(handleResponse).catch(handleError),
  listUsers: () => apiClient.get('/api/admin/users').then(handleResponse).catch(handleError),
  updateUserRole: (id, role) => apiClient.put(`/api/admin/users/${id}/role`, { role }).then(handleResponse).catch(handleError),
  suspendUser: (id) => apiClient.put(`/api/admin/users/${id}/suspend`).then(handleResponse).catch(handleError),
  deleteUser: (id) => apiClient.delete(`/api/admin/users/${id}`).then(handleResponse).catch(handleError),
  listArticles: () => apiClient.get('/api/admin/articles').then(handleResponse).catch(handleError),
  createArticle: (data) => apiClient.post('/api/admin/articles', data).then(handleResponse).catch(handleError),
  updateArticle: (id, data) => apiClient.put(`/api/admin/articles/${id}`, data).then(handleResponse).catch(handleError),
  deleteArticle: (id) => apiClient.delete(`/api/admin/articles/${id}`).then(handleResponse).catch(handleError),
  listCategories: () => apiClient.get('/api/admin/categories').then(handleResponse).catch(handleError),
  createCategory: (data) => apiClient.post('/api/admin/categories', data).then(handleResponse).catch(handleError),
  listSources: () => apiClient.get('/api/admin/sources').then(handleResponse).catch(handleError),
  createSource: (data) => apiClient.post('/api/admin/sources', data).then(handleResponse).catch(handleError),
  sendNotification: (data) => apiClient.post('/api/admin/notifications', data).then(handleResponse).catch(handleError),
  listNotifications: () => apiClient.get('/api/admin/notifications').then(handleResponse).catch(handleError),
};

export const hnAPI = {
  getTechnologyStories: () => axios
    .get('https://hn.algolia.com/api/v1/search', { params: { query: 'technology' } })
    .then(handleResponse)
    .catch(handleError),
};

export const articlesAPI = {
  getAll: () => apiClient.get('/api/articles').then(handleResponse).catch(handleError),
  getById: (id) => apiClient.get(`/api/articles/${id}`).then(handleResponse).catch(handleError),
  createArticle: (data) => apiClient.post('/api/articles', data).then(handleResponse).catch(handleError),
  updateArticle: (id, data) => apiClient.put(`/api/articles/${id}`, data).then(handleResponse).catch(handleError),
  deleteArticle: (id) => apiClient.delete(`/api/articles/${id}`).then(handleResponse).catch(handleError),
};

export const shareAPI = {
  recordShare: (payload) => apiClient.post('/api/shares', payload).then(handleResponse).catch(handleError),
  getSummary: () => apiClient.get('/api/shares/summary').then(handleResponse).catch(handleError),
};

export const searchAPI = {
  track: (keyword) => apiClient.post('/api/search/track', { keyword }).then(handleResponse).catch(handleError),
  trending: () => apiClient.get('/api/search/trending').then(handleResponse).catch(handleError),
};
