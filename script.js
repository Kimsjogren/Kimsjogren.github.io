/* ==========================================
   SHAVE CAT BARBERSHOP – JAVASCRIPT
========================================== */

// ---- Language switcher ----
const languageSelect = document.getElementById('languageSelect');
const languageLabel = document.querySelector('[data-language-label]');
const originalText = new WeakMap();

const translations = {
  'Frisör · Skarpnäck': ['Hair salon · Skarpnäck', 'صالون شعر · سكارَبناك'],
  'Hem': ['Home', 'الرئيسية'], 'Om oss': ['About us', 'من نحن'],
  'Tjänster': ['Services', 'الخدمات'], 'Galleri': ['Gallery', 'المعرض'],
  'Kontakt': ['Contact', 'اتصل بنا'], 'Språk': ['Language', 'اللغة'],
  'Svensk Hårstylist · Skarpnäck': ['Swedish Hairstylist · Skarpnäck', 'مصفف شعر سويدي · سكارَبناك'],
  'Dam & Herr · Klippning · Rakning · Skäggtrimning': ['Women & Men · Haircuts · Shaving · Beard trims', 'نساء ورجال · قص شعر · حلاقة · تهذيب اللحية'],
  'Våra tjänster': ['Our services', 'خدماتنا'], 'Kontakta oss': ['Contact us', 'تواصل معنا'],
  '4,7 – 59 recensioner på Google': ['4.7 – 59 reviews on Google', '4.7 – 59 تقييماً على Google'],
  'Passion för': ['Passion for', 'شغف بـ'], 'hårvård': ['hair care', 'العناية بالشعر'],
  'Vi på Salon Shave & Cut brinner för det hantverk som definierar den moderna barberaren. Hos oss möts tradition och nutid – varje klippning är ett mästerverk.': ['At Salon Shave & Cut, we are passionate about the craft that defines the modern barber. Tradition meets the present here – every haircut is a masterpiece.', 'في Salon Shave & Cut نعشق الحرفة التي تميز الحلاق العصري. هنا يلتقي التراث بالحداثة، وكل قصة شعر تحفة فنية.'],
  'Vår grundare och stylisten Ziad tar emot både dam och herr, och strävar alltid efter att ge dig den bästa upplevelsen i en avslappnad, stilfull atmosfär.': ['Our founder and stylist Ziad welcomes both women and men, always striving to give you the best experience in a relaxed, stylish setting.', 'يستقبل مؤسسنا ومصفف الشعر زياد النساء والرجال، ويسعى دائماً لتقديم أفضل تجربة في أجواء مريحة وأنيقة.'],
  'Google-betyg': ['Google rating', 'تقييم Google'], 'Recensioner': ['Reviews', 'التقييمات'], 'Instagram-inlägg': ['Instagram posts', 'منشورات Instagram'],
  'Frisör · Dam & Herr': ['Hair salon · Women & Men', 'صالون شعر · نساء ورجال'],
  'Klassisk eller modern herrklipp. Vi anpassar alltid stilen efter ditt hår och önskemål.': ['Classic or modern men’s haircut. We always adapt the style to your hair and preferences.', 'قصة شعر رجالية كلاسيكية أو عصرية، مصممة حسب شعرك ورغبتك.'],
  'Skin fade, mid fade, high fade – vi behärskar alla varianter för ett skarpt resultat.': ['Skin fade, mid fade or high fade – we master every variation for a sharp result.', 'تدرج منخفض أو متوسط أو عالٍ، نتقن جميع الأنواع للحصول على نتيجة دقيقة.'],
  'Traditionell rakning med rakhyvel för en len och slät upplevelse du aldrig glömmer.': ['Traditional razor shave for a smooth experience you will not forget.', 'حلاقة تقليدية بالموس لنعومة وتجربة لا تُنسى.'],
  'Form, trimning och skäggvård – vi ger ditt skägg den kontur det förtjänar.': ['Shaping, trimming and beard care – we give your beard the definition it deserves.', 'تحديد وتهذيب وعناية باللحية لتظهر بالشكل الذي تستحقه.'],
  'Modern damklipp med fokus på form och avslutning. Välkommen oavsett hårlängd.': ['Modern women’s haircut focused on shape and finish. All hair lengths are welcome.', 'قصات نسائية عصرية مع الاهتمام بالشكل واللمسات الأخيرة، لجميع أطوال الشعر.'],
  'Formning och färg av bryn samt trådning för ett rent och markerat resultat.': ['Eyebrow shaping, tinting and threading for a clean, defined result.', 'تشكيل وصبغ الحواجب وإزالة الشعر بالخيط لنتيجة نظيفة ومحددة.'],
  'Färgning, utväxt och keratinbehandling med klippning anpassat efter hårlängd.': ['Colour, root touch-ups and keratin treatments with haircuts adapted to hair length.', 'صبغة وجذور وعلاج كيراتين مع قصة تناسب طول الشعر.'],
  'Klippning och skäggtrimning i ett paket – spara tid och få ett komplett resultat i ett besök.': ['Haircut and beard trim in one package – save time and get a complete result in one visit.', 'قصة شعر وتهذيب لحية في باقة واحدة لنتيجة متكاملة في زيارة واحدة.'],
  'Populär': ['Popular', 'الأكثر طلباً'], 'Värde': ['Best value', 'قيمة ممتازة'], 'Färgning': ['Colour', 'صبغة'], 'Bryn/Tråd': ['Brows/Threading', 'حواجب/خيط'],
  'Full prislista': ['Full price list', 'قائمة الأسعار الكاملة'], 'Klippning & barber': ['Haircuts & barbering', 'قص الشعر والحلاقة'],
  'Damklippning': ['Women’s haircut', 'قص شعر نسائي'], 'Färg & behandling': ['Colour & treatments', 'الصبغة والعلاجات'], 'Övrigt': ['Other', 'أخرى'],
  'Herrklippning': ['Men’s haircut', 'قص شعر رجالي'], 'Skinfade / Fade': ['Skin fade / Fade', 'تدرج الشعر'],
  'Herrklippning + formning av skägg': ['Men’s haircut + beard shaping', 'قص شعر رجالي + تحديد اللحية'],
  'Skägg- och mustaschtrim': ['Beard and moustache trim', 'تهذيب اللحية والشارب'],
  'Barnklippning (upp till 12 år)': ['Children’s haircut (up to 12 years)', 'قص شعر للأطفال (حتى 12 سنة)'],
  'Pensionär herr (65+)': ['Senior men (65+)', 'رجال كبار السن (+65)'],
  'Damklippning kort hår': ['Women’s haircut, short hair', 'قص نسائي، شعر قصير'], 'Damklippning långt hår': ['Women’s haircut, long hair', 'قص نسائي، شعر طويل'],
  'Tvätt och fön': ['Wash and blow-dry', 'غسيل وتجفيف'], 'Från 250 kr': ['From SEK 250', 'ابتداءً من 250 كرونة'],
  'Från 300 kr': ['From SEK 300', 'ابتداءً من 300 كرونة'], 'Från 600 kr': ['From SEK 600', 'ابتداءً من 600 كرونة'],
  'Utväxtfärgning': ['Root touch-up', 'صبغ الجذور'],
  'Färgning + klippning (kort)': ['Colour + haircut (short)', 'صبغة + قص (قصير)'],
  'Färgning + klippning (mellanlångt)': ['Colour + haircut (medium)', 'صبغة + قص (متوسط)'],
  'Färgning + klippning (långt)': ['Colour + haircut (long)', 'صبغة + قص (طويل)'],
  'Keratinbehandling + klippning (kort)': ['Keratin treatment + haircut (short)', 'علاج كيراتين + قص (قصير)'],
  'Keratinbehandling + klippning (långt)': ['Keratin treatment + haircut (long)', 'علاج كيراتين + قص (طويل)'],
  'Färgning av ögonfransar/ögonbryn': ['Eyelash/eyebrow tinting', 'صبغ الرموش/الحواجب'],
  'Tråd ögonbryn': ['Eyebrow threading', 'تنظيف الحواجب بالخيط'],
  'Tråd hela ansiktet + ögonbryn': ['Full-face + eyebrow threading', 'تنظيف كامل الوجه والحواجب بالخيط'],
  'Vaxning näsa och öron': ['Nose and ear waxing', 'إزالة شعر الأنف والأذن بالشمع'],
  'Från 900 kr': ['From SEK 900', 'ابتداءً من 900 كرونة'], 'Från 1000 kr': ['From SEK 1,000', 'ابتداءً من 1000 كرونة'],
  'Från 1100 kr': ['From SEK 1,100', 'ابتداءً من 1100 كرونة'], 'Från 1400 kr': ['From SEK 1,400', 'ابتداءً من 1400 كرونة'],
  'Från 1500 kr': ['From SEK 1,500', 'ابتداءً من 1500 كرونة'],
  'Följ oss för fler klipp': ['Follow us for more cuts', 'تابعنا للمزيد من القصات'], 'Vårt arbete': ['Our work', 'أعمالنا'],
  'Bilder': ['Photos', 'الصور'], 'Videor': ['Videos', 'الفيديوهات'], '31 bilder': ['31 photos', '31 صورة'], '6 videor': ['6 videos', '6 فيديوهات'],
  'Hitta oss': ['Find us', 'اعثر علينا'], 'Kontakt &': ['Contact &', 'الاتصال و'], 'Öppettider': ['Opening hours', 'ساعات العمل'],
  'Adress': ['Address', 'العنوان'], 'Telefon': ['Phone', 'الهاتف'],
  'Mån–Fre: 11:00 – 19:00': ['Mon–Fri: 11:00–19:00', 'الاثنين–الجمعة: 11:00–19:00'],
  'Lördag: 11:00 – 18:00': ['Saturday: 11:00–18:00', 'السبت: 11:00–18:00'], 'Söndag: Stängt': ['Sunday: Closed', 'الأحد: مغلق'],
  'Öppna i Google Maps': ['Open in Google Maps', 'افتح في خرائط Google'], 'Priser': ['Prices', 'الأسعار'],
  'Paket': ['Package', 'الباقة'], 'Rakning': ['Shaving', 'الحلاقة'], 'Skäggtrimning': ['Beard trim', 'تهذيب اللحية'],
  'Bryn och trådning': ['Brows and threading', 'الحواجب والخيط'], 'Färgning och behandling': ['Colour and treatments', 'الصبغة والعلاجات'],
  'Album': ['Album', 'الألبوم'], 'Webbplats av': ['Website by', 'الموقع من تصميم'],
  'Stäng': ['Close', 'إغلاق'], 'Öppna meny': ['Open menu', 'فتح القائمة'], 'Ring oss': ['Call us', 'اتصل بنا']
};

