<template>
  <div>
    <section class="hero bg-primary text-white py-5">
      <div class="container text-center">
        <h1 class="display-4">Welcome to SwiftService</h1>
        <p class="lead">Your one-stop service provider in Nepal</p>
        <router-link to="/services" class="btn btn-light btn-lg">Browse Services</router-link>
      </div>
    </section>

  
    <section class="featured-services py-5">
      <div class="container">
        <h2 class="text-center mb-4">Our Featured Services</h2>
        <div class="row">
          <ServiceCard v-for="service in services" :key="service.id" :service="service" />
        </div>
      </div>
    </section>

    
    <section class="about py-5">
      <div class="container text-center">
        <h2>About SwiftService</h2>
        <p>SwiftService is committed to providing fast and reliable services across Nepal. Whether you need personal care, home maintenance, or professional assistance, we are here to help.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCategories, getServices } from '../services/api.js';
import CategoryCard from '../components/CategoryCard.vue';
import ServiceCard from '../components/ServiceCard.vue';

const categories = ref([]); // 
const services = ref([]); 

onMounted(async () => {
console.log("Fetching services...");
categories.value= await getCategories();
services.value = await getServices();
console.log("Fetched Services:", services.value); 
});

</script>


<style scoped>
.hero {
  background-color:#3399FF;
  color: white;
}

.featured-services {
  background-color: #f8f9fa;
}

.about {
  background-color: #ffffff;
}
</style>
