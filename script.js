/* ==========================================
   SHAVE CAT BARBERSHOP – JAVASCRIPT
========================================== */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ---- Scroll fade-in (IntersectionObserver) ----
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--gold)';
    }
  });
}, { passive: true });

// ---- Smooth anchor scroll with offset for fixed navbar ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navHeight = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- Service cards modal with detailed prices ----
const serviceCards = document.querySelectorAll('.service-card[data-service]');
const serviceModal = document.getElementById('serviceModal');
const serviceModalBackdrop = document.getElementById('serviceModalBackdrop');
const serviceModalClose = document.getElementById('serviceModalClose');
const serviceModalTitle = document.getElementById('serviceModalTitle');
const serviceModalList = document.getElementById('serviceModalList');

const servicePrices = {
  herrklippning: {
    title: 'Herrklippning',
    items: [
      ['Herrklippning', '300 kr'],
      ['Pensionär herr (65+)', '250 kr'],
      ['Barnklippning (upp till 12 år)', '250 kr']
    ]
  },
  fade: {
    title: 'Skinfade / Fade',
    items: [
      ['Skinfade / Fade', '300 kr'],
      ['Herrklippning + skäggformning', '450 kr']
    ]
  },
  rakning: {
    title: 'Rakning',
    items: [
      ['Traditionell rakning', 'Från 250 kr'],
      ['Vaxning näsa och öron', '100 kr']
    ]
  },
  skagg: {
    title: 'Skäggtrimning',
    items: [
      ['Skägg- och mustaschtrim', '250 kr'],
      ['Herrklippning + formning av skägg', '450 kr']
    ]
  },
  damklippning: {
    title: 'Damklippning',
    items: [
      ['Damklippning kort hår', '300 kr'],
      ['Damklippning långt hår', '350 kr'],
      ['Tvätt och fön', 'Från 250 kr']
    ]
  },
  bryntrad: {
    title: 'Bryn och trådning',
    items: [
      ['Färgning av ögonfransar/ögonbryn', '150 kr'],
      ['Tråd ögonbryn', '150 kr'],
      ['Tråd hela ansiktet + ögonbryn', '250 kr']
    ]
  },
  fargning: {
    title: 'Färgning och behandling',
    items: [
      ['Utväxtfärgning', 'Från 600 kr'],
      ['Färgning + klippning (kort)', 'Från 900 kr'],
      ['Färgning + klippning (mellanlångt)', 'Från 1000 kr'],
      ['Färgning + klippning (långt)', 'Från 1100 kr'],
      ['Keratinbehandling + klippning (kort)', 'Från 1400 kr'],
      ['Keratinbehandling + klippning (långt)', 'Från 1500 kr']
    ]
  },
  paket: {
    title: 'Paket',
    items: [
      ['Herrklippning + formning av skägg', '450 kr']
    ]
  }
};

const openServiceModal = (serviceKey) => {
  const data = servicePrices[serviceKey];
  if (!data || !serviceModal) return;

  serviceModalTitle.textContent = data.title;
  serviceModalList.innerHTML = '';

  data.items.forEach(([name, price]) => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    const value = document.createElement('strong');
    label.textContent = name;
    value.textContent = price;
    li.appendChild(label);
    li.appendChild(value);
    serviceModalList.appendChild(li);
  });

  serviceModal.classList.add('open');
  serviceModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeServiceModal = () => {
  if (!serviceModal) return;
  serviceModal.classList.remove('open');
  serviceModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

serviceCards.forEach((card) => {
  card.addEventListener('click', () => {
    openServiceModal(card.dataset.service);
  });
});

if (serviceModalClose) {
  serviceModalClose.addEventListener('click', closeServiceModal);
}

if (serviceModalBackdrop) {
  serviceModalBackdrop.addEventListener('click', closeServiceModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && serviceModal && serviceModal.classList.contains('open')) {
    closeServiceModal();
  }
});
