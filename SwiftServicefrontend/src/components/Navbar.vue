<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <div class="navbar-left">
          <router-link to="/" class="logo">
            <img src="../assets/logo1.jpg" alt="SwiftService" class="logo-image" />
          </router-link>
        </div>
        
        <div class="navbar-center">
          <div class="navbar-links">
            <router-link to="/services" class="navbar-link">Services</router-link>
            <router-link to="/how-it-works" class="navbar-link">How It Works</router-link>
            <router-link to="/provider-registration" class="navbar-link">Join as Provider</router-link>
            <router-link to="/about" class="navbar-link">About Us</router-link>
          </div>
        </div>
        
        <div class="navbar-right">
          <div class="location-selector">
            <button class="location-button" @click="toggleLocationDropdown">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ selectedLocation }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="location-dropdown" v-if="showLocationDropdown">
              <div class="location-search">
                <input type="text" placeholder="Search location..." v-model="locationSearch" />
              </div>
              <div class="location-list">
                <button 
                  v-for="location in filteredLocations" 
                  :key="location" 
                  class="location-option"
                  :class="{ 'active': location === selectedLocation }"
                  @click="selectLocation(location)"
                >
                  {{ location }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- User is logged in -->
          <div v-if="isLoggedIn" class="user-menu">
            <button class="user-menu-button" @click="toggleUserMenu">
              <div class="user-avatar">
                {{ userInitials }}
              </div>
            </button>
            <div class="user-dropdown" v-if="showUserMenu">
              <div class="user-info">
                <p class="user-name">{{ userName }}</p>
                <p class="user-email">{{ userEmail }}</p>
              </div>
              <div class="user-menu-items">
                <router-link to="/profile" class="user-menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  My Profile
                </router-link>
                <router-link to="/booking" class="user-menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  My Bookings
                </router-link>
                <button @click="logout" class="user-menu-item logout">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <!-- User is not logged in -->
          <div v-else class="auth-buttons">
            <router-link to="/login" class="login-button">Log In</router-link>
            <router-link to="/register" class="register-button">Sign Up</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const selectedLocation = ref('Kathmandu');
const showLocationDropdown = ref(false);
const locationSearch = ref('');
const showUserMenu = ref(false);
const router = useRouter();

const locations = [
  'Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur',
  'Biratnagar', 'Birgunj', 'Butwal', 'Dharan',
  'Nepalgunj', 'Itahari'
];

const filteredLocations = computed(() => {
  if (!locationSearch.value) return locations;
  return locations.filter(location => 
    location.toLowerCase().includes(locationSearch.value.toLowerCase())
  );
});

const isLoggedIn = computed(() => !!localStorage.getItem('token'));

const getUserData = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

const userName = computed(() => {
  const user = getUserData();
  if (user?.firstName && user?.lastName) {
    return `${user.firstName} ${user.lastName}`;
  } else if (user?.name) {
    return user.name;
  }
  return 'User';
});

const userEmail = computed(() => getUserData()?.email || '');

const userInitials = computed(() => {
  const user = getUserData();
  if (user?.firstName && user?.lastName) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  } else if (user?.name) {
    const nameParts = user.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }
    return user.name.charAt(0);
  }
  return 'U';
});


const toggleLocationDropdown = () => {
  showLocationDropdown.value = !showLocationDropdown.value;
  if (showLocationDropdown.value) showUserMenu.value = false;
};

const selectLocation = (location) => {
  selectedLocation.value = location;
  showLocationDropdown.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  if (showUserMenu.value) showLocationDropdown.value = false;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  showUserMenu.value = false;
  router.push('/');
  alert('You have been successfully logged out.');
};

onMounted(() => {
  document.addEventListener('click', (event) => {
    const locationSelector = document.querySelector('.location-selector');
    const userMenu = document.querySelector('.user-menu');

    if (locationSelector && !locationSelector.contains(event.target)) {
      showLocationDropdown.value = false;
    }

    if (userMenu && !userMenu.contains(event.target)) {
      showUserMenu.value = false;
    }
  });
});
</script>


<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 2rem;
}

.logo-image {
  height: 40px;
  width: auto;
}

.navbar-center {
  display: none;
}

@media (min-width: 1024px) {
  .navbar-center {
    display: block;
    flex: 1;
  }
}

.navbar-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.navbar-link {
  text-decoration: none;
  color: #4b5563;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
  white-space: nowrap;
}

.navbar-link:hover {
  color: var(--primary);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.location-selector {
  position: relative;
}

.location-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #4b5563;
  transition: border-color 0.2s;
  white-space: nowrap;
}

.location-button:hover {
  border-color: var(--primary);
}

.location-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 250px;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
}

.location-search {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.location-search input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.location-list {
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.location-option {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  text-align: left;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: #4b5563;
  transition: background-color 0.2s;
}

.location-option:hover {
  background-color: var(--light-bg);
}

.location-option.active {
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--primary);
  font-weight: 500;
}

.auth-buttons {
  display: flex;
  gap: 0.75rem;
}

.login-button {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.login-button:hover {
  background-color: rgba(37, 99, 235, 0.1);
}

.register-button {
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.register-button:hover {
  background-color: var(--primary-dark);
}

/* User menu styles */
.user-menu {
  position: relative;
}

.user-menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 250px;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  overflow: hidden;
}

.user-info {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.user-name {
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.user-email {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

.user-menu-items {
  padding: 0.5rem 0;
}

.user-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.user-menu-item:hover {
  background-color: var(--light-bg);
}

.user-menu-item.logout {
  color: #ef4444;
}

/* Mobile menu styles */
@media (max-width: 1023px) {
  .navbar-content {
    flex-wrap: wrap;
  }
  
  .navbar-left {
    flex: 1;
  }
  
  .navbar-right {
    justify-content: flex-end;
    flex: 1;
  }
  
  .navbar-center {
    order: 3;
    width: 100%;
    margin-top: 1rem;
  }
  
  .navbar-links {
    justify-content: space-between;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
}
</style>