import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminRoute from './components/AdminRoute';
import { ADMIN_PATH } from './services/apiUtils';

const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const MarcoJuridico = lazy(() => import('./pages/MarcoJuridico'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#f8f9fa] text-sm text-slate-600" role="status">Cargando página...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/${ADMIN_PATH}/login`} element={<AdminLogin />} />
          <Route path={`/${ADMIN_PATH}`} element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/marco-juridico" element={<MarcoJuridico />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
