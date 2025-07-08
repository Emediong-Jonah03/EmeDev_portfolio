// script.js

// 1. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 2. Toggle Dark Mode
const toogleTheme = document.getElementById('toogleTheme')
toggleTheme.innerText = "🌙";


// Set default theme to light
document.documentElement.classList.add("light");

toggleTheme.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  const isLight = document.documentElement.classList.contains("light");
  toggleTheme.innerText = isLight ? "🌙" : "☀️";
});

// 3. Simple Form Validation
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    const inputs = form.querySelectorAll("input, textarea");
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "var(--gold)";
      }
    });
    if (!valid) {
      e.preventDefault();
      alert("Please fill in all fields before submitting.");
    }
  });
}

// 4. Scroll Animations using IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target); // Optional: Remove once triggered
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.container, .card, .hero, .grid, form, .icon-group, .whatsapp-icon')
  .forEach(el => observer.observe(el));

  const menuToogle = document.getElementById('menuToogle');
  const navLinks = document.getElementById('navLinks');
  
  menuToogle.addEventListener('click', () => {
    if (navLinks.style.display === "none") {
      navLinks.style.display = "flex";
    } else {
      navLinks.style.display = "none"; 
    }
  });
  
