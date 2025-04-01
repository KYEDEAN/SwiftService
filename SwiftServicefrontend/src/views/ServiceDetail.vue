<template>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <img :src="service.image" class="img-fluid" alt="Service Image">
        </div>
        <div class="col-md-6">
          <h2>{{ service.name }}</h2>
          <p class="text-muted">Price: <strong>{{ service.price }}</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet metus vitae elit sollicitudin gravida.</p>
          <button class="btn btn-primary">Book Now</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        service: {}
      };
    },
    created() {
      const services = [
        { id: 1, name: 'Home Cleaning', price: 'रु 1500', image: 'cleaning.jpg' },
        { id: 2, name: 'Plumbing', price: 'रु 1200', image: 'plumbing.jpg' },
        { id: 3, name: 'Electrical Repair', price: 'रु 1300', image: 'electrical.jpg' },
        { id: 4, name: 'Pest Control', price: 'रु 1400', image: 'pestcontrol.jpg' },
        { id: 5, name: 'Carpentry', price: 'रु 1600', image: 'carpentry.jpg' }
      ];
      
      const id = parseInt(this.$route.params.id);
      this.service = services.find(service => service.id === id) || {};
    }
  };
  </script>
  
  <style>
  img {
    border-radius: 10px;
  }
  </style>
  