const translateTextNodes = (language) => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: node => node.parentElement?.closest('script, style, option') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const key = source.trim().replace(/\s+/g, ' ');
    const translated = translations[key]?.[language === 'en' ? 0 : 1];
    if (language === 'sv' || !translated) node.nodeValue = source;
    else {
      const leading = source.match(/^\s*/)?.[0] || '';
      const trailing = source.match(/\s*$/)?.[0] || '';
      node.nodeValue = `${leading}${translated}${trailing}`;
    }
  });
};

const setLanguage = (language) => {
  const selected = ['sv', 'en', 'ar'].includes(language) ? language : 'sv';
  document.documentElement.lang = selected;
  document.documentElement.dir = selected === 'ar' ? 'rtl' : 'ltr';
  translateTextNodes(selected);
  languageLabel.textContent = selected === 'sv' ? 'Språk' : selected === 'en' ? 'Language' : 'اللغة';
  languageSelect.value = selected;
  languageSelect.setAttribute('aria-label', selected === 'sv' ? 'Välj språk' : selected === 'en' ? 'Select language' : 'اختر اللغة');
  document.title = selected === 'sv' ? 'Salon Shave & Cut – Skarpnäck' : selected === 'en' ? 'Salon Shave & Cut – Skarpnäck Hair Salon' : 'Salon Shave & Cut – صالون شعر في سكارَبناك';
  try { localStorage.setItem('shavecut-language', selected); } catch (_) {}
};

