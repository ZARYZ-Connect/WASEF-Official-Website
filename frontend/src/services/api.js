import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({ baseURL: BASE, timeout: 10000 });

export const fetchServices       = () => api.get('/services/');
export const fetchService        = (slug) => api.get(`/services/${slug}/`);
export const fetchFeaturedServices = () => api.get('/services/featured/');
export const fetchProjects       = () => api.get('/projects/');
export const fetchFeaturedProjects = () => api.get('/projects/featured/');
export const fetchCertifications = () => api.get('/certifications/');
export const fetchFacilities     = () => api.get('/facilities/');
export const fetchCareers        = () => api.get('/careers/');
export const fetchDocuments      = () => api.get('/documents/');
export const fetchClients        = () => api.get('/clients/');
export const fetchStats          = () => api.get('/stats/');
export const submitContact       = (data) => api.post('/contact/', data);

export default api;
