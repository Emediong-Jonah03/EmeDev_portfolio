  document.addEventListener('DOMContentLoaded', () => {
  // ====== Mobile Menu Toggle ======
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // ====== Scroll to Top Button ======
   // const scrollBtn = document.createElement('button');
   // scrollBtn.innerText = '↑';
  // scrollBtn.classList.add('scroll-top');
    //document.body.appendChild(scrollBtn);

   // window.addEventListener('scroll', () => {
  //  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
//  });

//  scrollBtn.addEventListener('click', () => {
 //   window.scrollTo({ top: 0, behavior: 'smooth' });
//  });
//  scrollBtn.setAttribute('aria-label', 'Scroll to top');

    
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


  //=== BOT RESPONSE DATA ===//
  const responses = [
    {
      keywords: ["hello", "hi", "hey"],
      replies: [
        "Hi, I'm EmeDev assistant 😄",
        "Hey there! How can I help?",
        "Hello! Need help with a project?"
      ]
    },
    {
      keywords: ["service", "offer", "do you do", "create", "build", "website"],
      replies: [
        "I help with landing pages, website creation, Figma to code, and problem solving!",
        "EmeDev offers landing pages, full websites, and turning your ideas into code.",
        "From Figma to a finished website — we’ve got you!"
      ]
    },
    {
      keywords: ["figma", "convert", "design"],
      replies: [
        "Yes! EmeDev converts Figma designs to clean, responsive code.",
        "We turn your design dreams into real code! Figma to HTML/CSS? Easy.",
        "Absolutely. Just send your design and we'll handle the rest."
      ]
    },
    {
      keywords: ["contact", "reach", "email", "phone", "message"],
      replies: [
        "You can email me at jonahemediong9@gmail.com or DM @EmediongJ15081.",
        "Reach out anytime at jonahemediong9@gmail.com!",
        "Just send a mail to jonahemediong9@gmail.com — I’ll respond fast."
      ]
    },
    {
      keywords: ["project", "portfolio", "work", "showcase", "view"],
      replies: [
        "Check out my projects section for samples of my work.",
        "I’ve done projects in landing pages, hotels, templates, and more.",
        "Take a look at the portfolio section above for recent projects.",
        "You can send EmeDev a message to view the website"
      ]
    },
    {
      keywords: ["thanks", "thank you", "thx", "appreciate"],
      replies: [
        "You're welcome! Happy to help.",
        "Glad I could assist 😊",
        "Anytime! Let me know if you have more questions."
      ]
    },
    {
      keywords: ["bye", "goodbye", "see you", "later"],
      replies: [
        "Goodbye! Have a great day.",
        "See you later! Come back anytime.",
        "Bye! Stay safe and code on."
      ]
    }
  ];

  //=== LEVENSHTEIN DISTANCE ===//
  function levenshteinDistance(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
        else matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
    return matrix[b.length][a.length];
  }

  function findResponse(input) {
    input = input.toLowerCase();
    const words = input.split(/\W+/);

    for (const group of responses) {
      for (const keyword of group.keywords) {
        for (const word of words) {
          const distance = levenshteinDistance(word, keyword);
          if (distance <= 1 || word === keyword) {
            const replyArray = group.replies;
            return replyArray[Math.floor(Math.random() * replyArray.length)];
          }
        }
      }
    }
    return "Sorry, I didn't understand that. Could you please rephrase?";
  }

  function typeWriter(text, i = 0, callback) {
    const chatlog = document.getElementById("chatlog");
    if (i < text.length) {
      chatlog.lastChild.querySelector('.bot-message').textContent += text.charAt(i);
      setTimeout(() => typeWriter(text, i + 1, callback), 20);
    } else if (callback) {
      callback();
    }
  }

  function addUserMessage(msg) {
    const chatlog = document.getElementById("chatlog");
    const userMsg = document.createElement("p");
    userMsg.innerHTML = `<span class="user-message">You:</span> ${msg}`;
    chatlog.appendChild(userMsg);
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  function addBotMessage(msg) {
    const chatlog = document.getElementById("chatlog");
    const botMsg = document.createElement("p");
    botMsg.innerHTML = `<span class="bot-name">EmeDev Bot:</span> <span class="bot-message"></span>`;
    chatlog.appendChild(botMsg);
    typeWriter(msg);
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;
    addUserMessage(text);
    input.value = "";
    const response = findResponse(text);
    setTimeout(() => addBotMessage(response), 500);
  }

  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("userInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  //=== SPEECH RECOGNITION ===//
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById("userInput").value = transcript;
      sendMessage();
    };

    recognition.onerror = function(event) {
      console.error("Speech recognition error", event.error);
    };
  }

  function startListening() {
    if (recognition) recognition.start();
    else alert("Speech Recognition is not supported in this browser.");
  }

