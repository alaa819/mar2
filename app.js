const envelope = document.querySelector('#open-envelope');
const birthday = document.querySelector('#birthday');

envelope.addEventListener('click', () => {
  envelope.classList.add('opened');
  document.body.classList.add('mail-opened');
  window.setTimeout(() => birthday.scrollIntoView({ behavior: 'smooth' }), 450);
});

document.querySelectorAll('[data-target]').forEach((item) => {
  item.addEventListener('click', () => document.getElementById(item.dataset.target)?.scrollIntoView({ behavior: 'smooth' }));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.18 });

document.querySelectorAll('section').forEach((section) => observer.observe(section));

let scrollFrame;
window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    const heroBounds = birthday.getBoundingClientRect();
    const heroProgress = Math.max(0, Math.min(1, -heroBounds.top / heroBounds.height));
    birthday.style.setProperty('--hero-photo-shift', `${heroProgress * 34}px`);
    birthday.style.setProperty('--hero-date-shift', `${heroProgress * -18}px`);
    birthday.style.setProperty('--hero-title-shift', `${heroProgress * -34}px`);
    birthday.style.setProperty('--hero-love-shift', `${heroProgress * -52}px`);
    scrollFrame = undefined;
  });
}, { passive: true });
