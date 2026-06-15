const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
const dropdown = document.querySelector('.dropdown');
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate').forEach((element) => observer.observe(element));

document.querySelector('.form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.classList.add('sent');
});
