<!-- ServiceCard.vue -->
<template>
  <div class="service-card">
    <img :src="service.image" :alt="service.title" class="service-image" />
    <div class="service-content">
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
      <p>{{ service.price }}</p>
      <p>Rating: {{ service.rating }} ({{ service.reviews }} reviews)</p>
      <router-link :to="`/services/${service.id}`">View Details</router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  service: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.service-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.service-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.service-content {
  padding: 1rem;
}

.service-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.service-content p {
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.service-content a {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.375rem;
  text-decoration: none;
}
</style>