// script.js

// 1. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      
      // Update URL without jumping
      if (history.pushState) {
        history.pushState(null, null, this.getAttribute("href"));
      } else {
        location.hash = this.getAttribute("href");
      }
    }
  });
});

const toggleTheme = document.getElementById('toggleTheme');
    const html = document.documentElement;

    toggleTheme.addEventListener("click", () => {
      if (html.classList.contains('light')) {
        html.classList.remove('light');
        toggleTheme.textContent = '☀️';  
      } else {
        html.classList.add('light');  
        toggleTheme.textContent = '🌙'; 
      }
    });

// 3. Form Validation
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    const inputs = form.querySelectorAll("input, textarea");
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.setAttribute('aria-invalid', 'true');
        input.style.borderColor = 'var(--error)';
      } else {
        input.setAttribute('aria-invalid', 'false');
        input.style.borderColor = 'var(--blue)';
      }
    });
    
    if (!isValid) {
      e.preventDefault();
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = 'Please fill in all required fields';
      errorMessage.setAttribute('role', 'alert');
      form.prepend(errorMessage);
      
      // Focus on first invalid input
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });
}

// 4. Scroll Animations
const animateOnScroll = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.container, .card, .hero, .grid, form').forEach(el => {
  animateOnScroll.observe(el);
});

// 5. Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener("click", ()=>{
  if (navLinks.style.display === "none") {
    navLinks.style.display = "flex"
  }
  else{
    navLinks.style.display = "none"
  }
})


