import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  FileText,
  Globe2,
  Lock,
  Mail,
  Newspaper,
  Quote,
  Users,
  Zap,
  Github,
} from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const stats = [
  { label: 'Countries', value: '150+', icon: Globe2 },
  { label: 'Articles', value: '1M+', icon: FileText },
  { label: 'Users', value: '10M+', icon: Users },
  { label: 'Uptime', value: '99.9%', icon: Zap },
];

const floatingCards = [
  {
    className: 'login-news-card primary',
    tag: 'BREAKING NEWS',
    title: 'AI Breakthrough Transforms Global Industries',
    meta: '2 min ago - Technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=360&h=240&fit=crop',
  },
  {
    className: 'login-news-card top',
    tag: 'WORLD',
    title: 'Leaders Meet for Global Climate Summit',
    meta: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=320&h=200&fit=crop',
  },
  {
    className: 'login-news-card market',
    tag: 'BUSINESS',
    title: 'Markets Rally as Tech Stocks Lead Gains',
    meta: '3 hours ago',
    image: null,
  },
  {
    className: 'login-news-card sports',
    tag: 'SPORTS',
    title: 'Historic Win in the Championship Final',
    meta: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=320&h=220&fit=crop',
  },
];

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '', remember: true });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/sources'} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    const role = form.username.trim().toLowerCase() === 'admin' ? 'admin' : 'user';
    const result = login({ ...form, role });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    const requestedPath = location.state?.from;
    const defaultPath = result.role === 'admin' ? '/admin' : '/sources';
    navigate(requestedPath || defaultPath, { replace: true });
  };

  return (
    <main className="news-login-page">
      <section className="news-login-left">
        <div className="news-login-brand">
          <div className="news-login-logo">
            <Newspaper size={28} />
          </div>
          <div>
            <h1>NewsSphere <span>AI</span></h1>
            <p>Smarter News. Deeper Insights.</p>
          </div>
        </div>

        <div className="news-login-copy">
          <h2>
            Stay Informed.
            <span>Stay Ahead.</span>
          </h2>
          <p>AI-powered news aggregation from around the world, curated just for you.</p>
        </div>

        <div className="news-login-visual">
          <div className="news-world-map" />
          {floatingCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + index * 0.08 }}
              className={card.className}
            >
              <div>
                <span className="news-card-tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.meta}</p>
              </div>
              {card.image ? (
                <img src={card.image} alt="" />
              ) : (
                <div className="news-card-chart">
                  <BarChart3 size={58} />
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <div className="news-login-stats">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <div className="stat-icon"><Icon size={22} /></div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="news-login-quote">
          <Quote size={34} />
          <p>The best way to predict the future is to stay informed today.</p>
          <span>— NewsSphere AI</span>
        </div>
      </section>

      <section className="news-login-right">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          className="news-login-card"
        >
          <div className="news-login-card-icon">
            <Newspaper size={44} />
          </div>

          <div className="news-login-card-heading">
            <h2>Welcome Back!</h2>
            <p>Login to continue to your dashboard</p>
          </div>

          <label className="news-login-field">
            <Mail size={24} />
            <input
              value={form.username}
              onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="Email or Username"
            />
          </label>

          <label className="news-login-field">
            <Lock size={24} />
            <input
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </label>

          <div className="news-login-options">
            <label>
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm((prev) => ({ ...prev, remember: e.target.checked }))}
              />
              Remember me
            </label>
            <button type="button">Forgot Password?</button>
          </div>

          {error && <p className="news-login-error">{error}</p>}

          <button className="news-login-submit" type="submit">
            Login
            <span><ArrowRight size={22} /></span>
          </button>

          <div className="news-login-divider">
            <span /> OR CONTINUE WITH <span />
          </div>

          <button type="button" className="news-social-button">
            <span className="google-mark">G</span>
            Continue with Google
          </button>
          <button type="button" className="news-social-button">
            <Github size={28} />
            Continue with GitHub
          </button>

          <p className="news-signup">
            Don&apos;t have an account? <button type="button">Sign Up</button>
          </p>
        </motion.form>
      </section>
    </main>
  );
};

export default LoginPage;
