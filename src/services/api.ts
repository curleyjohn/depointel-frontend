import axios from 'axios';

export interface Case {
  id: string;
  title: string;
  court: string;
  date: string;
  status: string;
  jurisdiction: string;
  judge: string;
  parties: string[];
  caseType: string;
  lastUpdated: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCases = async (): Promise<Case[]> => {
  try {
    const response = await api.get<Case[]>('/cases');
    return response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
};

export const getCaseById = async (id: string): Promise<Case> => {
  try {
    const response = await api.get<Case>(`/cases/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching case ${id}:`, error);
    throw error;
  }
};

export default api; 