  document.addEventListener('DOMContentLoaded', () => {
  // ====== Mobile Menu Toggle ======
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // ====== Scroll to Top Button ======
  const scrollBtn = document.createElement('button');
  scrollBtn.innerText = '↑';
  scrollBtn.classList.add('scroll-top');
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  // ====== Typing Effect in Hero Section ======
  const heroHeading = document.querySelector('.hero h1');
  const originalText = heroHeading.textContent;
  heroHeading.textContent = '';
  let i = 0;

  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  });


  function typeText() {
    if (i < originalText.length) {
      heroHeading.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeText, 100);
    }
  }
  window.addEventListener('load', typeText);

  const appearOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const faders = document.querySelectorAll('.about, .skills, .service, .project');

  // ===Animation== //
  if (entry.isIntersecting) {
    entry.target.classList.add('appear');
  } else {
    entry.target.classList.remove('appear');
  }

  // ====== Email Click - Copy to Clipboard ======
  const emailBtn = document.querySelector('.e-mail a');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailText = emailBtn.href.replace('mailto:', '');
      navigator.clipboard.writeText(emailText).then(() => {
        alert('Email copied to clipboard!');
      });
    });
  }
  });


  document.addEventListener('DOMContentLoaded', function() {
            // ===== DOM ELEMENTS ===== //
            const launcher = document.getElementById('chatbot-launcher');
            const container = document.getElementById('chatbot-container');
            const closeBtn = document.getElementById('chatbot-close');
            const messagesContainer = document.getElementById('chatbot-messages');
            const userInput = document.getElementById('user-input');
            const sendButton = document.getElementById('send-button');
            const typingIndicator = document.getElementById('typing-indicator');
            const quickReplies = document.querySelectorAll('.quick-reply');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const closeLightbox = document.getElementById('close-lightbox');

            // ===== FREE UX FEATURES DATA ===== //
            // 1. Project Gallery Data (REPLACE WITH YOUR IMAGE PATHS)
            const projects = {
                "Landing Pages": {
                    images: ["images/landing1.jpg", "images/landing2.jpg"],
                    description: "Custom conversion-focused pages built with HTML5/CSS3/JS"
                },
                "Website Templates": {
                    images: ["images/template1.jpg"],
                    description: "Reusable responsive templates for various industries"
                }
            };

            // 5. Personalization
            let userName = localStorage.getItem('chatUserName') || '';
            let feedbackGiven = localStorage.getItem('feedbackGiven') === 'true';
            let messageCount = 0;

            // ===== INITIALIZATION ===== //
            if (userName) {
                addMessage(`Welcome back, <span class="welcome-back">${userName}</span>! How can I help you today?`, 'bot-message');
            }

            // ===== CORE FUNCTIONS ===== //
            function addMessage(text, className, animate = true) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', className);
                messageElement.innerHTML = text;
                
                if (!animate) {
                    messageElement.style.animation = 'none';
                }
                
                messagesContainer.appendChild(messageElement);
                scrollToBottom();
            }

            function scrollToBottom() {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            // ===== FREE FEATURE FUNCTIONS ===== //
            // 1. Project Gallery
            function showProjectGallery(projectName) {
                const project = projects[projectName];
                if (project) {
                    lightboxImg.src = project.images[0];
                    lightboxCaption.textContent = project.description;
                    lightbox.classList.remove('hidden');
                }
            }

            // 2. Mailto Links
            function createEmailLink(subject = 'Portfolio Inquiry', body = '') {
                return `mailto:jonahemediong9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }

            // 3. Feedback System
            function showFeedbackPrompt() {
                if (feedbackGiven || document.querySelector('.feedback-buttons')) return;
                
                const feedbackMsg = document.createElement('div');
                feedbackMsg.classList.add('message', 'bot-message');
                feedbackMsg.innerHTML = `
                    Was this conversation helpful?
                    <div class="feedback-buttons">
                        <button class="feedback-btn" data-feedback="yes">👍</button>
                        <button class="feedback-btn" data-feedback="no">👎</button>
                    </div>
                `;
                messagesContainer.appendChild(feedbackMsg);
                scrollToBottom();

                document.querySelectorAll('.feedback-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        feedbackGiven = true;
                        localStorage.setItem('feedbackGiven', 'true');
                        feedbackMsg.innerHTML = 'Thank you for your feedback! 💙';
                    });
                });
            }

            // ===== BOT RESPONSE LOGIC ===== //
            function getBotResponse(userMessage) {
                const lowerMessage = userMessage.toLowerCase();
                
                // 1. Project Gallery Trigger
                const projectMatch = Object.keys(projects).find(name => 
                    lowerMessage.includes(name.toLowerCase())
                );
                if (projectMatch) {
                    setTimeout(() => showProjectGallery(projectMatch), 500);
                    return `Here are some screenshots from my <strong>${projectMatch}</strong> project. Click to view!`;
                }
                
                // 2. Contact with Mailto
                if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
                    const emailLink = createEmailLink(
                        'Portfolio Inquiry', 
                        `Hi Emediong,\n\nI saw your portfolio and wanted to discuss:\n\n[Your message here]`
                    );
                    return `You can contact Emediong directly:\n\n<a href="${emailLink}" style="color: #0077b5; text-decoration: underline;">📧 Send Email</a>\n\nOr via:\n\n• <a href="https://x.com/EmediongJ15081" target="_blank" style="color: #0077b5;">Twitter</a>\n• <a href="https://wa.me/message/JIBWQ6FWKT6CI1" target="_blank" style="color: #0077b5;">WhatsApp</a>`;
                }
                
                // 3. Skills with Tooltip
                if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('expertise')) {
                    return `Emediong specializes in:\n\n<div style="margin-top: 8px;">
                        <span data-tooltip="Semantic markup, responsive design">HTML5/CSS3</span> • 
                        <span data-tooltip="ES6+, React, Node">JavaScript</span> • 
                        <span data-tooltip="Scripting, automation">Python</span>
                    </div>\n\nHover over each skill for details!`;
                }
                
                // 4. Projects
                if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
                    return `Recent projects include:\n\n• <strong data-tooltip="Click 'Projects' button to view">Landing Pages</strong>\n• <strong data-tooltip="Click 'Projects' button to view">Website Templates</strong>\n• Bug Fixing Services\n\nAsk "Can I see [project type]?" to view examples!`;
                }
                
                // 5. Greetings
                if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                    return userName 
                        ? `Hi again ${userName}! What would you like to know?` 
                        : "Hi there! I'm Emediong's portfolio assistant. Ask me about his projects, skills, or contact info!";
                }
                
                // Name capture
                if ((lowerMessage.includes('name is') || lowerMessage.includes('i\'m ')) && !userName) {
                    const name = message.split(/(name is|i\'m)/i)[2]?.trim() || message;
                    userName = name.replace(/[^\w\s]/gi, '').substring(0, 20);
                    localStorage.setItem('chatUserName', userName);
                    return `Nice to meet you, ${userName}! How can I help you today?`;
                }
                
                // Fallback
                return "I'm not sure I understand. You can ask about:\n\n• My projects\n• Technical skills\n• Contact information\n\nOr email Emediong directly at jonahemediong9@gmail.com";
            }

            function sendMessage() {
                const message = userInput.value.trim();
                if (message) {
                    // Add user message
                    addMessage(message, 'user-message');
                    userInput.value = '';
                    messageCount++;
                    
                    // Show typing indicator
                    typingIndicator.classList.remove('hidden');
                    scrollToBottom();
                    
                    setTimeout(() => {
                        typingIndicator.classList.add('hidden');
                        const response = getBotResponse(message);
                        addMessage(response, 'bot-message');
                        
                        // Show feedback after 3 exchanges
                        if (messageCount >= 3) {
                            setTimeout(showFeedbackPrompt, 800);
                        }
                    }, 1000);
                }
            }

            // ===== EVENT LISTENERS ===== //
            launcher.addEventListener('click', function() {
                container.classList.toggle('open');
                if (container.classList.contains('open')) {
                    userInput.focus();
                }
            });
            
            closeBtn.addEventListener('click', function() {
                container.classList.remove('open');
            });
            
            sendButton.addEventListener('click', sendMessage);
            
            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            quickReplies.forEach(btn => {
                btn.addEventListener('click', function() {
                    const question = this.getAttribute('data-question');
                    userInput.value = question;
                    sendMessage();
                });
            });
            
            closeLightbox.addEventListener('click', function() {
                lightbox.classList.add('hidden');
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.add('hidden');
                }
            });
        });
    
