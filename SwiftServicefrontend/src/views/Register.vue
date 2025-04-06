<template>
  <main class="register-page">
    <div class="container">
      <div class="register-container">
        <div class="register-form-container">
          <h1>Create an Account</h1>
          <p class="register-subtitle">Join SwiftService to find and book services easily</p>
          
          <form class="register-form" @submit.prevent="handleRegister">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="form.firstName" 
                  placeholder="Enter your first name"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="form.lastName" 
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="form.phone" 
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <div class="password-input">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="form.password" 
                  placeholder="Create a password"
                  required
                />
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="togglePassword"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
              <p class="password-hint">Password must be at least 8 characters long</p>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                v-model="form.confirmPassword" 
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <div class="form-group checkbox-group">
              <input type="checkbox" id="terms" v-model="form.termsAccepted" required />
              <label for="terms">
                I agree to the <a href="#" class="text-link">Terms of Service</a> and <a href="#" class="text-link">Privacy Policy</a>
              </label>
            </div>
            
            <button 
              type="submit" 
              class="register-button"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Creating account...</span>
              <span v-else>Create Account</span>
            </button>
            
            <div class="login-link">
              Already have an account? <router-link to="/login">Log in</router-link>
            </div>
          </form>
        </div>
        
        <div class="register-benefits">
          <h2>Why Join SwiftService?</h2>
          
          <div class="benefits-list">
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div class="benefit-content">
                <h3>Save Time</h3>
                <p>Book services quickly and efficiently without the hassle of multiple phone calls.</p>
              </div>
            </div>
            
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div class="benefit-content">
                <h3>Verified Providers</h3>
                <p>All service providers are thoroughly vetted and reviewed for quality assurance.</p>
              </div>
            </div>
            
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div class="benefit-content">
                <h3>Secure Payments</h3>
                <p>Pay securely through our platform with multiple payment options.</p>
              </div>
            </div>
            
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div class="benefit-content">
                <h3>Customer Support</h3>
                <p>Our dedicated support team is available to assist you with any issues or questions.</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial">
            <p>"SwiftService has made finding reliable service providers so much easier. I've used it for everything from plumbing to home cleaning!"</p>
            <div class="testimonial-author">
              <div class="avatar-placeholder"></div>
              <div>
                <h4>Priya Sharma</h4>
                <p>Satisfied Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {registerUser} from '../services/api'; // Import your API function for registration

// Reactive references for form and state
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false
});
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref(null);
const router = useRouter();

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Handle registration
const handleRegister = async() => {
  // Validate passwords match
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  isLoading.value = true;
  error.value = null;

  try{
    const payload={
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password
    };
    const response = await registerUser(payload); // Call your API function

    localStorage.setItem('token', response.data.token); // Store token in localStorage
    localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
    router.push('/');
  } catch(err){
    console.error('Registration failed:',err.response?.data || err.message);
    alert('Registration failed. Please try again.');
  } finally{
    isLoading.value = false;
  }
};
</script>


<style scoped>
.register-page {
  padding: 3rem 0;
  background-color: var(--light-bg);
}

.register-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .register-container {
    grid-template-columns: 1fr 1fr;
  }
}

.register-form-container {
  background-color: white;
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.register-form-container h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 0.5rem;
}

.register-subtitle {
  color: #6b7280;
  margin-bottom: 2rem;
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

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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

.password-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
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

.text-link {
  color: var(--primary);
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1.5rem;
}

.register-button:hover {
  background-color: var(--primary-dark);
}

.register-button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.login-link a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.register-benefits {
  padding: 2.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.register-benefits h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 1.5rem;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.benefit-item {
  display: flex;
  gap: 1rem;
}

.benefit-icon {
  width: 3rem;
  height: 3rem;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}

.benefit-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.benefit-content p {
  font-size: 0.875rem;
  color: #6b7280;
}

.testimonial {
  background-color: var(--light-bg);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border-left: 4px solid var(--primary);
}

.testimonial > p {
  font-style: italic;
  color: #4b5563;
  margin-bottom: 1rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar-placeholder {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #e5e7eb;
}

.testimonial-author h4 {
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.testimonial-author p {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
}
</style>