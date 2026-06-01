import { API, authHeaders } from './apiUtils';

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
    const res = await fetch(`${API}/admin/auth/register`, {
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
};
