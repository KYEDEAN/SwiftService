import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Services from '@/views/Services.vue';
import ServiceDetail from '@/views/ServiceDetail.vue';
import Categories from '@/views/Categories.vue';
import Providers from '@/views/Providers.vue';
import About from '@/views/About.vue';
import Contact from '@/views/Contact.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

const routes = [
  { 
    path: '/', 
    component: Home 
  },
  { 
    path: '/services', 
    component: Services 
  },
  { 
    path: '/services/:id', 
    component: ServiceDetail 
  },
  { 
    path: '/categories', 
    component: Categories 
  },
  { 
    path: '/providers', 
    component: Providers 
  },
  { 
    path: '/about', 
    component: About 
  },
  { 
    path: '/contact', 
    component: Contact 
  },
  { 
    path: '/login', 
    component: Login 
  },
  { 
    path: '/register', 
    component: Register 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;