<template>
    <div class="col-md-4">
      <div class="card">
        <img :src="`/src/assets/${service.image}`" class="card-img-top" alt="Service Image" />
        <div class="card-body">
          <h5 class="card-title">{{ service.title }}</h5>
          <p class="card-text">{{ service.description }}</p>
          <p class="card-price">Price: NPR {{ service.price }}</p>
          <p class="card-price">Price: NPR {{ service.is_available }}</p>
          <router-link :to="`/service/${service.id}`" class="btn btn-primary">View Details</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      service: Object,
    },
  };
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 20px;
  }
  .card-price {
    font-weight: bold;
    color: #f39c12;
  }
  </style>
  