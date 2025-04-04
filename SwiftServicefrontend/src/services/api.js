// Base API URL for Django backend
const API_URL = 'http://localhost:8000/services';

// Basic helper function for API requests
async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Category services
export const getCategories = async () => {
  return fetchAPI('/categories/');
};

// Service services
export const getServices = async () => {
  return fetchAPI('/services/');
};
