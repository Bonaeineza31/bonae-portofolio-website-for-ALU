
function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
  
  // Prevent body scrolling when menu is open
  body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
  }
});
