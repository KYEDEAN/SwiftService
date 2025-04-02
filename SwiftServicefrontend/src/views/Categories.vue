<template>
  <div class="container my-5">
    <h2 class="text-center">Service Categories</h2>
    <div class="row mt-4">
      <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import CategoryCard from '../components/CategoryCard.vue';
import { getCategories } from '../services/api.js';

const categories = ref([]);

onMounted(async () => {
try {
  categories.value = await getCategories();
  console.log("Fetched categories:", categories.value);
} catch (error) {
  console.error("Error fetching categories:", error);
}
});
</script>


<style>
.container {
  max-width: 1200px;
}
</style>