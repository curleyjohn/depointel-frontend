import axios from 'axios';

export const getSheetRows = async () => {
  const response = await axios.get('/api/sheets');
  return response.data;
};

export const appendSheetRow = async (data: any[]) => {
  const response = await axios.post('/api/sheets', { data });
  return response.data;
}; 