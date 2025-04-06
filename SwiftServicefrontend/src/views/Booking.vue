<!-- Booking.vue -->
<template>
    <main class="bookings-page">
      <div class="container">
        <div class="bookings-header">
          <h1>My Bookings</h1>
          <p>View and manage your service bookings</p>
        </div>
        
        <div class="booking-filters">
          <div class="filter-tabs">
            <button 
              class="filter-tab" 
              :class="{ 'active': bookingFilter === 'all' }"
              @click="bookingFilter = 'all'"
            >
              All
            </button>
            <button 
              class="filter-tab" 
              :class="{ 'active': bookingFilter === 'upcoming' }"
              @click="bookingFilter = 'upcoming'"
            >
              Upcoming
            </button>
            <button 
              class="filter-tab" 
              :class="{ 'active': bookingFilter === 'completed' }"
              @click="bookingFilter = 'completed'"
            >
              Completed
            </button>
            <button 
              class="filter-tab" 
              :class="{ 'active': bookingFilter === 'cancelled' }"
              @click="bookingFilter = 'cancelled'"
            >
              Cancelled
            </button>
          </div>
        </div>
        
        <div v-if="isLoading" class="loading-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="loading-icon">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          <p>Loading your bookings...</p>
        </div>
        
        <div v-else-if="error" class="error-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>{{ error }}</p>
        </div>
        
        <div v-else-if="filteredBookings.length === 0" class="no-bookings">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h3>No bookings found</h3>
          <p>You don't have any {{ bookingFilter !== 'all' ? bookingFilter : '' }} bookings yet.</p>
          <router-link to="/services" class="browse-services-button">Browse Services</router-link>
        </div>
        
        <div v-else class="bookings-list">
          <div v-for="booking in filteredBookings" :key="booking.id" class="booking-card">
            <div class="booking-header">
              <div class="booking-service">
                <h3>{{ booking.serviceName }}</h3>
                <span class="booking-status" :class="booking.status">{{ booking.status }}</span>
              </div>
              <div class="booking-id">
                <span>Booking ID: {{ booking.id }}</span>
              </div>
            </div>
            
            <div class="booking-details">
              <div class="booking-detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{{ booking.date }}</span>
              </div>
              
              <div class="booking-detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{{ booking.time }}</span>
              </div>
              
              <div class="booking-detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ booking.location }}</span>
              </div>
              
              <div class="booking-detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>NPR {{ formatPrice(booking.price) }}</span>
              </div>
            </div>
            
            <div class="booking-provider">
              <div class="provider-info">
                <div class="provider-avatar">{{ getProviderInitials(booking) }}</div>
                <div>
                  <h4>{{ booking.providerName }}</h4>
                  <div class="provider-rating">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>{{ booking.providerRating }} ({{ booking.providerReviews }})</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="booking-actions">
              <button 
                v-if="booking.status === 'upcoming'" 
                class="cancel-button"
                @click="cancelBooking(booking.id)"
                :disabled="isCancelling === booking.id"
              >
                <span v-if="isCancelling === booking.id">Cancelling...</span>
                <span v-else>Cancel Booking</span>
              </button>
              
              <button 
                v-if="booking.status === 'completed' && !booking.reviewed" 
                class="review-button"
                @click="openReviewModal(booking)"
              >
                Leave Review
              </button>
              
              <router-link :to="`/bookings/${booking.id}`" class="details-button">
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Review Modal -->
      <div class="modal" v-if="showReviewModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Leave a Review</h3>
            <button class="close-button" @click="showReviewModal = false">×</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitReview" class="review-form">
              <div class="rating-input">
                <label>Rating</label>
                <div class="star-rating">
                  <button 
                    v-for="star in 5" 
                    :key="star" 
                    type="button"
                    class="star-button" 
                    :class="{ 'active': star <= reviewData.rating }"
                    @click="reviewData.rating = star"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="form-group">
                <label for="review-comment">Your Review</label>
                <textarea 
                  id="review-comment" 
                  v-model="reviewData.comment" 
                  rows="4" 
                  placeholder="Share your experience with this service"
                  required
                ></textarea>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="submit-button" :disabled="isSubmittingReview">
                  <span v-if="isSubmittingReview">Submitting...</span>
                  <span v-else>Submit Review</span>
                </button>
                <button type="button" class="cancel-button" @click="showReviewModal = false">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  // Base API URL for Django backend
  const API_URL = 'http://localhost:8000/services';
  
  // Router
  const router = useRouter();
  
  // State
  const bookings = ref([]);
  const isLoading = ref(true);
  const error = ref(null);
  const bookingFilter = ref('all');
  const isCancelling = ref(null);
  const showReviewModal = ref(false);
  const isSubmittingReview = ref(false);
  const selectedBooking = ref(null);
  
  const reviewData = ref({
    rating: 5,
    comment: ''
  });
  
  // Computed
  const filteredBookings = computed(() => {
    if (bookingFilter.value === 'all') {
      return bookings.value;
    }
    return bookings.value.filter(booking => booking.status === bookingFilter.value);
  });
  
  // Methods
  const fetchBookings = async () => {
    isLoading.value = true;
    error.value = null;
  
    try {
      // Fetch the authentication token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
  
      // Use the correct endpoint: /services/bookings/
      const response = await axios.get(`${API_URL}/bookings/`, config);
      bookings.value = response.data.map(booking => ({
        id: booking.id,
        serviceName: booking.service_name || booking.service?.title || 'Unknown Service', // Adjust based on API response
        status: booking.status.toLowerCase(), // Ensure consistency with filter values
        date: booking.date,
        time: booking.time,
        location: booking.location || 'Kathmandu', // Default if not provided
        price: parseFloat(booking.price) || 0,
        providerName: booking.provider_name || booking.provider?.username || 'Unknown Provider', // Adjust based on API response
        providerInitials: '', // Will be computed by getProviderInitials
        providerRating: booking.provider_rating || 4.5, // Default if not provided
        providerReviews: booking.provider_reviews || 0, // Default if not provided
        reviewed: booking.reviewed || false, // Adjust based on API response
      }));
    } catch (err) {
      console.error('Error fetching bookings:', err);
      error.value = err.message || 'Failed to load bookings. Please try again.';
      bookings.value = [];
    } finally {
      isLoading.value = false;
    }
  };
  
  const cancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
  
    isCancelling.value = bookingId;
  
    try {
      // Fetch the authentication token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
  
      // Use the correct endpoint: /services/bookings/<id>/cancel/
      await axios.patch(`${API_URL}/bookings/${bookingId}/cancel/`, { status: 'cancelled' }, config);
  
      // Update the booking status in the local state
      const bookingIndex = bookings.value.findIndex(b => b.id === bookingId);
      if (bookingIndex !== -1) {
        bookings.value[bookingIndex].status = 'cancelled';
      }
  
      alert('Booking cancelled successfully!');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      isCancelling.value = null;
    }
  };
  
  const openReviewModal = (booking) => {
    selectedBooking.value = booking;
    showReviewModal.value = true;
  };
  
  const submitReview = async () => {
    if (!selectedBooking.value) return;
  
    isSubmittingReview.value = true;
  
    try {
      // Fetch the authentication token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
  
      const reviewPayload = {
        rating: reviewData.value.rating,
        comment: reviewData.value.comment,
      };
  
      // Use the correct endpoint: /services/bookings/<id>/review/
      await axios.post(`${API_URL}/bookings/${selectedBooking.value.id}/review/`, reviewPayload, config);
  
      // Update the booking in the local state
      const bookingIndex = bookings.value.findIndex(b => b.id === selectedBooking.value.id);
      if (bookingIndex !== -1) {
        bookings.value[bookingIndex].reviewed = true;
      }
  
      // Reset form and close modal
      reviewData.value = { rating: 5, comment: '' };
      selectedBooking.value = null;
      showReviewModal.value = false;
  
      alert('Thank you for your review!');
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    } finally {
      isSubmittingReview.value = false;
    }
  };
  
  const formatPrice = (price) => {
    if (!price) return '0.00';
    return price.toFixed(2);
  };
  
  const getProviderInitials = (booking) => {
    if (booking.providerInitials) return booking.providerInitials;
  
    if (!booking.providerName) return '';
    const nameParts = booking.providerName.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }
    return booking.providerName.charAt(0);
  };
  
  // Lifecycle hooks
  onMounted(() => {
    fetchBookings();
  });
  </script>
  
  <style scoped>
  /* Keep your existing styles */
  .bookings-page {
    padding: 3rem 0;
    background-color: var(--light-bg);
    min-height: calc(100vh - 200px);
  }
  
  .bookings-header {
    margin-bottom: 2rem;
  }
  
  .bookings-header h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 0.5rem;
  }
  
  .bookings-header p {
    color: #6b7280;
  }
  
  .booking-filters {
    margin-bottom: 1.5rem;
  }
  
  .filter-tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  
  .filter-tab {
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    font-size: 0.875rem;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .filter-tab:hover {
    color: var(--primary);
  }
  
  .filter-tab.active {
    color: var(--primary);
    border-bottom-color: var(--primary);
    font-weight: 500;
  }
  
  .loading-container,
  .error-container,
  .no-bookings {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    text-align: center;
  }
  
  .loading-icon {
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
    color: var(--primary);
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-container svg {
    color: #ef4444;
    margin-bottom: 1rem;
  }
  
  .no-bookings svg {
    color: #d1d5db;
    margin-bottom: 1rem;
  }
  
  .no-bookings h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #374151;
  }
  
  .browse-services-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--primary);
    color: white;
    border-radius: 0.375rem;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background-color 0.2s;
  }
  
  .browse-services-button:hover {
    background-color: var(--primary-dark);
  }
  
  .bookings-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .booking-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .booking-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  @media (min-width: 640px) {
    .booking-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .booking-service {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  
  .booking-service h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--secondary);
  }
  
  .booking-status {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
  }
  
  .booking-status.upcoming {
    background-color: rgba(37, 99, 235, 0.1);
    color: var(--primary);
  }
  
  .booking-status.completed {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }
  
  .booking-status.cancelled {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
  
  .booking-id {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .booking-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  @media (min-width: 768px) {
    .booking-details {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .booking-detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  .booking-provider {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .provider-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .provider-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: var(--primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  .provider-info h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
  }
  
  .provider-rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .provider-rating svg {
    color: #f59e0b;
  }
  
  .booking-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem;
  }
  
  .cancel-button,
  .review-button,
  .details-button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-button {
    background-color: #fee2e2;
    color: #ef4444;
    border: none;
  }
  
  .cancel-button:hover {
    background-color: #fecaca;
  }
  
  .cancel-button:disabled {
    background-color: #fef2f2;
    color: #f87171;
    cursor: not-allowed;
  }
  
  .review-button {
    background-color: #e0f2fe;
    color: #0ea5e9;
    border: none;
  }
  
  .review-button:hover {
    background-color: #bae6fd;
  }
  
  .details-button {
    background-color: #f3f4f6;
    color: #4b5563;
    border: none;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .details-button:hover {
    background-color: #e5e7eb;
  }
  
  /* Modal styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--secondary);
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #9ca3af;
    cursor: pointer;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .review-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .rating-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .rating-input label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
  }
  
  .star-rating {
    display: flex;
    gap: 0.25rem;
  }
  
  .star-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #d1d5db;
    transition: color 0.2s;
  }
  
  .star-button.active {
    color: #f59e0b;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
  }
  
  .form-group textarea {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    resize: vertical;
  }
  
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
  
  .submit-button {
    padding: 0.5rem 1rem;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .submit-button:hover {
    background-color: var(--primary-dark);
  }
  
  .submit-button:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
  }
  </style>