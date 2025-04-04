// API service for connecting to Django backend

// Base API URL - this would point to your Django backend
const API_URL = 'http://localhost:8000/api';

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Token ${token}` }),
    ...options.headers,
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'An error occurred');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Authentication services
export const authService = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    return fetchAPI('/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    return fetchAPI('/users/me/');
  },
};

// Categories services
export const getCategories = async () => {
  return fetchAPI('/categories/');
};

export const getCategoryById = async (id) => {
  return fetchAPI(`/categories/${id}/`);
};

// Services services
export const getServices = async (params = '') => {
  return fetchAPI(`/services/${params}`);
};

export const getServiceById = async (id) => {
  return fetchAPI(`/services/${id}/`);
};

export const searchServices = async (query) => {
  return fetchAPI(`/services/?search=${query}`);
};

export const getServicesByCategory = async (categoryId) => {
  return fetchAPI(`/services/?category=${categoryId}`);
};

export const getFeaturedServices = async () => {
  return fetchAPI('/services/?featured=true');
};

// Booking services
export const getBookings = async () => {
  return fetchAPI('/bookings/');
};

export const getBookingById = async (id) => {
  return fetchAPI(`/bookings/${id}/`);
};

export const createBooking = async (bookingData) => {
  return fetchAPI('/bookings/', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
};

export const updateBooking = async (id, bookingData) => {
  return fetchAPI(`/bookings/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(bookingData),
  });
};

export const cancelBooking = async (id) => {
  return fetchAPI(`/bookings/${id}/cancel/`, {
    method: 'POST',
  });
};

// Review services
export const getReviewsByService = async (serviceId) => {
  return fetchAPI(`/reviews/?service=${serviceId}`);
};

export const createReview = async (reviewData) => {
  return fetchAPI('/reviews/', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
};

// Provider services
export const getProviders = async () => {
  return fetchAPI('/providers/');
};

export const getProviderById = async (id) => {
  return fetchAPI(`/providers/${id}/`);
};

export const getProviderServices = async (providerId) => {
  return fetchAPI(`/services/?provider=${providerId}`);
};