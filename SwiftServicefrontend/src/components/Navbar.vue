<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="@/assets/logo1.jpg" alt="SwiftService" class="logo me-2"/>
        SwiftService
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/services">Services</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/categories">Categories</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/providers">Providers</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link btn-login" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>

.navbar {
  background: linear-gradient(90deg, #007bff, #6610f2);
  padding: 12px 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Navbar Brand */
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white !important;
  transition: transform 0.3s ease-in-out;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

/* Logo */
.logo {
  width: 45px; /* Adjusted size */
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

/* Navbar Links */
.navbar-nav .nav-link {
  font-size: 1rem;
  color: white !important;
  font-weight: 500;
  margin: 0 10px;
  transition: all 0.3s ease-in-out;
  position: relative;
}

/* Hover Animation */
.navbar-nav .nav-link::after {
  content: "";
  width: 0;
  height: 2px;
  background-color: white;
  position: absolute;
  left: 50%;
  bottom: 0;
  transition: all 0.3s ease-in-out;
}

.navbar-nav .nav-link:hover::after {
  width: 100%;
  left: 0;
}

/* Active Link */
.router-link-exact-active {
  color: white !important;
  font-weight: bold;
}

/* Login Button */
.btn-login {
  background-color: white;
  color: #007bff !important;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.btn-login:hover {
  background-color: #85cfcc;
  color: #333 !important;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .navbar-nav {
    text-align: center;
  }

  .navbar-nav .nav-item {
    margin-bottom: 10px;
  }
}
</style>
