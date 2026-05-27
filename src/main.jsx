import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import BlogLayout from './layouts/BlogLayout';
import About from './pages/About';
import ArticlePage from './pages/ArticlePage';
import Dashboard from './pages/Dashboard';
import NewsFeed from './pages/NewsFeed';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ArticleForm from './pages/ArticleEdit';

import ProtectedRoute from './layouts/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <Routes>
        {/* ПРАВИЛО РЕДИРЕКТА: Если пользователь зашел на сайт ("/") 
          https://localhost/ мы автоматически перенаправляем в ленту новостей /news
          replace - указывает, что страницу "/" не нужно сохранять в истории переходов
        */}
        <Route path='/' element={<Navigate to="/news" replace />} />
        <Route path='/' element={<BlogLayout />}>
          <Route path='news' element={<NewsFeed />} />
          <Route path='about' element={<About />} />
          {/* news/42 news/js-article и т.д. */}
          <Route path='news/:articleId' element={<ArticlePage />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          {/* ЗАЩИЩЕННЫЙ ROUTE КАБИНЕТА */}
          <Route path='dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
            }>
            {/* .../dashboard/profile */}
            <Route path='profile' element={<Profile />} />
            {/* .../dashboard/settings */}
            <Route path='settings' element={<Settings />} />
            {/* .../dashboard/create-article */}
            <Route path='create-article' element={<ArticleForm />} />
            {/* .../dashboard/edit-article/:articleId */}
            <Route path='edit-article/:articleId' element={<ArticleForm />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  </AuthProvider>
);