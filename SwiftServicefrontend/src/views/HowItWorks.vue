<template>
    <div class="how-it-works">
      <div class="hero-section">
        <div class="container">
          <h1>How It Works</h1>
          <p class="subtitle">Get the services you need in just a few simple steps</p>
        </div>
      </div>
  
      <div class="steps-section">
        <div class="container">
          <div class="steps-container">
            <div class="step-card">
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h2>Search</h2>
              <p>Find the service you need from our wide range of categories</p>
            </div>
  
            <div class="step-card">
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2>Book</h2>
              <p>Select a service provider and book an appointment</p>
            </div>
  
            <div class="step-card">
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <h2>Relax</h2>
              <p>Sit back and relax while our professionals handle your needs</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="details-section">
        <div class="container">
          <div class="detail-row">
            <div class="detail-content">
              <h3>1. Browse Services</h3>
              <p>Explore our extensive range of services across multiple categories. From home cleaning to electrical repairs, plumbing services to beauty treatments, we've got you covered.</p>
              <ul>
                <li>Search by category or specific service</li>
                <li>Filter by location, price, and ratings</li>
                <li>Read detailed service descriptions</li>
              </ul>
            </div>
            <div class="detail-image">
              <img src="../assets/search.jpg" alt="Browse services illustration" />
            </div>
          </div>
  
          <div class="detail-row reverse">
            <div class="detail-content">
              <h3>2. Choose a Provider</h3>
              <p>Select from our verified service providers based on ratings, reviews, and pricing. We ensure all our providers are thoroughly vetted for your safety and satisfaction.</p>
              <ul>
                <li>Compare provider profiles and portfolios</li>
                <li>Read authentic customer reviews</li>
                <li>Check provider availability</li>
              </ul>
            </div>
            <div class="detail-image">
              <img src="../assets/provider.jpg" alt="Choose provider illustration" />
            </div>
          </div>
  
          <div class="detail-row">
            <div class="detail-content">
              <h3>3. Book Your Service</h3>
              <p>Schedule your service at a time that's convenient for you. Our simple booking process takes just a few clicks.</p>
              <ul>
                <li>Select your preferred date and time</li>
                <li>Specify your location and requirements</li>
                <li>Secure payment options available</li>
              </ul>
            </div>
            <div class="detail-image">
              <img src="../assets/book.jpg" alt="Book service illustration" />
            </div>
          </div>
  
          <div class="detail-row reverse">
            <div class="detail-content">
              <h3>4. Service Delivery</h3>
              <p>Our professional service providers will arrive at your location on time and complete the job to your satisfaction.</p>
              <ul>
                <li>Receive notifications and reminders</li>
                <li>Track your provider's arrival</li>
                <li>Enjoy hassle-free service delivery</li>
              </ul>
            </div>
            <div class="detail-image">
              <img src="../assets/delivery.jpg" alt="Service delivery illustration" />
            </div>
          </div>
  
          <div class="detail-row">
            <div class="detail-content">
              <h3>5. Rate and Review</h3>
              <p>After the service is completed, share your experience by rating and reviewing the provider. Your feedback helps us maintain quality and assists other users in making informed decisions.</p>
              <ul>
                <li>Rate your overall experience</li>
                <li>Leave detailed feedback</li>
                <li>Help improve our service quality</li>
              </ul>
            </div>
            <div class="detail-image">
              <img src="../assets/rate.jpg" alt="Rate and review illustration" />
            </div>
          </div>
        </div>
      </div>
  
      <div class="cta-section">
        <div class="container">
          <h2>Ready to get started?</h2>
          <p>Join thousands of satisfied customers who use SwiftService every day</p>
          <router-link to="/services" class="cta-button">Browse Services</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Use a placeholder image URL instead of relying on a local SVG file
  const placeholderImage = ref('https://via.placeholder.com/400x300/0056b3/ffffff?text=SwiftService');
  </script>
  
  <style scoped>
  .how-it-works {
    min-height: 100vh;
  }
  
  .hero-section {
    background-color: var(--primary);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }
  
  .hero-section h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  .steps-section {
    padding: 5rem 0;
    background-color: #f8f9fa;
  }
  
  .steps-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }
  
  .step-card {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    flex: 1;
    min-width: 250px;
    max-width: 350px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .step-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .step-icon {
    width: 80px;
    height: 80px;
    background-color: rgba(var(--primary-rgb), 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }
  
  .step-icon svg {
    color: var(--primary);
    width: 32px;
    height: 32px;
  }
  
  .step-card h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--secondary);
  }
  
  .step-card p {
    color: #6c757d;
    line-height: 1.6;
  }
  
  .details-section {
    padding: 5rem 0;
  }
  
  .detail-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 5rem;
    gap: 2rem;
  }
  
  .detail-row:last-child {
    margin-bottom: 0;
  }
  
  .detail-row.reverse {
    flex-direction: row-reverse;
  }
  
  .detail-content {
    flex: 1;
    min-width: 300px;
  }
  
  .detail-content h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--secondary);
  }
  
  .detail-content p {
    color: #6c757d;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .detail-content ul {
    padding-left: 1.5rem;
  }
  
  .detail-content li {
    margin-bottom: 0.5rem;
    color: #6c757d;
  }
  
  .detail-image {
    flex: 1;
    min-width: 300px;
    display: flex;
    justify-content: center;
  }
  
  .detail-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .cta-section {
    background-color: var(--primary);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }
  
  .cta-section h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .cta-section p {
    font-size: 1.125rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }
  
  .cta-button {
    display: inline-block;
    background-color: white;
    color: var(--primary);
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    .hero-section {
      padding: 3rem 0;
    }
    
    .hero-section h1 {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1rem;
    }
    
    .steps-section, .details-section {
      padding: 3rem 0;
    }
    
    .detail-row, .detail-row.reverse {
      flex-direction: column;
      margin-bottom: 3rem;
    }
    
    .detail-content, .detail-image {
      width: 100%;
    }
    
    .detail-content h3 {
      font-size: 1.5rem;
    }
  }
  </style>