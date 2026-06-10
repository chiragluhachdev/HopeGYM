/**
 * API client for the Hope Gym backend.
 * Uses axios with a persisted auth token from AuthContext.
 */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'https://hopegym.onrender.com'; // Production URL

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token from AsyncStorage to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

/* ── Public ─────────────────────────────────────── */
export const fetchBranches = () => api.get('/branches').then((r) => r.data);
export const fetchPlans = () => api.get('/plans').then((r) => r.data);
export const fetchFacilities = () => api.get('/facilities').then((r) => r.data);
export const fetchTrainers = () => api.get('/trainers').then((r) => r.data);
export const fetchGallery = () => api.get('/gallery').then((r) => r.data);
export const fetchAnnouncements = () => api.get('/announcements').then((r) => r.data);

/* ── Auth ───────────────────────────────────────── */
export const requestOtp = (phone: string) =>
  api.post('/auth/request-otp', { phone }).then((r) => r.data);
export const verifyOtp = (phone: string, code: string) =>
  api.post('/auth/verify-otp', { phone, otp: code }).then((r) => r.data);

/* ── Member ─────────────────────────────────────── */
export const fetchMe = () => api.get('/me').then((r) => r.data);
export const updateMe = (body: any) => api.put('/me', body).then((r) => r.data);
export const fetchMyMembership = () => api.get('/me/membership').then((r) => r.data);
export const renewMembership = (body: any) => api.post('/me/membership/renew', body).then((r) => r.data);
export const fetchMyPayments = () => api.get('/me/payments').then((r) => r.data);
export const fetchMyAttendance = () => api.get('/me/attendance').then((r) => r.data);
export const checkIn = () => api.post('/me/attendance/checkin').then((r) => r.data);
export const fetchWorkouts = (category?: string) =>
  api.get('/workouts', { params: category ? { category } : {} }).then((r) => r.data);
export const fetchDiet = () => api.get('/diet').then((r) => r.data);
export const fetchNotifications = () => api.get('/me/notifications').then((r) => r.data);
export const markRead = (id: string) => api.put(`/me/notifications/${id}/read`).then((r) => r.data);
export const fetchMotivation = () => api.get('/motivation').then((r) => r.data);
