<template>
    <div class="container my-5">
      <h2 class="text-center">Our Services</h2>
      <div class="row mt-4">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
    </div>
  </template>
  
  <script>
  import ServiceCard from '../components/ServiceCard.vue';
  
  export default {
    components: {
      ServiceCard,
    },
    data() {
      return {
        services: [
          { 
            id: 1, 
            name: 'Home Cleaning', 
            price: 'रु 1500', 
            image: 'cleaning.jpg' 
        },
          { 
            id: 2, 
            name: 'Plumbing', 
            price: 'रु 1200', 
            image: 'plumbing.jpg' 
          },
          { 
            id: 3, 
            name: 'Electrical Repair', 
            price: 'रु 1300', 
            image: 'electrical.jpg' 
          },
          { 
            id: 4, 
            name: 'Pest Control', 
            price: 'रु 1400', 
            image: 'pestcontrol.jpg' 
          },
          { 
            id: 5, 
            name: 'Carpentry', 
            price: 'रु 1600', 
            image: 'carpentry.jpg' 
          }
        ]
      };
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 1200px;
  }
  </style>