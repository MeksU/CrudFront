import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (mail, password) => api.post('/users/login', { mail, password });
export const register = (user) => api.post('/users/register', user);
export const getUserCampaigns = (userId) => api.get(`/campaigns/user/${userId}`);
export const createCampaign = (campaign) => api.post('/campaigns', campaign);
export const updateCampaign = (id, campaign) => api.put(`/campaigns/${id}`, campaign);
export const deleteCampaign = (id) => api.delete(`/campaigns/${id}`);
export const getPrePopulatedData = () => api.get('/data');

export default api;