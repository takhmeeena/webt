window.onload = function() {
  alert("Welcome to GILDED FLAME! Enjoy our flame-grilled specialties.");
};

const restaurantName = "GILDED FLAME";
const foundingYear = 2022;
const isOpen = true;
let customerCount = 0;

const welcomeMessage = "Welcome to " + restaurantName + ", established in " + foundingYear;
console.log(welcomeMessage);

const currentYear = new Date().getFullYear();
const yearsInOperation = currentYear - foundingYear;
const moduloExample = yearsInOperation % 4;
console.log(`Modulo example: ${yearsInOperation} % 4 = ${moduloExample}`);

function greetCustomer(name) {
  return `Hello, ${name}! Thank you for visiting ${restaurantName}.`;
}

function calculateDiscount(total, discountPercent) {
  return total * (discountPercent / 100);
}

console.log(greetCustomer("John"));
console.log(`Your discount: ${calculateDiscount(100, 15)}`);

const randomHour = Math.floor(Math.random() * 24);
let restaurantStatus;
if (randomHour >= 11 && randomHour < 23) {
  restaurantStatus = "We're open! Come visit us.";
} else {
  restaurantStatus = "We're currently closed. Open hours: 11AM - 11PM";
}
document.getElementById('availability').textContent = restaurantStatus;

const randomNum = Math.floor(Math.random() * 100) + 1;
document.getElementById('randomNumber').textContent = randomNum;

const specials = ["Flame-Grilled Beef", "Spicy Chicken", "Vegetable Medley", "Seafood Skewers"];
const dynamicElementsDiv = document.getElementById('dynamicElements');

for (let i = 0; i < specials.length; i++) {
  const item = document.createElement('p');
  item.textContent = `${i + 1}. ${specials[i]}`;
  item.className = 'special-item';
  dynamicElementsDiv.appendChild(item);
}

const reviews = [
  { name: "Anna", text: "The best grilled skewers I've ever tasted!" },
  { name: "Mark", text: "Highly recommend GILDED FLAME!" }
];

const reviewsDiv = document.getElementById('reviews');
reviews.forEach((review, index) => {
  const reviewElement = document.createElement('div');
  reviewElement.className = 'card shadow-sm mb-3 p-3';
  reviewElement.innerHTML = `<p>"${review.text}" <br><strong>- ${review.name}</strong></p>`;
  reviewsDiv.appendChild(reviewElement);
});

function addReview() {
  const newReview = {
      name: "Sarah",
      text: "Amazing atmosphere and delicious food!"
  };
  reviews.push(newReview);
  
  const newReviewElement = document.createElement('div');
  newReviewElement.className = 'card shadow-sm mb-3 p-3';
  newReviewElement.innerHTML = `<p>"${newReview.text}" <br><strong>- ${newReview.name}</strong></p>`;
  reviewsDiv.appendChild(newReviewElement);
}

setTimeout(addReview, 5000);

const counterElement = document.getElementById('counter');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const greetingElement = document.getElementById('greeting');
const nameInput = document.getElementById('name');
const heroSection = document.querySelector('.hero-section');

incrementBtn.addEventListener('click', function() {
  customerCount++;
  counterElement.textContent = customerCount;
});

decrementBtn.addEventListener('click', function() {
  if (customerCount > 0) {
      customerCount--;
      counterElement.textContent = customerCount;
  }
});

nameInput.addEventListener('input', function() {
  greetingElement.textContent = greetCustomer(this.value);
});

const changeStyleBtn = document.getElementById('changeStyleBtn');
changeStyleBtn.addEventListener('click', function() {
  heroSection.style.backgroundColor = '#d35400';
  heroSection.style.transition = 'background-color 0.5s ease';
});

const reservationForm = document.getElementById('reservationForm');
reservationForm.addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('reservationSuccess').style.display = 'block';
  this.style.display = 'none';
});

const socialIcons = document.querySelectorAll('.social-icons a');
socialIcons.forEach(icon => {
  icon.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.2)';
      this.style.transition = 'transform 0.3s';
  });
  icon.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
  });
});

$(document).ready(function() {
  $('#reservationForm').hide();
  
  $('#fadeBtn').click(function() {
      $('#reservationForm').fadeIn(1000);
  });
  
  $('#toggleBtn').click(function() {
      $('#reservationForm').slideToggle();
  });
  
  $('.hero-section').hover(
      function() {
          $(this).animate({ opacity: 0.9 }, 200);
      },
      function() {
          $(this).animate({ opacity: 1 }, 200);
      }
  );
  
  $('#dynamicElements').append('<p class="text-muted">Today\'s specials:</p>');
  
  $('.navbar-brand img').attr('alt', 'Gilded Flame Logo');
  
  $('.card').hover(
      function() {
          $(this).stop().animate({ backgroundColor: '#f8f9fa' }, 200);
      },
      function() {
          $(this).stop().animate({ backgroundColor: '#fff' }, 200);
      }
  );
  
  $('nav a').click(function(e) {
      e.preventDefault();
      $(this).css('color', '#d35400');
      setTimeout(() => {
          window.location.href = $(this).attr('href');
      }, 500);
  });
});