let savedLanguage = 'sv';
try { savedLanguage = localStorage.getItem('shavecut-language') || 'sv'; } catch (_) {}
if (languageSelect) {
  languageSelect.addEventListener('change', event => setLanguage(event.target.value));
  setLanguage(savedLanguage);
  new MutationObserver(() => translateTextNodes(languageSelect.value)).observe(document.body, { childList: true, subtree: true });
}

// ---- Lightbox ----
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxClose = document.getElementById('lightboxClose');

function openLightboxFromItem(item) {
  const vid = item.querySelector('video');
  const img = item.querySelector('img');

  if (vid) {
    const src = vid.querySelector('source')?.src || '';
    lightboxVideo.src = src;
    lightbox.classList.add('active', 'is-video');
    // Auto-play direkt
    const p = lightboxVideo.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  } else if (img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    lightbox.classList.remove('is-video');
  }
  document.body.style.overflow = 'hidden';
}

// Delegera klick på alla gallery-grids (featured + album-modal-grid)
document.addEventListener('click', e => {
  // ignorera klick på album-card (det öppnar album-modal istället)
  if (e.target.closest('.album-card')) return;
  const item = e.target.closest('.gallery-item');
  if (!item) return;
  // Bara om item ligger i en gallery-grid eller album-modal__grid
  if (!item.closest('.gallery-grid, .album-modal__grid')) return;
  openLightboxFromItem(item);
});

