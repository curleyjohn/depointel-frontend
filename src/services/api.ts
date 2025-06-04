import axios from 'axios';

export interface Case {
  case: string;
  case_token?: string;
  name: string;
  court_type?: string;
  court_code?: string;
  county?: string;
  state?: string;
  filing_courthouse?: string;
  court?: string;
  type?: string;
  category?: string;
  practice_area?: string;
  matter_type?: string;
  case_outcome_type?: string;
  status?: string;
  verdict?: string;
  time_to_first_cmc?: string;
  time_to_first_dismissal?: string;
  case_cycle_time?: string;
  filing_date?: string;
  case_last_updated?: string;
  last_refreshed?: string;
  parties?: string;
  alert?: string;
  refresh?: string;
  events?: string;
  attorneys?: string;
  documents?: string;
  judge?: string;
  raw_causes_of_action?: string;
  is_federal?: boolean;
  complaint_overview?: string;
}

export interface CaseFilters {
  query?: {
    jurisdiction?: string[];
    date_filed?: string;
    status?: string;
    case_type?: string;
    judge?: string;
    court?: string;
  };
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCases = async (filters?: CaseFilters): Promise<Case[]> => {
  try {
    const response = await api.post<Case[]>('/cases', filters);
    return response.data.map((item: any) => ({
      case: item.case,
      case_last_updated: item.case_last_updated,
      case_outcome_type: item.case_outcome_type,
      case_token: item.case_token,
      category: item.category,
      county: item.county,
      court_type: item.court_type,
      events: item.events,
      filing_date: item.filing_date,
      is_federal: item.is_federal,
      judge: item.judge,
      last_refreshed: item.last_refreshed,
      matter_type: item.matter_type,
      name: item.name,
      parties: item.parties,
      practice_area: item.practice_area,
      state: item.state,
      status: item.status,
      type: item.type,
    }));
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