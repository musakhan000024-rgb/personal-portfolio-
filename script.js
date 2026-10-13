// 1. Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// 2. Dark / Light theme toggle (remembers choice)
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
  themeToggle.textContent = theme === 'light' ? 'Dark' : 'Light';
}

let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = document.body.classList.contains('light') ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// 3. Animate skill bars when the About section is visible
const fills = document.querySelectorAll('.fill');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level + '%';
    }
  });
}, { threshold: 0.4 });
fills.forEach(fill => observer.observe(fill));

// 4. Contact form validation
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formMsg.className = '';

  if (name === '' || email === '' || message === '') {
    formMsg.textContent = 'Please fill in all fields.';
    formMsg.classList.add('error');
  } else if (!emailPattern.test(email)) {
    formMsg.textContent = 'Please enter a valid email address.';
    formMsg.classList.add('error');
  } else {
    formMsg.textContent = 'Thank you, ' + name + '! Your message has been received.';
    formMsg.classList.add('success');
    form.reset();
  }
});