function closeLightbox() {
  lightbox.classList.remove('active', 'is-video');
  lightboxImg.src = '';
  lightboxVideo.src = '';
  // Behåll body-overflow om album-modal fortfarande är öppen
  if (!document.getElementById('albumModal')?.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
});

// ---- Album Modal ----
const albumModal       = document.getElementById('albumModal');
const albumModalGrid   = document.getElementById('albumModalGrid');
const albumModalTitle  = document.getElementById('albumModalTitle');
const albumModalClose  = document.getElementById('albumModalClose');
const albumModalBackdrop = document.getElementById('albumModalBackdrop');

const albumTitles = {
  bilder: 'Bilder',
  videor: 'Videor'
};

function openAlbum(key) {
  const source = document.getElementById('album-data-' + key);
  if (!source || !albumModal) return;
  albumModalTitle.textContent = albumTitles[key] || 'Album';
  albumModalGrid.innerHTML = '';
  // Klona barnen så originalen ligger kvar
  Array.from(source.children).forEach(node => {
    albumModalGrid.appendChild(node.cloneNode(true));
  });
  albumModal.classList.add('open');
  albumModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeAlbum() {
  if (!albumModal) return;
  albumModal.classList.remove('open');
  albumModal.setAttribute('aria-hidden', 'true');
  albumModalGrid.innerHTML = '';
  if (!lightbox.classList.contains('active')) {
    document.body.style.overflow = '';
  }
}

document.querySelectorAll('.album-card').forEach(card => {
  card.addEventListener('click', () => openAlbum(card.dataset.album));
});

if (albumModalClose) albumModalClose.addEventListener('click', closeAlbum);
if (albumModalBackdrop) albumModalBackdrop.addEventListener('click', closeAlbum);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && albumModal && albumModal.classList.contains('open') && !lightbox.classList.contains('active')) {
    closeAlbum();
  }
});

// ---- Slumpa de 3 roterande "featured"-bilderna vid varje besök ----
(function rotateFeatured() {
  const slots = document.querySelectorAll('.featured-rotate img');
  const pool  = document.querySelectorAll('#album-data-bilder img');
  if (!slots.length || !pool.length) return;

  // Plocka ut alla källor och filtrera bort hero-bilden så den inte dubbleras
  const heroSrc = document.querySelector('.gallery-grid--featured .gallery-item--wide.gallery-item--tall img')?.src || '';
  const all = Array.from(pool).map(i => i.src).filter(s => s !== heroSrc);

  // Shuffle (Fisher-Yates)
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  slots.forEach((img, idx) => {
    const next = all[idx];
    if (next) img.src = next;
  });
})();

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
