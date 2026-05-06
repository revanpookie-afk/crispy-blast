// MOBILE MENU TOGGLE
function toggleMenu() {
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById("nav").classList.remove("active");
  });
});

// LIVE ORDERS COUNTER - Updates every few seconds
let orderCount = 247;
function updateOrderCount() {
  const increment = Math.floor(Math.random() * 3) + 1;
  orderCount += increment;
  const ordersElement = document.getElementById('orders-count');
  if (ordersElement) {
    ordersElement.textContent = orderCount;
  }
}

// Update order count every 5-10 seconds
setInterval(updateOrderCount, Math.random() * 5000 + 5000);

// SCROLL ANIMATION - Fade in elements as they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards and gallery items
document.querySelectorAll('.card, .gallery-item, .feature, .testimonial').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// CARD MODAL
function openModal(cardElement) {
  const h3 = cardElement.querySelector('h3').textContent;
  const img = cardElement.querySelector('img').src;
  const price = cardElement.querySelector('.price').textContent;
  const desc = cardElement.querySelector('.desc-small').textContent;
  const rating = cardElement.querySelector('.rating').textContent;

  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div style="text-align: center;">
      <img src="${img}" style="width: 100%; border-radius: 15px; margin-bottom: 20px; max-height: 300px; object-fit: cover;">
      <h2 style="font-size: 2rem; margin-bottom: 10px;">${h3}</h2>
      <p style="color: #ccc; margin-bottom: 15px;">${desc}</p>
      <h3 style="color: #ff8c00; font-size: 2rem; margin-bottom: 10px;">${price}</h3>
      <p style="color: #ffcc00; margin-bottom: 25px; font-weight: 600;">${rating}</p>
      <a href="https://wa.me/919972649017?text=Hi! I want to order ${h3}" class="btn" style="display: inline-block; text-decoration: none;">
        <i class="fab fa-whatsapp"></i> Order on WhatsApp
      </a>
    </div>
  `;

  document.getElementById('cardModal').classList.add('show');
}

function closeModal() {
  document.getElementById('cardModal').classList.remove('show');
}

// IMAGE MODAL
function openImageModal(element) {
  const img = element.querySelector('img').src;
  document.getElementById('modalImage').src = img;
  document.getElementById('imageModal').classList.add('show');
}

function closeImageModal() {
  document.getElementById('imageModal').classList.remove('show');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  const cardModal = document.getElementById('cardModal');
  const imageModal = document.getElementById('imageModal');

  if (e.target === cardModal) {
    cardModal.classList.remove('show');
  }
  if (e.target === imageModal) {
    imageModal.classList.remove('show');
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('cardModal').classList.remove('show');
    document.getElementById('imageModal').classList.remove('show');
  }
});

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ADD ACTIVE CLASS TO NAVIGATION LINKS ON SCROLL
window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY + 100;

  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.style.color = '#ccc';
      });
      const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.style.color = '#ff8c00';
      }
    }
  });
});

// DYNAMIC TESTIMONIAL ROTATION
const testimonials = [
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"Best fried chicken in Bangalore! The crunch is unreal. Ordered 5 times this month!"',
    author: '- Rahul K.'
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"Crispy Blast shawarma is a game changer. The flavor and freshness are incredible!"',
    author: '- Priya M.'
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"Fast delivery, piping hot food, amazing taste. What more could you ask for?"',
    author: '- Arun P.'
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"The loaded fries are absolutely addictive. Definitely my go-to place for quick bites!"',
    author: '- Neha S.'
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"Best value for money. Premium quality at affordable prices. Highly recommended!"',
    author: '- Vikram T.'
  }
];

// Rotate testimonials
let currentTestimonial = 0;
function rotateTestimonials() {
  const testimonialElements = document.querySelectorAll('.testimonial');
  testimonialElements.forEach((el, index) => {
    const testimonial = testimonials[(currentTestimonial + index) % testimonials.length];
    el.querySelector('.stars').textContent = testimonial.stars;
    el.querySelector('p').textContent = testimonial.text;
    el.querySelector('h4').textContent = testimonial.author;
  });
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

// Rotate testimonials every 8 seconds
setInterval(rotateTestimonials, 8000);

// LOADING ANIMATION
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ADD PAGE LOAD ANIMATION
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
  });
} else {
  document.body.style.opacity = '1';
}

// PREVENT RIGHT CLICK ON IMAGES (OPTIONAL SECURITY)
// Uncomment if you want to prevent image theft
/*
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', (e) => e.preventDefault());
});
*/

// LOG PAGE PERFORMANCE
console.log('🔥 Crispy Blast Website Loaded Successfully!');
console.log('Current Orders: ' + orderCount);
console.log('Live from Bangalore');