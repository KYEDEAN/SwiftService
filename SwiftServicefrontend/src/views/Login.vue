<template>
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
      <Card title="Login">
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" id="email" v-model="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-control" required />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Login</button>
            <router-link to="/register" class="btn btn-link">Create an Account</router-link>
          </div>
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
        email: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        console.log("Logging in with", this.email, this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    height: 100vh;
  }
  </style>
  