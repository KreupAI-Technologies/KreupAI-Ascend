import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/signin`, credentials);
    return response.data;
  },
  signup: async (data) => {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
  },
  logout: async () => {
    // Handle logout (if necessary on the server)
  },
};
