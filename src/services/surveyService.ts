import { API, authHeaders, ADMIN_PATH } from './apiUtils';

export interface SurveyQuestion {
  id: number;
  label: string;
  type: 'radio' | 'text';
  options?: string[];
  order: number;
  active: boolean;
}

export interface SurveyStatsQuestion {
  questionId: number;
  label: string;
  type: string;
  totalResponses: number;
  optionCounts: Record<string, number>;
  latestResponses?: string[];
}

export interface SurveySettings {
  active: boolean;
  available: boolean;
  message: string;
  startDate?: string | null;
  endDate?: string | null;
  dailyStartTime?: string | null;
  dailyEndTime?: string | null;
  durationMinutes: number;
}

export const surveyService = {
  getQuestions: async (): Promise<SurveyQuestion[]> => {
    const res = await fetch(`${API}/surveys/questions`);
    if (!res.ok) throw new Error('Error fetching survey questions');
    return res.json();
  },

  submitResponses: async (cedula: string, answers: Record<number, string>): Promise<void> => {
    const res = await fetch(`${API}/surveys/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula, answers }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error submitting survey responses');
  },

  verifyCedula: async (cedula: string): Promise<{ alreadyResponded: boolean }> => {
    const res = await fetch(`${API}/surveys/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error verifying cédula');
    return json;
  },

  getAdminQuestions: async (): Promise<SurveyQuestion[]> => {
    const res = await fetch(`${API}/${ADMIN_PATH}/surveys/questions`, { headers: authHeaders(), credentials: 'include' });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json?.message || 'Error fetching admin survey questions');
    }
    return res.json();
  },

  createQuestion: async (data: Partial<SurveyQuestion>): Promise<SurveyQuestion> => {
    const res = await fetch(`${API}/${ADMIN_PATH}/surveys/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error creating survey question');
    return json;
  },

  updateQuestion: async (id: number, data: Partial<SurveyQuestion>): Promise<SurveyQuestion> => {
    const res = await fetch(`${API}/${ADMIN_PATH}/surveys/questions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error updating survey question');
    return json;
  },

  deleteQuestion: async (id: number): Promise<void> => {
    const res = await fetch(`${API}/${ADMIN_PATH}/surveys/questions/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
      credentials: 'include',
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error deleting survey question');
  },

  getStats: async (): Promise<{ totalResponses: number; questions: SurveyStatsQuestion[] }> => {
    const res = await fetch(`${API}/${ADMIN_PATH}/surveys/stats`, { headers: authHeaders(), credentials: 'include' });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error fetching survey stats');
    return json;
  },

  getSettings: async (): Promise<SurveySettings> => {
    const res = await fetch(`${API}/surveys/settings`);
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error fetching survey settings');
    return json;
  },

  getAdminSettings: async (): Promise<SurveySettings> => {
    const res = await fetch(`${API}/${ADMIN_PATH}/surveys/settings`, { headers: authHeaders(), credentials: 'include' });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error fetching admin survey settings');
    return json;
  },

  updateSettings: async (data: Partial<SurveySettings>): Promise<SurveySettings> => {
    const res = await fetch(`${API}/${ADMIN_PATH}/surveys/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Error updating survey settings');
    return json;
  },
};