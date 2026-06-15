const menu = document.querySelector('.t3-menu');
const links = document.querySelector('.t3-links');
const dropdown = document.querySelector('.t3-dropdown');
const dropdownButton = dropdown?.querySelector(':scope > button');

menu?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

dropdownButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  const open = dropdown.classList.toggle('open');
  dropdownButton.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', () => {
  dropdown?.classList.remove('open');
  dropdownButton?.setAttribute('aria-expanded', 'false');
});

document.querySelectorAll('.t3-links a').forEach((link) => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.t3-reveal,.t3-reveal-left,.t3-reveal-right').forEach((element) => revealObserver.observe(element));

document.querySelector('.t3-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.classList.add('sent');
});
