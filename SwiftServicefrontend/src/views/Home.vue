<template>
  <main>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
          <h1>Book Home Service Providers at your fingertips</h1>
          <p>Search, compare and match with Service Providers of your choice in 60 Seconds</p>
          
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Try 'plumbing'" 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
            />
            <button class="search-button" @click="handleSearch">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <div class="popular-searches">
            <span>Popular searches:</span>
            <div class="search-tags">
              <a 
                v-for="(search, index) in popularSearches" 
                :key="index" 
                href="#"
                @click.prevent="searchQuery = search; handleSearch()"
              >
                {{ search }}
              </a>
            </div>
          </div>
        </div>
        
        <div class="hero-image">
          <div class="image-container">
            <img src="../assets/service-provider.png" alt="Service Provider" />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Browse by Category</h2>
        
        <div class="categories-grid">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category" 
          />
        </div>
      </div>
    </section>
    
    <!-- How It Works Section -->
    <section class="how-it-works-section">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3>Search</h3>
            <p>Find the service you need from our wide range of categories</p>
          </div>
          
          <div class="step-card">
            <div class="step-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>Book</h3>
            <p>Select a service provider and book an appointment</p>
          </div>
          
          <div class="step-card">
            <div class="step-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
            </div>
            <h3>Relax</h3>
            <p>Sit back and relax while our professionals handle your needs</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Services Section -->
    <section class="featured-services-section">
      <div class="container">
        <h2 class="section-title">Featured Services</h2>
        
        <div class="services-grid">
          <ServiceCard 
            v-for="service in featuredServices" 
            :key="service.id" 
            :service="service"的人员
          />
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">What Our Customers Say</h2>
        
        <div class="testimonials-grid">
          <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= testimonial.rating }">★</span>
            </div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img :src="testimonial.avatar" alt="Customer Avatar" />
              </div>
              <div class="author-info">
                <h4>{{ testimonial.name }}</h4>
                <p>{{ testimonial.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard.vue';
import ServiceCard from '../components/ServiceCard.vue';

// Vue Router instance
const router = useRouter();

// Reactive state variables
const searchQuery = ref('');
const popularSearches = ref(['Electrician', 'Plumber', 'AC Installation', 'Cleaning']);
const categories = ref([]);
const featuredServices = ref([]);
const testimonials = ref([
  {
    rating: 5,
    text: 'The plumber arrived on time and fixed our leaking pipe quickly. Very professional service!',
    name: 'Rajesh Sharma',
    location: 'Kathmandu',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    rating: 4,
    text: 'Great service for home cleaning. The staff was polite and thorough with their work.',
    name: 'Sita Thapa',
    location: 'Lalitpur',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    rating: 5,
    text: 'I needed an electrician urgently and SwiftService connected me with one within an hour!',
    name: 'Anil Gurung',
    location: 'Bhaktapur',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
]);

// Functions
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } });
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/services/categories/');
    categories.value = response.data.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon || 'default-icon', // Use a fallback if icon is null
      slug: category.name.toLowerCase().replace(/\s+/g, '-'),
      skills: category.skills
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    categories.value = [];
  }
};

const fetchFeaturedServices = async () => {
  try {
    featuredServices.value = [
      {
        id: 1,
        title: 'Plumbing Services',
        provider: 'John Plumber',
        rating: 4.8,
        reviews: 124,
        price: 'From Rs. 2,500/hr',
        image: 'https://via.placeholder.com/300x200?text=Plumbing'
      },
      {
        id: 2,
        title: 'Electrical Repairs',
        provider: 'ElectroFix',
        rating: 4.7,
        reviews: 98,
        price: 'From Rs. 3,000/hr',
        image: 'https://via.placeholder.com/300x200?text=Electrical'
      },
      {
        id: 3,
        title: 'House Cleaning',
        provider: 'CleanHome',
        rating: 4.9,
        reviews: 156,
        price: 'From Rs. 2,000/hr',
        image: 'https://via.placeholder.com/300x200?text=Cleaning'
      },
      {
        id: 4,
        title: 'AC Installation',
        provider: 'CoolAir',
        rating: 4.6,
        reviews: 87,
        price: 'From Rs. 5,000/hr',
        image: 'https://via.placeholder.com/300x200?text=AC+Installation'
      }
    ];
  } catch (error) {
    console.error('Error fetching featured services:', error);
  }
};

// Fetch data on component mount
onMounted(async () => {
  await fetchCategories();
  fetchFeaturedServices();
});
</script>

<style scoped>
.hero-section {
  background: linear-gradient(to right, #eff6ff, #f8fafc);
  padding: 4rem 0;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1400px) {
  .hero-container {
    grid-template-columns: 1fr 1fr;
    max-width: 1400px;
    margin: 0 auto;
  }
}

.hero-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1.2;
  margin-bottom: 1rem;
}

@media (min-width: 1200px) {
  .hero-content h1 {
    font-size: 3rem;
  }
}

.hero-content p {
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.search-box input {
  width: 100%;
  padding: 1rem 3.5rem 1rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
}

.search-button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.5rem;
  background-color: var(--primary);
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popular-searches {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}

.search-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.search-tags a {
  padding: 0.25rem 0.75rem;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  color: #666;
  text-decoration: none;
  transition: all 0.2s;
}

.search-tags a:hover {
  background-color: var(--light-bg);
}

.hero-image {
  display: flex;
  justify-content: center;
}

.image-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
}

.image-container::before {
  content: '';
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: -1rem;
  bottom: -1rem;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 50%;
  z-index: -1;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

@media (min-width: 1200px) {
  .section-title {
    font-size: 2.25rem;
  }
}

.categories-section {
  padding: 4rem 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 640px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1400px) {
  .categories-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 1.5rem;
  }
}

.how-it-works-section {
  padding: 4rem 0;
  background-color: var(--light-bg);
}

.steps-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 640px) {
  .steps-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.step-card {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.step-icon {
  width: 4rem;
  height: 4rem;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--primary);
}

.step-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.step-card p {
  color: #666;
  font-size: 0.875rem;
}

.featured-services-section {
  padding: 4rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1400px) {
  .services-grid {
    gap: 2rem;
  }
}

.testimonials-section {
  padding: 4rem 0;
  background-color: var(--light-bg);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .testimonials-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1400px) {
  .testimonials-grid {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.testimonial-card {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.testimonial-rating {
  margin-bottom: 1rem;
}

.star {
  color: #d1d5db;
  font-size: 1.25rem;
}

.star.filled {
  color: #fbbf24;
}

.testimonial-text {
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #4b5563;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info h4 {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.author-info p {
  font-size: 0.75rem;
  color: #6b7280;
}
</style>