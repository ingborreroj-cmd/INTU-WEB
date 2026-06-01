import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, AUTH_TOKEN_KEY } from '../services/apiUtils';

const AdminLogin: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/auth/login`, {
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
      navigate('/admin');
    } catch (err: any) {
      setError(err?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="p-8 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm">Email o usuario</label>
          <input value={identifier} onChange={e => setIdentifier(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Ingresar</button>
      </form>
    </div>
  );
};

export default AdminLogin;
