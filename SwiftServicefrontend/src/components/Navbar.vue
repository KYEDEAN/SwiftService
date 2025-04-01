<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">SwiftService</router-link>
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
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar"
  };
  </script>
  
  <style>
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: white !important;
  }
  </style>