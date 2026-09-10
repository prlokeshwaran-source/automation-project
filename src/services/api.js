import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://automation-backend-tpc4.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error - please check your connection'));
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      // Only redirect if we're not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Handle null/undefined response data
    if (error.response?.data === null || error.response?.data === undefined) {
      return Promise.reject(new Error('Server returned empty response'));
    }

    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (userData) =>
    api.post('/auth/register', userData),

  logout: () =>
    api.get('/auth/logout'),

  getMe: () =>
    api.get('/auth/me'),

  updateProfile: (profileData) =>
    api.put('/auth/updateprofile', profileData),

  updatePassword: (currentPassword, newPassword) =>
    api.put('/auth/updatepassword', { currentPassword, newPassword }),
};

// User Service
export const userService = {
  getUsers: (params) =>
    api.get('/users', { params }),

  getUser: (id) =>
    api.get(`/users/${id}`),

  createUser: (userData) =>
    api.post('/users', userData),

  updateUser: (id, userData) =>
    api.put(`/users/${id}`, userData),

  deleteUser: (id) =>
    api.delete(`/users/${id}`),
};

// Organization Service
export const organizationService = {
  getOrganizations: (params) =>
    api.get('/organizations', { params }),

  getOrganization: (id) =>
    api.get(`/organizations/${id}`),

  createOrganization: (orgData) =>
    api.post('/organizations', orgData),

  updateOrganization: (id, orgData) =>
    api.put(`/organizations/${id}`, orgData),

  deleteOrganization: (id) =>
    api.delete(`/organizations/${id}`),

  getAvailableAdmins: () =>
    api.get('/organizations/available-admins'),
};

// Role Service
export const roleService = {
  getRoles: () =>
    api.get('/roles'),

  getRole: (id) =>
    api.get(`/roles/${id}`),

  createRole: (roleData) =>
    api.post('/roles', roleData),

  updateRole: (id, roleData) =>
    api.put(`/roles/${id}`, roleData),

  deleteRole: (id) =>
    api.delete(`/roles/${id}`),
};

// Facebook Service
export const facebookService = {
  getConfigs: () =>
    api.get('/facebook/config'),

  getConfig: (id) =>
    api.get(`/facebook/config/${id}`),

  createConfig: (configData) =>
    api.post('/facebook/config', configData),

  updateConfig: (id, configData) =>
    api.put(`/facebook/config/${id}`, configData),

  deleteConfig: (id) =>
    api.delete(`/facebook/config/${id}`),

  getPages: (orgId) =>
    api.get(`/facebook/pages/${orgId}`),

  savePage: (pageData) =>
    api.post('/facebook/pages/save', pageData),
};

// Campaign Service
export const campaignService = {
  getCampaigns: (params) =>
    api.get('/campaigns', { params }),

  getCampaign: (id) =>
    api.get(`/campaigns/${id}`),

  createCampaign: (campaignData) =>
    api.post('/campaigns', campaignData),

  updateCampaign: (id, campaignData) =>
    api.put(`/campaigns/${id}`, campaignData),

  deleteCampaign: (id) =>
    api.delete(`/campaigns/${id}`),

  approveCampaign: (id) =>
    api.put(`/campaigns/${id}/approve`),

  pauseCampaign: (id) =>
    api.put(`/campaigns/${id}/pause`),

  resumeCampaign: (id) =>
    api.put(`/campaigns/${id}/resume`),
};

// Lead Service
export const leadService = {
  getLeads: (params) =>
    api.get('/leads', { params }),

  getLead: (id) =>
    api.get(`/leads/${id}`),

  createLead: (leadData) =>
    api.post('/leads', leadData),

  updateLead: (id, leadData) =>
    api.put(`/leads/${id}`, leadData),

  deleteLead: (id) =>
    api.delete(`/leads/${id}`),

  assignLead: (id, userId) =>
    api.put(`/leads/${id}/assign`, { assignedTo: userId }),

  addNote: (id, text) =>
    api.put(`/leads/${id}/note`, { text }),

  getLeadStats: (orgId) =>
    api.get(`/leads/stats/${orgId}`),
};

// Document Service
export const documentService = {
  getDocuments: (params) =>
    api.get('/documents', { params }),

  getDocument: (id) =>
    api.get(`/documents/${id}`),

  createDocument: (docData) =>
    api.post('/documents', docData),

  updateDocument: (id, docData) =>
    api.put(`/documents/${id}`, docData),

  approveDocument: (id) =>
    api.put(`/documents/${id}/approve`),

  rejectDocument: (id, notes) =>
    api.put(`/documents/${id}/reject`, { verificationNotes: notes }),
};

// Notification Service
export const notificationService = {
  getNotifications: (params) =>
    api.get('/notifications', { params }),

  getNotification: (id) =>
    api.get(`/notifications/${id}`),

  createNotification: (notifData) =>
    api.post('/notifications', notifData),

  markAsRead: (id) =>
    api.put(`/notifications/${id}/read`),

  deleteNotification: (id) =>
    api.delete(`/notifications/${id}`),
};

// Settings Service
export const settingsService = {
  getSettings: () =>
    api.get('/settings'),

  getSettingByKey: (key) =>
    api.get(`/settings/${key}`),

  createSetting: (settingData) =>
    api.post('/settings', settingData),

  updateSetting: (key, value) =>
    api.put(`/settings/${key}`, { value }),
};

// Analytics Service
export const analyticsService = {
  getDashboardStats: (orgId) =>
    api.get(`/analytics/dashboard/${orgId}`),

  getCampaignAnalytics: (campaignId) =>
    api.get(`/analytics/campaign/${campaignId}`),

  getLeadAnalytics: (orgId) =>
    api.get(`/analytics/leads/${orgId}`),

  getOperationalSignals: (orgId) =>
    api.get(`/analytics/signals/${orgId}`),

  exportData: (orgId, params) =>
    api.get(`/analytics/export/${orgId}`, { params }),
};

// Audit Service
export const auditService = {
  getAuditLogs: (params) =>
    api.get('/audit', { params }),

  getAuditLog: (id) =>
    api.get(`/audit/${id}`),

  getUserActivity: (userId) =>
    api.get(`/audit/user/${userId}`),
};

export default api;