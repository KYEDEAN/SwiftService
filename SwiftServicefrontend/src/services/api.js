import axios from 'axios';

// Base API URL for Django backend
const API_URL = 'http://localhost:8000/services';

// Basic helper function for API requests

export const registerUser=async (userData) => {
  try{
    const response= await axios.post(`${API_URL}/register/`,userData);
    return response.data;
  } catch(error){
    throw error;
  }
};
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

async function fetchAuthAPI(endpoint, method = 'POST', data = null) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error('Request failed');
    }

    // For DELETE requests or other requests that might not return JSON
    if (response.status === 204) {
      return { success: true };
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Booking services
export const createBooking = async (bookingData) => {
  return fetchAuthAPI('/bookings/', 'POST', bookingData);
};

export const getUserBookings = async () => {
  return fetchAuthAPI('/bookings/user/', 'GET');
};

export const cancelBooking = async (bookingId) => {
  return fetchAuthAPI(`/bookings/${bookingId}/cancel/`, 'PATCH', { status: 'cancelled' });
};
