import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getDashboardData = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

export const getExpenses = async () => {
  const response = await api.get('/expenses');
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await api.post('/expenses', expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  await api.delete(`/expenses/${id}`);
};

export const sendContactMessage = async (message) => {
  const response = await api.post('/contact', message);
  return response.data;
};

export default api;
