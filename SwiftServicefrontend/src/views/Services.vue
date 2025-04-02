<template>
    <div class="container my-5">
      <h2 class="text-center">Our Services</h2>
      <div class="row mt-4">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import ServiceCard from '../components/ServiceCard.vue';
import { getServices } from '../services/api.js';

const services = ref([]);

onMounted(async () => {
  try {
    services.value = await getServices();
    console.log("Fetched services:", services.value);
  } catch (error) {
    console.error("Error fetching services:", error);
  }
});
</script>
  
  
  <style>
  .container {
    max-width: 1200px;
  }
  </style>