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

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getServiceDetail } from "../services/api.js";

const route = useRoute();
const service = ref(null);

onMounted(async () => {
service.value = await getServiceDetail(route.params.id);
});
</script>


<style>
img {
  border-radius: 10px;
}
</style>
