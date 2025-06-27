// script.js

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  
  // Dark mode toggle
  const darkModeToggle = document.createElement("button");
  darkModeToggle.innerText = "🌙 Dark Mode";
  darkModeToggle.className = "toggle-darkmode";
  document.body.appendChild(darkModeToggle);
  
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkModeToggle.innerText = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
  
  // Basic form validation
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
          input.style.borderColor = "#ccc";
        }
      });
  
      if (!valid) {
        e.preventDefault();
        alert("Please fill in all fields before submitting.");
      }
    });
  }
  
