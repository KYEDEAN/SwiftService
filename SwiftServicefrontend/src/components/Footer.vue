<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-column">
          <h3>About Us</h3>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>For Customers</h3>
          <ul>
            <li><a href="#">How to Book</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Support</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>For Service Providers</h3>
          <ul>
            <li><a href="#">Join as Provider</a></li>
            <li><a href="#">Provider Guidelines</a></li>
            <li><a href="#">Success Stories</a></li>
            <li><a href="#">Provider Support</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>Connect With Us</h3>
          <div class="social-icons">
            <a href="#" class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
          <div class="contact-info">
            <p>Email: support@swiftservice.com</p>
            <p>Phone: +977 01-4567890</p>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2023 SwiftService. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #1e3a8a; /* Darker blue for footer */
  color: #fff;
  padding: 3rem 0 1.5rem;
  margin-top: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1400px) {
  .footer-grid {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.footer-column h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: #fff;
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 0.75rem;
}

.footer-column ul li a {
  color: #bfdbfe;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-column ul li a:hover {
  color: var(--primary-light);
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.2s;
}

.social-icon:hover {
  background-color: var(--primary);
}

.contact-info p {
  color: #bfdbfe;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #bfdbfe;
  font-size: 0.875rem;
}
</style>