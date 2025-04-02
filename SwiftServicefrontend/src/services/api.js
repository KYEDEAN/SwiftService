import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/';

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}categories/`);
  return response.data;
};

export const getServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const getServiceDetail = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service detail:', error);
    return null;
  }
};

export const getProviders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/providers/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
}
