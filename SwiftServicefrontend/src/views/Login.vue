<template>
  <main class="login-page">
    <div class="container">
      <div class="login-container">
        <div class="login-form-container">
          <h1>Welcome Back</h1>
          <p class="login-subtitle">Sign in to your SwiftService account</p>
          
          <form class="login-form" @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <div class="password-input">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="password" 
                  placeholder="Enter your password"
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
            </div>
            
            <div class="form-options">
              <div class="remember-me">
                <input type="checkbox" id="remember" v-model="rememberMe" />
                <label for="remember">Remember me</label>
              </div>
              <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
            </div>
            
            <button 
              type="submit" 
              class="login-button"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Logging in...</span>
              <span v-else>Log In</span>
            </button>
            
            <div class="login-divider">
              <span>or</span>
            </div>
            
            <div class="social-login">
              <button type="button" class="social-button google">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
                </svg>
                Continue with Google
              </button>
              <button type="button" class="social-button facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z"></path>
                </svg>
                Continue with Facebook
              </button>
            </div>
            
            <div class="register-link">
              Don't have an account? <router-link to="/register">Sign up</router-link>
            </div>
          </form>
        </div>
        
        <div class="login-image">
          <div class="image-placeholder"></div>
          <div class="login-testimonial">
            <p>"SwiftService has transformed how I find and book services. It's so convenient!"</p>
            <div class="testimonial-author">
              <div class="avatar-placeholder"></div>
              <div>
                <h4>Aarav Sharma</h4>
                <p>Kathmandu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref(null);
const router = useRouter();
const route = useRoute();

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};


const handleLogin = () => {
  isLoading.value = true;
  error.value = null;
  
  setTimeout(() => {
  
    const userData = {
      id: 1,
      name: 'Test User',
      email: email.value,
      token: 'sample-jwt-token'
    };

    localStorage.setItem('token', userData.token);

    if (rememberMe.value) {
      localStorage.setItem('user', JSON.stringify(userData));
    }

    isLoading.value = false;

    router.push('/');
  }, 1500);
};

// Check if there's a redirect query parameter
onMounted(() => {
  const redirect = route.query.redirect;
  const redirectPath = redirect || '/';
});
</script>


<style scoped>
.login-page {
  padding: 3rem 0;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
}

.login-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .login-container {
    grid-template-columns: 1fr 1fr;
  }
}

.login-form-container {
  background-color: white;
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.login-form-container h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #6b7280;
  margin-bottom: 2rem;
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remember-me input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: var(--primary);
}

.forgot-password {
  color: var(--primary);
  text-decoration: none;
  font-size: 0.875rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: var(--primary-dark);
}

.login-button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

.login-divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.login-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--border-color);
}

.login-divider span {
  position: relative;
  padding: 0 0.75rem;
  background-color: white;
  color: #6b7280;
  font-size: 0.875rem;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.social-button.google {
  color: #ea4335;
}

.social-button.facebook {
  color: #1877f2;
}

.social-button:hover {
  background-color: var(--light-bg);
}

.register-link {
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.register-link a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.login-image {
  display: none;
  position: relative;
}

@media (min-width: 1024px) {
  .login-image {
    display: block;
  }
}

.image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 0.875rem;
}

.login-testimonial {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.login-testimonial > p {
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