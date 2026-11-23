import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { API, authHeaders, ADMIN_PATH } from '../services/apiUtils';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let inactivityTimer: number;

    const logoutForInactivity = async () => {
      try {
        await fetch(`${API}/${ADMIN_PATH}/auth/logout`, { method: 'POST', credentials: 'include', headers: authHeaders() });
      } catch (error) {
        // Local cleanup is still required if the backend is unavailable.
      }
      localStorage.removeItem('intu_web_admin_token');
      window.location.replace(`/${ADMIN_PATH}/login`);
    };

    const resetInactivityTimer = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(logoutForInactivity, 5 * 60 * 1000);
    };

    const activityEvents: (keyof WindowEventMap)[] = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, resetInactivityTimer, { passive: true }));
    resetInactivityTimer();

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

    return () => {
      window.clearTimeout(inactivityTimer);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, resetInactivityTimer));
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authed) return <Navigate to={`/${ADMIN_PATH}/login`} replace />;
  return children;
};

export default AdminRoute;
