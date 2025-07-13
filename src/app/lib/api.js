// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coding-challenge-backend-x8a7.onrender.com/api';

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Auth API
export const authAPI = {
  login: async (credentials) => {
    return apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  saveUserData: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    }
  },
};

// Users API (Admin only)
export const usersAPI = {
  getAllUsers: async () => {
    return apiRequest('/users');
  },

  getUserById: async (id) => {
    return apiRequest(`/users/${id}`);
  },

  createUser: async (userData) => {
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  updateUser: async (id, userData) => {
    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  deleteUser: async (id) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Tasks API
export const tasksAPI = {
  getAllTasks: async () => {
    return apiRequest('/tasks');
  },

  getTaskById: async (id) => {
    return apiRequest(`/tasks/${id}`);
  },

  getTasksByStatus: async (status) => {
    return apiRequest(`/tasks/status/${status}`);
  },

  createTask: async (taskData) => {
    return apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  updateTask: async (id, taskData) => {
    return apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  updateTaskStatus: async (id, status) => {
    return apiRequest(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  deleteTask: async (id) => {
    return apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};