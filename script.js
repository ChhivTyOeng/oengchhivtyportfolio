const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const navLinks = document.querySelectorAll('.nav-scroll');
const navbarCollapse = document.getElementById('navbarSupportedContent');

const applyTheme = (isDark) => {
  if (isDark) {
    document.body.classList.add('dark-mode');
    if (darkModeIcon) darkModeIcon.classList.replace('bi-moon', 'bi-sun');
  } else {
    document.body.classList.remove('dark-mode');
    if (darkModeIcon) darkModeIcon.classList.replace('bi-sun', 'bi-moon');
  }
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  applyTheme(true);
} else {
  applyTheme(false);
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
      if (darkModeIcon) darkModeIcon.classList.replace('bi-moon', 'bi-sun');
    } else {
      localStorage.setItem('theme', 'light');
      if (darkModeIcon) darkModeIcon.classList.replace('bi-sun', 'bi-moon');
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight + 15;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      }
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.12
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section, .card, .pop-on-scroll').forEach(el => observer.observe(el));
});