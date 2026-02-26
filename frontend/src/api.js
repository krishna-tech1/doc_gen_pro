/**
 * api.js — centralised Axios instance.
 * All API calls use this instance so the base URL is set in one place.
 */
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 60000, // 60 s – allow time for AI + DOCX generation
});

/* ── Document generators ───────────────────────────────────────── */

export const generateCircular = (data) => api.post('/generate-circular', data);
export const generateProposal = (data) => api.post('/generate-proposal', data);
export const generateReport = (formData) =>
    api.post('/generate-report', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

/* ── Reference data ────────────────────────────────────────────── */
export const fetchSDGGoals = () => api.get('/sdg-goals');

/* ── Download helper – returns the full URL for the DOCX file ─── */
export const getDownloadUrl = (path) =>
    `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${path}`;

export default api;
