<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>


<style>
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  color: #212529;
}

.navbar {
  background-color: #007bff;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white !important;
}

.navbar-nav .nav-link {
  color: white !important;
}

.footer {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px 0;
}
</style>
