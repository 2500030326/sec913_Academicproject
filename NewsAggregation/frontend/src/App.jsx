import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleBasedRoute from './routes/RoleBasedRoute';
import UserLayout from './layouts/UserLayout';
import LoginPage from './pages/auth/LoginPage';
import AccessDenied from './pages/auth/AccessDenied';
import Homepage from './pages/Homepage';
import SportsPage from './pages/SportsPage';
import SearchPage from './pages/SearchPage';
import SourcesPage from './pages/SourcesPage';
import TrendingPage from './pages/TrendingPage';
import ArticlePage from './pages/ArticlePage';
import UserDashboard from './pages/UserDashboard';
import CategoriesPage from './pages/user/CategoriesPage';
import SavedArticlesPage from './pages/user/SavedArticlesPage';
import ProfilePage from './pages/user/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import './styles/App.css';

const RootRedirect = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.role === 'admin' ? '/admin' : '/sources'} replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/access-denied"
            element={
              <ProtectedRoute>
                <AccessDenied />
              </ProtectedRoute>
            }
          />

          <Route
            element={
              <RoleBasedRoute allowedRoles={['user']} fallback="/access-denied">
                <UserLayout />
              </RoleBasedRoute>
            }
          >
            <Route path="/home" element={<Homepage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/news/:id" element={<ArticlePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/saved" element={<SavedArticlesPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>

          <Route
            path="/admin/*"
            element={
              <RoleBasedRoute allowedRoles={['admin']} fallback="/access-denied">
                <AdminDashboard />
              </RoleBasedRoute>
            }
          />

          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
