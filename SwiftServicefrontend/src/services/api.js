import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/';

export const getServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/services/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const getServiceDetail = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/services/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service detail:', error);
    return null;
  }
};

export const getCategories=() => {
  return axios.get(`${API_BASE_URL}/categories/`).then((response) => {
    return response.data;
  });
}

export const getProviders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/providers/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
}
