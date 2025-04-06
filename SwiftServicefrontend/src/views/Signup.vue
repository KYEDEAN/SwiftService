<!-- Signup.vue -->
<template>
  <div class="signup-page">
    <h1>Sign Up</h1>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          v-model="confirmPassword"
          required
        />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Signing Up...' : 'Sign Up' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <p>
      Already have an account? <router-link to="/login">Log In</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Reactive state
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref(null);

// Router
const router = useRouter();

// Base API URL
const API_URL = 'http://localhost:8000';

// Signup method
const signup = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    const response = await axios.post(`${API_URL}/users/`, userData);
    console.log('Signup response:', response.data);

    // Log the user in after signup
    const loginResponse = await axios.post(`${API_URL}/token/`, {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem('token', loginResponse.data.access);
    console.log('Login after signup successful:', loginResponse.data);

    // Redirect to services page
    router.push('/services');
  } catch (err) {
    console.error('Error during signup:', err);
    if (err.response && err.response.data) {
      const errors = err.response.data;
      if (errors.email) {
        error.value = `Email error: ${errors.email.join(', ')}`;
      } else if (errors.username) {
        error.value = `Username error: ${errors.username.join(', ')}`;
      } else if (errors.password) {
        error.value = `Password error: ${errors.password.join(', ')}`;
      } else {
        error.value = 'Failed to sign up. Please try again.';
      }
    } else {
      error.value = 'Failed to sign up. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.signup-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
}

p {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
}

p a {
  color: #2563eb;
  text-decoration: none;
}

p a:hover {
  text-decoration: underline;
}
</style>