import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminHeroSettings from './pages/AdminHeroSettings';
import AdminNewsSettings from './pages/AdminNewsSettings';
import AdminOfficialNews from './pages/AdminOfficialNews';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/settings/hero" element={<AdminHeroSettings />} />
        <Route path="/admin/settings/news" element={<AdminNewsSettings />} />
        <Route path="/admin/settings/official-news" element={<AdminOfficialNews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
