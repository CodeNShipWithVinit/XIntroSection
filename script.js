// ===== DOM REFERENCES =====
const overlay     = document.getElementById('overlay');
const openMenuBtn = document.getElementById('openMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mainNav     = document.getElementById('mainNav');
const navLinks    = document.querySelectorAll('.nav-link');

// ===== MOBILE MENU =====
function openMenu() {
  mainNav.classList.add('open');
  overlay.classList.add('active');
  openMenuBtn.setAttribute('aria-expanded', 'true');
  openMenuBtn.style.visibility = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mainNav.classList.remove('open');
  overlay.classList.remove('active');
  openMenuBtn.setAttribute('aria-expanded', 'false');
  openMenuBtn.style.visibility = 'visible';
  document.body.style.overflow = '';
}

openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// ===== DROPDOWN TOGGLING =====
navLinks.forEach(navLink => {
  const btn = navLink.querySelector('button');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLink.classList.contains('link-open');

    // Close all other dropdowns
    navLinks.forEach(nl => {
      if (nl !== navLink) {
        nl.classList.remove('link-open');
        const b = nl.querySelector('button');
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle current
    if (isOpen) {
      navLink.classList.remove('link-open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      navLink.classList.add('link-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Close dropdowns when clicking outside
// Use closest() to avoid blocking the close button inside the nav
document.addEventListener('click', (e) => {
  if (e.target.closest('#closeMenuBtn')) return;
  navLinks.forEach(navLink => {
    navLink.classList.remove('link-open');
    const btn = navLink.querySelector('button');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
});

// ===== RESIZE: reset mobile menu on desktop =====
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    closeMenu();
  }
});