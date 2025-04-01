import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const fetchServiceDetail = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service detail:', error);
    return null;
  }
};
