<template>
  <main class="profile-page">
    <div class="container">
      <div class="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account information and preferences</p>
      </div>
      
      <div class="profile-content">
        <div class="profile-sidebar">
          <div class="profile-avatar">
            <div class="avatar">{{ userInitials }}</div>
            <div class="avatar-info">
              <h3>{{ userName }}</h3>
              <p>{{ userEmail }}</p>
            </div>
          </div>
          
          <div class="profile-menu">
            <button 
              class="profile-menu-item" 
              :class="{ 'active': activeTab === 'personal' }"
              @click="activeTab = 'personal'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Personal Information
            </button>
            
            <button 
              class="profile-menu-item" 
              :class="{ 'active': activeTab === 'security' }"
              @click="activeTab = 'security'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Security
            </button>
            
            <!-- Removed the Preferences button -->
          </div>
        </div>
        
        <div class="profile-main">
          <!-- Personal Information Tab -->
          <div v-if="activeTab === 'personal'" class="profile-tab">
            <h2>Personal Information</h2>
            <p class="tab-description">Update your personal details</p>
            
            <form @submit.prevent="updateProfile" class="profile-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    v-model="profile.firstName" 
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    v-model="profile.lastName" 
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="profile.email" 
                  placeholder="Enter your email"
                  disabled
                />
                <p class="input-hint">Email cannot be changed</p>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="profile.phone" 
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div class="form-group">
                <label for="address">Address</label>
                <textarea 
                  id="address" 
                  v-model="profile.address" 
                  placeholder="Enter your address"
                  rows="3"
                ></textarea>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="save-button" :disabled="isLoading">
                  <span v-if="isLoading">Saving...</span>
                  <span v-else>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
          
          <!-- Security Tab -->
          <div v-if="activeTab === 'security'" class="profile-tab">
            <h2>Security</h2>
            <p class="tab-description">Manage your password and account security</p>
            
            <form @submit.prevent="updatePassword" class="profile-form">
              <div class="form-group">
                <label for="currentPassword">Current Password</label>
                <div class="password-input">
                  <input 
                    :type="showCurrentPassword ? 'text' : 'password'" 
                    id="currentPassword" 
                    v-model="passwordForm.currentPassword" 
                    placeholder="Enter your current password"
                    required
                  />
                  <button 
                    type="button" 
                    class="toggle-password"
                    @click="showCurrentPassword = !showCurrentPassword"
                  >
                    <svg v-if="showCurrentPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="form-group">
                <label for="newPassword">New Password</label>
                <div class="password-input">
                  <input 
                    :type="showNewPassword ? 'text' : 'password'" 
                    id="newPassword" 
                    v-model="passwordForm.newPassword" 
                    placeholder="Enter your new password"
                    required
                  />
                  <button 
                    type="button" 
                    class="toggle-password"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <svg v-if="showNewPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
                <p class="input-hint">Password must be at least 8 characters long</p>
              </div>
              
              <div class="form-group">
                <label for="confirmPassword">Confirm New Password</label>
                <div class="password-input">
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    id="confirmPassword" 
                    v-model="passwordForm.confirmPassword" 
                    placeholder="Confirm your new password"
                    required
                  />
                  <button 
                    type="button" 
                    class="toggle-password"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="save-button" :disabled="isPasswordLoading">
                  <span v-if="isPasswordLoading">Updating...</span>
                  <span v-else>Update Password</span>
                </button>
              </div>
            </form>
          </div>
          
          <!-- Bookings Tab -->
          <div v-if="activeTab === 'bookings'" class="profile-tab">
            <h2>My Bookings</h2>
            <p class="tab-description">View and manage your service bookings</p>
            
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
            
            <div v-if="filteredBookings.length === 0" class="no-bookings">
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
                    <span>NPR {{ booking.price.toFixed(2) }}</span>
                  </div>
                </div>
                
                <div class="booking-provider">
                  <div class="provider-info">
                    <div class="provider-avatar">{{ booking.providerInitials }}</div>
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
                  >
                    Cancel Booking
                  </button>
                  
                  <button 
                    v-if="booking.status === 'completed' && !booking.reviewed" 
                    class="review-button"
                    @click="openReviewModal(booking)"
                  >
                    Leave Review
                  </button>
                  
                  <button class="details-button" @click="viewBookingDetails(booking.id)">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Reactive references
const activeTab = ref('personal');
const isLoading = ref(false);
const isPasswordLoading = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const bookingFilter = ref('all');
const profile = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
});
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const locations = ref([
  'Kathmandu',
  'Pokhara',
  'Lalitpur',
  'Bhaktapur',
  'Biratnagar',
  'Birgunj',
  'Butwal',
  'Dharan',
  'Nepalgunj',
  'Itahari'
]);


