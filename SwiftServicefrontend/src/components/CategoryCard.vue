<template>
    <div class="col-md-4">
      <div class="card">
        <img :src="`/src/assets/${category.image}`" class="card-img-top" alt="Category Image" />
        <div class="card-body">
          <h5 class="card-title">{{ category.name }}</h5>
          <p class="card-text">{{ category.description }}</p>
          <router-link :to="`/categories/${category.id}`" class="btn btn-primary">View Services</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      category: Object,
    },
  };
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 20px;
  }
  .card-title {
    font-weight: bold;
  }
  .card-text {
    font-size: 14px;
  }
  </style>
  