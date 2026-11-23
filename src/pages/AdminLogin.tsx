import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, AUTH_TOKEN_KEY, ADMIN_PATH } from '../services/apiUtils';
import { usePageMetadata } from '../utils/usePageMetadata';

const AdminLogin: React.FC = () => {
  usePageMetadata({
    title: 'Acceso de administración | INTU',
    description: 'Acceso privado al panel de administración del INTU.',
    robots: 'noindex,nofollow',
  });
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/${ADMIN_PATH}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, password }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.message || 'Credenciales incorrectas');
      }
      if (json?.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, json.token);
      }
      navigate(`/${ADMIN_PATH}`);
    } catch (err: any) {
      setError(err?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="p-8 bg-white rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        {error && <div role="alert" className="text-red-600 mb-2">{error}</div>}
        <div className="mb-4">
          <label htmlFor="admin-identifier" className="block text-sm">Email o usuario</label>
          <input id="admin-identifier" autoComplete="username" required value={identifier} onChange={e => setIdentifier(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="admin-password" className="block text-sm">Contraseña</label>
          <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <button className="w-full bg-[#273376] text-white py-2 rounded">Ingresar</button>
      </form>
    </div>
  );
};

export default AdminLogin;
