import { API, authHeaders, ADMIN_PATH } from './apiUtils';

export interface AdminRegisterData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  username: string;
  password: string;
}

export const adminService = {
  registerAdmin: async (data: AdminRegisterData): Promise<void> => {
    const res = await fetch(`${API}/${ADMIN_PATH}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.message || 'Error al registrar administrador');
    }
  },
  getAdmins: async () => {
    const res = await fetch(`${API}/${ADMIN_PATH}/admins`, { headers: authHeaders(), credentials: 'include' });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error fetching admins');
    return json;
  },
  updateAdmin: async (id: number, data: Partial<AdminRegisterData>) => {
    const res = await fetch(`${API}/${ADMIN_PATH}/admins/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error updating admin');
    return json;
  },
  deleteAdmin: async (id: number) => {
    const res = await fetch(`${API}/${ADMIN_PATH}/admins/${id}`, { method: 'DELETE', headers: authHeaders(), credentials: 'include' });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error deleting admin');
    return json;
  }
};
