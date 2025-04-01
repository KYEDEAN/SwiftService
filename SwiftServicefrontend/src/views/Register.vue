<template>
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
      <Card title="Create Account">
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="name" class="form-label">Full Name</label>
            <input type="text" id="name" v-model="name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" id="email" v-model="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>
      </Card>
    </div>
  </template>
  
  <script>
  import Card from '../components/Card.vue';
  
  export default {
    components: {
      Card,
    },
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      handleRegister() {
        // Handle register logic (e.g., API request to create the user)
        if (this.password !== this.confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        console.log("Registering", this.name, this.email, this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    height: 100vh;
  }
  </style>
  