// 6. Chatbot Implementation
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatbotClose = document.querySelector('.chatbot-close');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const messagesContainer = document.getElementById('chatbot-messages');
  const quickRepliesContainer = document.getElementById('quick-replies');
  const voiceBtn = document.getElementById('voice-btn');
  
  // Templates
  const quickReplyTemplate = document.getElementById('quick-reply-template');
  const projectCardTemplate = document.getElementById('project-card-template');
  const contactFormTemplate = document.getElementById('contact-form-template');

  
  // Chatbot state
  let isOpen = false;
  let recognition;
  let isListening = false;
  let typingInterval;
  
  // Sample data
  const projects = [
    {
      title: "hotel project",
      image: "assets/127.0.0.1_5500_Hotel_modhotel.html (2).png",
      link: "https://hotel-website-seven-mu.vercel.app",
      description: "Interactive Hotel Showcase"
    },
   {
      title: "landing page",
      image: "assets/lante.png",
      link: "https://emediong-jonah03.github.io/lante-landing-page/",
      description: "A modern landing page for startups built for conversions, featuring smooth layout and CTA-focused design."
    }
  ];
  
  const quickReplies = [
    "What services do you offer?",
    "Show me your projects",
    "How much for a website?",
    "Can you build a chatbot?",
    "Can you  help me with my latex project"
  ];
  
   //Initialize chatbot
  function initChatbot() {
    setupEventListeners();
    addBotMessage("Hello! I'm EmeBot, your virtual assistant. How can I help you today?");
    setTimeout(showQuickReplies, 800);
  }
  
  // Event listeners setup
  function setupEventListeners() {
    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', toggleChatbot);
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', handleKeyPress);
    voiceBtn.addEventListener('click', toggleVoiceInput);
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window) {
      setupSpeechRecognition();
    } else {
      voiceBtn.style.display = 'none';
    }
  }
  
  // Chatbot visibility toggle
  function toggleChatbot() {
    isOpen = !isOpen;
    chatbotWindow.classList.toggle('active', isOpen);
    chatbotToggle.setAttribute('aria-expanded', isOpen);
    
    const icon = chatbotToggle.querySelector('i');
    icon.classList.replace(isOpen ? 'fa-robot' : 'fa-times', 
                         isOpen ? 'fa-times' : 'fa-robot');
    
    if (isOpen) {
      setTimeout(() => userInput.focus(), 300);
    } else {
      stopVoiceInput();
    }
  }
  
  // Handle message sending
  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    addUserMessage(message);
    userInput.value = '';
    clearQuickReplies();
    showTypingIndicator();
    
    setTimeout(() => {
      processUserMessage(message);
    }, 800);
  }
  
  // Handle keyboard input
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }
  
  // Add user message to chat
  function addUserMessage(message) {
    const messageElement = createMessageElement(message, 'user-message');
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Add bot message to chat
  function addBotMessage(message) {
    removeTypingIndicator();
    const messageElement = createMessageElement('', 'bot-message');
    const bubble = messageElement.querySelector('.message-bubble');
    
    let i = 0;
    clearInterval(typingInterval);
    typingInterval = setInterval(() => {
      if (i < message.length) {
        bubble.textContent += message.charAt(i);
        i++;
        scrollToBottom();
      } else {
        clearInterval(typingInterval);
        addTimestamp(messageElement);
        if (shouldShowQuickReplies(message)) {
         setTimeout(showQuickReplies, 500);
        }
      }
    }, 20);
    
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Create message element
  function createMessageElement(content, type) {
    const element = document.createElement('div');
    element.className = `message ${type}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;
    
    element.appendChild(bubble);
    return element;
  }
  
  // Add timestamp to message
  function addTimestamp(messageElement) {
    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = getCurrentTime();
    messageElement.appendChild(time);
  }
  
  // Show typing indicator
  function showTypingIndicator() {
    if (document.querySelector('.typing-indicator')) return;
    
    const indicator = document.createElement('div');
    indicator.className = 'message bot-message typing-indicator';
    indicator.innerHTML = '<span class="typing-dot"></span>'.repeat(3);
    
    messagesContainer.appendChild(indicator);
    scrollToBottom();
  }
  
  // Remove typing indicator
  function removeTypingIndicator() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) indicator.remove();
  }
  
  // Show quick reply buttons
  function showQuickReplies() {
    clearQuickReplies(); // Assumes this clears the container
  
    quickReplies.forEach(reply => {
      const button = quickReplyTemplate.content.cloneNode(true).querySelector('button');
      button.textContent = reply;
      button.addEventListener('click', () => {
        userInput.value = reply;
        sendMessage(); // Sends the message after setting input
      });
      quickRepliesContainer.appendChild(button);
    });
  }
  
  
   //Clear quick replies
  function clearQuickReplies() {
    quickRepliesContainer.innerHTML = '';
  }
  
  // Process user message and generate response
  function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    let response = "I'm not sure I understand. Could you rephrase your question?";
    
    if (containsAny(lowerMessage, ['hi', 'hello', 'hey'])) {
      response = "Hello again! How can I assist you today?";
    }
    else if (containsAny(lowerMessage, ['service', 'offer', 'do you'])) {
      response = getServicesResponse();
    }
    else if (containsAny(lowerMessage, ['project', 'work', 'portfolio'])) {
      response = "Here are some of my recent projects:";
      addBotMessage(response);
      showProjects();
      return;
    }
    else if (containsAny(lowerMessage, ['contact', 'hire', 'reach'])) {
      response = "I'd love to discuss your project! Please share some details:";
      addBotMessage(response);
      showContactForm();
      return;
    }
    
    addBotMessage(response);
    if (!containsAny(lowerMessage, ['hi', 'hello', 'hey'])) {
      setTimeout(showQuickReplies, 1000);
    }
  }
  
  // Helper function to check for keywords
  function containsAny(text, terms) {
    return terms.some(term => text.includes(term.toLowerCase()));
  }
  
  // Get formatted services response
  function getServicesResponse() {
    return `I specialize in these services:
      ✨ Frontend Development
      - Responsive designs
      - Performance optimization
      
      🎨 UI/UX Design
      - User-centered interfaces
      - Figma prototypes
      
      Which area interests you?`;
  }
  
 //  Show projects in chat
  function showProjects() {
    projects.forEach(project => {
      const card = projectCardTemplate.content.cloneNode(true);
      const img = card.querySelector('.project-image');
      const title = card.querySelector('.project-title');
      const link = card.querySelector('.project-link');
      
      img.src = project.image;
      img.alt = project.title;
      title.textContent = project.title;
      link.href = project.link;
      img.style.width = '40vh';
      img.style.height = '100vh';
      
      messagesContainer.appendChild(card);
    });
    scrollToBottom();
  }
  
   //Show contact form in chat
  function showContactForm() {
    const form = contactFormTemplate.content.cloneNode(true);
    form.querySelector('form').addEventListener('submit', handleChatbotFormSubmit);
    messagesContainer.appendChild(form);
    scrollToBottom();
  }
  
  // Handle chatbot form submission
  function handleChatbotFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // In a real app, you would send this to your server
    console.log('Form submitted:', Object.fromEntries(formData));
    
    addBotMessage("Thank you! I've received your details and will respond soon.");
    form.remove();
  }
  
  // Setup speech recognition
  function setupSpeechRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      userInput.value = transcript;
      sendMessage();
    };
    
    recognition.onerror = (e) => {
      console.error('Speech recognition error', e.error);
      stopVoiceInput();
    };
    
    recognition.onend = stopVoiceInput;
  }
  
  // Toggle voice input
  function toggleVoiceInput() {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      voiceBtn.classList.add('listening');
      isListening = true;
      userInput.placeholder = "Listening...";
    }
  }
  
  // Stop voice input
  function stopVoiceInput() {
    if (!recognition) return;
    
    voiceBtn.classList.remove('listening');
    isListening = false;
    userInput.placeholder = "Type your message...";
  }
  
  // Scroll to bottom of chat
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Get current time in HH:MM format
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Check if quick replies should be shown
  function shouldShowQuickReplies(message) {
    return message.includes('help') || 
           message.includes('assist') ||
           message.includes('service');
  }
  
  // Initialize the chatbot
  initChatbot();
});