bookings = ref([
  {
    id: 'BK-1001',
    serviceName: 'Home Cleaning',
    status: 'upcoming',
    date: 'May 15, 2023',
    time: '10:00 AM - 12:00 PM',
    location: 'Kathmandu',
    price: 1500,
    providerName: 'Cleaning Experts',
    providerInitials: 'CE',
    providerRating: 4.8,
    providerReviews: 124,
    reviewed: false
  },
  {
    id: 'BK-1002',
    serviceName: 'Plumbing Repair',
    status: 'completed',
    date: 'April 28, 2023',
    time: '2:00 PM - 3:30 PM',
    location: 'Kathmandu',
    price: 2000,
    providerName: 'FixIt Plumbing',
    providerInitials: 'FP',
    providerRating: 4.6,
    providerReviews: 89,
    reviewed: true
  },
  {
    id: 'BK-1003',
    serviceName: 'Electrical Repair',
    status: 'cancelled',
    date: 'April 20, 2023',
    time: '11:00 AM - 1:00 PM',
    location: 'Kathmandu',
    price: 1800,
    providerName: 'PowerFix Electricians',
    providerInitials: 'PE',
    providerRating: 4.7,
    providerReviews: 102,
    reviewed: false
  }
]);

// Router instance
const router = useRouter();

// Computed properties
const userInitials = computed(() => {
  const user = getUserData();
  if (user && user.firstName && user.lastName) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  } else if (user && user.name) {
    const nameParts = user.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }
    return user.name.charAt(0);
  }
  return 'U';
});

const userName = computed(() => {
  const user = getUserData();
  if (user && user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  } else if (user && user.name) {
    return user.name;
  }
  return 'User';
});

const userEmail = computed(() => {
  const user = getUserData();
  return user ? user.email : '';
});

const filteredBookings = computed(() => {
  if (bookingFilter.value === 'all') {
    return bookings.value;
  }
  return bookings.value.filter(booking => booking.status === bookingFilter.value);
});

// Functions
const getUserData = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

const loadUserProfile = () => {
  const user = getUserData();
  if (user) {
    profile.value.firstName = user.firstName || '';
    profile.value.lastName = user.lastName || '';
    profile.value.email = user.email || '';
    profile.value.phone = user.phone || '';
    profile.value.address = user.address || '';
  }
};

const updateProfile = () => {
  isLoading.value = true;

  // Simulate API call to update profile
  setTimeout(() => {
    // In a real app, you would make an API call to update the user profile
    const user = getUserData();
    if (user) {
      const updatedUser = {
        ...user,
        firstName: profile.value.firstName,
        lastName: profile.value.lastName,
        phone: profile.value.phone,
        address: profile.value.address
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
    }

    isLoading.value = false;
    alert('Profile updated successfully!');
  }, 1500);
};

const updatePassword = () => {
  // Validate passwords match
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New passwords do not match');
    return;
  }

  isPasswordLoading.value = true;

  // Simulate API call to update password
  setTimeout(() => {
    isPasswordLoading.value = false;
    alert('Password updated successfully!');

    // Reset form
    passwordForm.value.currentPassword = '';
    passwordForm.value.newPassword = '';
    passwordForm.value.confirmPassword = '';
  }, 1500);
};

// Removed the updatePreferences function

const cancelBooking = (bookingId) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    // Simulate API call to cancel booking
    const bookingIndex = bookings.value.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      bookings.value[bookingIndex].status = 'cancelled';
      alert('Booking cancelled successfully!');
    }
  }
};

const openReviewModal = (booking) => {
  // In a real app, you would open a modal to leave a review
  alert(`Leave a review for ${booking.serviceName} by ${booking.providerName}`);
};

const viewBookingDetails = (bookingId) => {
  // In a real app, you would navigate to a booking details page
  alert(`View details for booking ${bookingId}`);
};

// Lifecycle hook
onMounted(() => {
  // Check if user is logged in
  if (!localStorage.getItem('token')) {
    router.push('/login?redirect=/profile');
    return;
  }

  // Load user profile data
  loadUserProfile();
});
</script>


<style scoped>
.profile-page {
  padding: 3rem 0;
  background-color: var(--light-bg);
  min-height: calc(100vh - 200px);
}

.profile-header {
  margin-bottom: 2rem;
}

.profile-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 0.5rem;
}

.profile-header p {
  color: #6b7280;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .profile-content {
    grid-template-columns: 300px 1fr;
  }
}

.profile-sidebar {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-avatar {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
}

.avatar-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.avatar-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.profile-menu {
  padding: 1rem 0;
}

.profile-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  transition: background-color 0.2s;
}

.profile-menu-item:hover {
  background-color: var(--light-bg);
}

.profile-menu-item.active {
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--primary);
  font-weight: 500;
}

.profile-main {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.profile-tab h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 0.5rem;
}

.tab-description {
  color: #6b7280;
  margin-bottom: 2rem;
}

.profile-form {
  max-width: 800px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.input-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-top: 0.25rem;
}

.checkbox-group label {
  margin-bottom: 0;
}

.form-actions {
  margin-top: 2rem;
}

.save-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-button:hover {
  background-color: var(--primary-dark);
}

.save-button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

/* Bookings tab styles */
.booking-filters {
  margin-bottom: 1.5rem;
}

.filter-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
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

.no-bookings {
  padding: 3rem 0;
  text-align: center;
  color: #6b7280;
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
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.booking-service {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.booking-service h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
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
  background-color: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.provider-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  font-weight: 600;
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
}

.details-button:hover {
  background-color: #e5e7eb;
}
</style>