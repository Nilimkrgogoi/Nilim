// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

// Typing effect in the hero
const roles = ['Full Stack Developer', 'Python Developer', 'Data Analyst', 'Networking & Cyber Security learner'];
const typed = document.getElementById('typed');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  if (reduce) { typed.textContent = roles[0]; return; }
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) { c++; setTimeout(type, 70); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 35); }
  else { deleting = false; r = (r + 1) % roles.length; setTimeout(type, 300); }
}
type();

// Skill bars and counters animate once when scrolled into view
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.classList.contains('skill')) el.querySelector('i').style.width = el.dataset.level + '%';
    if (el.classList.contains('count')) countUp(el);
    io.unobserve(el);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill, .count').forEach(el => io.observe(el));

function countUp(el) {
  const to = +el.dataset.to, suffix = el.dataset.suffix || '';
  if (reduce || el.dataset.plain) { el.textContent = to + suffix; return; }
  let n = 0; const step = Math.max(1, Math.ceil(to / 40));
  const t = setInterval(() => {
    n = Math.min(to, n + step);
    el.textContent = n + suffix;
    if (n >= to) clearInterval(t);
  }, 35);
}

// Highlight current section in the nav
const links = [...menu.querySelectorAll('a')];
const secs = links.map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
secs.forEach(s => s && spy.observe(s));

// Contact form opens the visitor's email app with the message filled in
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(msg + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = 'mailto:nilimkumargogoi03@gmail.com?subject=' + subject + '&body=' + body;
  document.getElementById('form-note').textContent = 'Opening your email app. Press send there to deliver the message.';
});

document.getElementById('year').textContent = new Date().getFullYear();
