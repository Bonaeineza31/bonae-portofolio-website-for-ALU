// function toggleMenu() {
//     const menu = document.querySelector('.nav-links'); // You were missing the '.' for class selector
//     menu.classList.toggle('mobile');  // We'll toggle 'mobile' class instead of 'active'
//   }
//   document.addEventListener('DOMContentLoaded', function() {
//     const menuLinks = document.querySelectorAll('.nav-links a');
//     menuLinks.forEach(link => {
//       link.addEventListener('click', function() {
//         const menu = document.querySelector('.nav-links');
//         if (menu.classList.contains('mobile')) {
//           menu.classList.remove('mobile');
//         }
//       });
//     });
//   });


  function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

  let chatOpen = false;
let emailCollected = false;
let waitingForEmail = false;

const botResponses = {
  welcome: "Hello! 👋 Welcome to my portofolio. How can I help you today?\n1. Learn more about me\n2. Navigate the website\n3. Contact information",
  program: "I’m a passionate Junior Software Developer with experience in building and maintaining websites, apps, and software solutions.My focus is on writing clean, efficient, and scalable code to solve real-world problems. Whether collaborating in a team or working independently, I bring enthusiasm and commitment to every project.When I’m not coding, I enjoy exploring new technologies and finding creative ways to use them to make a positive impact.",
  navigation: "I can help you navigate our website. What would you like to find?\n1. About Us\n2. Services\n3. Projects\n4. Contact",
  contact: "I'll be happy to help connect you with our team. Could you please provide your email address so we can reach out to you?",
  emailReceived: "Thank you for your email! Our team will contact you within 24 hours. Is there anything else you'd like to know?",
  default: "I'm not sure I understand. Could you please select one of the numbered options above?"
};

function toggleChat() {
  const chatWindow = document.querySelector('.chat-window');
  const chatToggle = document.querySelector('.chat-toggle');
  chatOpen = !chatOpen;
  
  chatWindow.classList.toggle('active');
  chatToggle.classList.toggle('active');
  
  if (chatOpen && !document.querySelector('.message')) {
    // First time opening chat
    setTimeout(() => {
      addMessage(botResponses.welcome, 'bot');
      enableInput();
    }, 500);
  }
}

function addMessage(text, sender) {
  const messagesDiv = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', `${sender}-message`);
  messageDiv.textContent = text;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function enableInput() {
  document.getElementById('userInput').disabled = false;
  document.getElementById('sendButton').disabled = false;
}

function validateEmail(email) {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  addMessage(message, 'user');
  input.value = '';
  
  // Disable input while processing
  input.disabled = true;
  document.getElementById('sendButton').disabled = true;
  
  setTimeout(() => {
    if (waitingForEmail) {
      if (validateEmail(message)) {
        addMessage(botResponses.emailReceived, 'bot');
        waitingForEmail = false;
        emailCollected = true;
      } else {
        addMessage("That doesn't look like a valid email. Please try again.", 'bot');
      }
    } else {
      // Handle numbered responses
      switch(message) {
        case '1':
          addMessage(botResponses.program, 'bot');
          break;
        case '2':
          addMessage(botResponses.navigation, 'bot');
          break;
        case '3':
          addMessage(botResponses.contact, 'bot');
          waitingForEmail = true;
          break;
        default:
          addMessage(botResponses.default, 'bot');
      }
    }
    
    // Re-enable input
    input.disabled = false;
    document.getElementById('sendButton').disabled = false;
    input.focus();
  }, 1000);
}

// Allow sending message with Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});