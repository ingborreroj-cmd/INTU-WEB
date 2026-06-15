import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { API, authHeaders, ADMIN_PATH } from '../services/apiUtils';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${API}/${ADMIN_PATH}/auth/me`, { credentials: 'include', headers: authHeaders() });
        const j = await res.json();
        setAuthed(!!j.authenticated);
      } catch (err) {
        setAuthed(false);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authed) return <Navigate to={`/${ADMIN_PATH}/login`} replace />;
  return children;
};

export default AdminRoute;
