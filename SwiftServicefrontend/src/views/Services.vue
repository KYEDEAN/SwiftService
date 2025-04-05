<template>
  <main class="services-page">
    <div class="container">
      <div class="page-header">
        <h1>Services</h1>
        <div class="sort-container">
          <label for="sort">Sort by:</label>
          <select id="sort" v-model="sortBy" class="sort-select">
            <option value="popularity">Popularity</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      
      <div class="services-layout">
        <!-- Sidebar Filters -->
        <aside class="filters-sidebar">
          <div class="filter-section">
            <h3>Categories</h3>
            <div class="filter-options">
              <div class="filter-option" v-for="category in categories" :key="category.id">
                <input 
                  type="checkbox" 
                  :id="`category-${category.id}`" 
                  :value="category.id" 
                  v-model="selectedCategories"
                />
                <label :for="`category-${category.id}`">{{ category.name }}</label>
              </div>
            </div>
          </div>
          
          <div class="filter-section">
            <h3>Price Range</h3>
            <div class="price-range">
              <input 
                type="number" 
                placeholder="Min" 
                v-model="priceMin" 
                class="price-input"
              />
              <span class="price-separator">-</span>
              <input 
                type="number" 
                placeholder="Max" 
                v-model="priceMax" 
                class="price-input"
              />
            </div>
          </div>
          
          <div class="filter-section">
            <h3>Rating</h3>
            <div class="filter-options">
              <div class="filter-option" v-for="rating in ratings" :key="rating.value">
                <input 
                  type="checkbox" 
                  :id="`rating-${rating.value}`" 
                  :value="rating.value" 
                  v-model="selectedRatings"
                />
                <label :for="`rating-${rating.value}`" class="rating-label">
                  <div class="stars">
                    <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= rating.value }">★</span>
                  </div>
                  <span>& up</span>
                </label>
              </div>
            </div>
          </div>
          
          <button class="reset-button" @click="resetFilters">Reset Filters</button>
        </aside>
        
        <!-- Services Grid -->
        <div class="services-grid">
          <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading services...</p>
          </div>
          
          <div v-else-if="filteredServices.length === 0" class="no-results">
            <p>No services found matching your filters.</p>
            <button class="reset-button" @click="resetFilters">Reset Filters</button>
          </div>
          
          <div v-else class="services-grid-container">
            <ServiceCard 
              v-for="service in filteredServices" 
              :key="service.id" 
              :service="service" 
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard.vue';

// Reactive references
const loading = ref(true);
const services = ref([]);
const categories = ref([]);
const selectedCategories = ref([]);
const priceMin = ref('');
const priceMax = ref('');
const selectedRatings = ref([]);
const sortBy = ref('popularity');
const ratings = ref([
  { value: 5, label: '5 Stars' },
  { value: 4, label: '4 Stars' },
  { value: 3, label: '3 Stars' },
  { value: 2, label: '2 Stars' },
  { value: 1, label: '1 Star' }
]);
const categoryFromRoute = ref(null);

// Route info
const route = useRoute();

// Computed property to filter services
const filteredServices = computed(() => {
  let result = [...services.value];

  // Filter by category (using skill as category)
  if (selectedCategories.value.length > 0) {
    result = result.filter(service =>
      selectedCategories.value.includes(service.skill)
    );
  }

  // Filter by price
  if (priceMin.value !== '') {
    const min = parseFloat(priceMin.value);
    result = result.filter(service => parseFloat(service.price) >= min);
  }

  if (priceMax.value !== '') {
    const max = parseFloat(priceMax.value);
    result = result.filter(service => parseFloat(service.price) <= max);
  }

  // Filter by rating (assuming we don't have rating data yet)
  if (selectedRatings.value.length > 0) {
    const minRating = Math.min(...selectedRatings.value);
    result = result.filter(service => (service.rating || 0) >= minRating);
  }

  // Sort results
  switch (sortBy.value) {
    case 'price_low':
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case 'price_high':
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case 'rating':
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'popularity':
    default:
      // Using created_at as a proxy for popularity (newer = more popular)
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
  }

  return result;
});

// Methods
const fetchServices = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://localhost:8000/services/services');
    services.value = response.data.map(service => ({
      id: service.id,
      title: service.title,
      provider: service.provider,
      providerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', // Default avatar
      categoryId: service.skill, // Using skill as category
      categoryName: service.skill,
      rating: service.rating || 0, // Default rating if not provided
      reviews: service.reviews || 0, // Default reviews if not provided
      price: `Rs. ${parseFloat(service.price).toLocaleString('en-IN')}`,
      image: 'https://via.placeholder.com/300x200?text=' + service.title.replace(/\s+/g, '+'),
      description: service.description,
      is_available: service.is_available
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    services.value = []; // Set empty array on error
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/services/services');
    const uniqueSkills = [...new Set(response.data.map(service => service.skill))];
    categories.value = uniqueSkills.map((skill, index) => ({
      id: skill,
      name: skill,
      slug: skill.toLowerCase().replace(/\s+/g, '-')
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    categories.value = [];
  }
};

const resetFilters = () => {
  selectedCategories.value = categoryFromRoute.value ? [categoryFromRoute.value] : [];
  priceMin.value = '';
  priceMax.value = '';
  selectedRatings.value = [];
  sortBy.value = 'popularity';
};

const checkCategoryFromRoute = () => {
  const categorySlug = route.params.category;
  if (categorySlug) {
    const category = categories.value.find(c => c.slug === categorySlug);
    if (category) {
      categoryFromRoute.value = category.id;
      selectedCategories.value = [category.id];
    }
  }
};

const checkSearchQuery = () => {
  const query = route.query.q;
  if (query) {
    console.log('Search query:', query);
  }
};

// Lifecycle hooks
onMounted(async () => {
  await fetchCategories();
  await fetchServices();
  checkCategoryFromRoute();
  checkSearchQuery();
});

// Watch for route changes
watch(() => route.params.category, (newCategorySlug, oldCategorySlug) => {
  if (newCategorySlug !== oldCategorySlug) {
    resetFilters();
    checkCategoryFromRoute();
    checkSearchQuery();
  }
});
</script>

<style scoped>
.services-page {
  padding: 2rem 0 4rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
}

.sort-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sort-container label {
  font-size: 0.875rem;
  color: #666;
}

.sort-select {
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
}

.services-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .services-layout {
    grid-template-columns: 280px 1fr;
  }
}

.filters-sidebar {
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.filter-section:last-child {
  margin-bottom: 1.5rem;
  padding-bottom: 0;
  border-bottom: none;
}

.filter-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-option input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: var(--primary);
}

.filter-option label {
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
}

.rating-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  display: flex;
}

.star {
  color: #d1d5db;
  font-size: 1rem;
}

.star.filled {
  color: #fbbf24;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.price-separator {
  color: #666;
}

.reset-button {
  width: 100%;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-button:hover {
  background-color: var(--light-bg);
}

.services-grid {
  min-height: 400px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(37, 99, 235, 0.2);
  border-radius: 50%;
  border-top-color: var(--primary);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-results {
  text-align: center;
  padding: 3rem 0;
}

.no-results p {
  margin-bottom: 1.5rem;
  color: #666;
}

.services-grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .services-grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .services-grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .services-grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1536px) {
  .services-grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>