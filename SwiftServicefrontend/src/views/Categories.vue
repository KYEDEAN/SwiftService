<template>
    <div class="container my-5">
      <h2 class="text-center">Service Categories</h2>
      <div class="row mt-4">
        <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
      </div>
    </div>
  </template>
  
  <script>
  import CategoryCard from '../components/CategoryCard.vue';
  
  export default {
    components: {
      CategoryCard,
    },
    data() {
      return {
        categories: [
          { id: 1, name: 'Home Services', image: 'home-services.jpg' },
          { id: 2, name: 'Automobile', image: 'automobile.jpg' },
          { id: 3, name: 'Health & Wellness', image: 'health.jpg' },
          { id: 4, name: 'Electronics Repair', image: 'electronics.jpg' },
          { id: 5, name: 'Beauty & Salon', image: 'salon.jpg' }
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