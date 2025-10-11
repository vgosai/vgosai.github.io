
// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Modal elements
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalCarousel = document.getElementById('modalCarousel');
const carouselDots = document.getElementById('carouselDots');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDesc = document.getElementById('modalDesc');
const modalCaption = document.getElementById('modalCaption');

// Project data: images/gifs + per-slide captions + external links
const PROJECTS = {
  chimera: {
    title: "Chimera",
    category: "Game Jam / Systems & Mentoring",
    desc: `Isometric dungeon crawler. Mentored code standards and pipelines.`,
    link: { href: "https://github.com/wangsop/Chimera", text: "GitHub Repository" },
    media: [
      { src: "images/chimera-1.png", alt: "Chimera splash", type: "image", caption: "Title screen concept" },
      { src: "images/chimera-2.png", alt: "Chimera environment", type: "image", caption: "Lab environment art" },
      { src: "images/chimera-3.png", alt: "Chimera boss", type: "image", caption: "Gameplay sprite sheet" },
    ]
  },
  chime: {
    title: "Chime",
    category: "VGDev / Project Lead",
    desc: `Isometric action prototype focusing on responsive feel and 3D-to-Unity pipeline.`,
    link: { href: "https://github.com/vgosai3/Chime", text: "GitHub Repository" },
    media: [
      { src: "images/chime-1.png", alt: "Chime key art", type: "image", caption: "Key art / title concept" },
      { src: "images/chime-2.png", alt: "Chime map", type: "image", caption: "Early world map sketch" },
      { src: "images/chime-3.png", alt: "Chime HUD", type: "image", caption: "HUD / UI pass" },
    ]
  },
  bubber: {
    title: "Bubber Ducky",
    category: "GGJ @ GSU / 3D Art & Animation",
    desc: `Physics-forward jam project featuring custom 3D duck model and UI.`,
    link: { href: "https://github.com/vgosai/bubber-ducky", text: "GitHub Repository" },
    media: [
      { src: "images/bubber-1.png", alt: "Bubber title", type: "image", caption: "Title screen mock" },
      { src: "images/bubber-2.png", alt: "Bubber dialogue", type: "image", caption: "Dialogue scene" },
      { src: "images/bubber-3.png", alt: "Bubber gameplay", type: "image", caption: "Gameplay with obstacles" },
    ]
  },
  mewohem: {
    title: "Meowhem",
    category: "GMTK 2025 / Systems & Animation",
    desc: `2D action platformer focusing on snappy player feel and timing.`,
    link: { href: "https://github.com/vgosai/GMTK2025Jam", text: "GitHub Repository" },
    media: [
      { src: "images/mewohem-1.png", alt: "Meowhem gameplay 1", type: "image", caption: "Platforming segment" },
      { src: "images/mewohem-2.png", alt: "Meowhem gameplay 2", type: "image", caption: "Wall sliding test" },
      { src: "images/mewohem-3.png", alt: "Meowhem gameplay 3", type: "image", caption: "Enemy chase" },
    ]
  },
  dungeondivers: {
    title: "Dungeon-Divers",
    category: "Brackeys 2025-2 / Systems & Design",
    desc: `Top-down roguelite with procedural layouts and encounter variety.`,
    link: { href: "https://github.com/vgosai/collectionPixelGame", text: "GitHub Repository" },
    media: [
      { src: "images/dungeondivers-1.png", alt: "DungeonDivers 1", type: "image", caption: "Procedural rooms" },
      { src: "images/dungeondivers-2.png", alt: "DungeonDivers 2", type: "image", caption: "Platforming layout" },
      { src: "images/dungeondivers-3.png", alt: "DungeonDivers 3", type: "image", caption: "Boss arena" },
    ]
  },
  // New VFX project — uses a GIF for media and per-slide captions that change with the GIF
  vfx: {
    title: "VFX",
    category: "Shaders / VFX Prototyping",
    desc: `Short, punchy visual effects loops. Each slide can be a GIF or short video, with its own caption.`,
    link: null, // optional
    media: [
      { src: "images/vfx-1.gif", alt: "Gold particle waves VFX", type: "image", caption: "Particle ribbon / golden waves — real-time prototype." }
      // You can append more GIFs later like:
      // { src: "images/vfx-2.gif", alt: "Water caustics", type: "image", caption: "Tileable caustics preview." }
    ]
  }
};

let currentIndex = 0;
let currentKey = null;

// Helpers to build slides and dots
function renderSlides(key) {
  modalCarousel.innerHTML = "";
  carouselDots.innerHTML = "";
  const { media } = PROJECTS[key];
  media.forEach((m, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');

    if (m.type === 'image') {
      const img = document.createElement('img');
      img.src = m.src;
      img.alt = m.alt || "";
      img.loading = 'eager';
      slide.appendChild(img);
    } else if (m.type === 'video') {
      const vid = document.createElement('video');
      vid.src = m.src;
      vid.autoplay = true;
      vid.loop = true;
      vid.muted = true;
      vid.playsInline = true;
      vid.setAttribute('aria-label', m.alt || "project video");
      vid.style.width = "100%";
      vid.style.height = "100%";
      slide.appendChild(vid);
    }

    modalCarousel.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = i === 0 ? 'active' : '';
    dot.setAttribute('aria-label', `Go to slide ${i+1}`);
    dot.addEventListener('click', () => goTo(i));
    carouselDots.appendChild(dot);
  });

  currentIndex = 0;
  updateCaption(key, 0);
}

function goTo(i) {
  const slides = modalCarousel.querySelectorAll('.slide');
  if (!slides.length) return;
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
  const dots = carouselDots.querySelectorAll('button');
  dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  currentIndex = i;
  updateCaption(currentKey, i);
}

function nextSlide() {
  const media = PROJECTS[currentKey].media;
  goTo((currentIndex + 1) % media.length);
}
function prevSlide() {
  const media = PROJECTS[currentKey].media;
  goTo((currentIndex - 1 + media.length) % media.length);
}

function updateCaption(key, i) {
  const item = PROJECTS[key].media[i];
  modalCaption.textContent = item.caption || "";
}

// Open a project
function openProject(key) {
  currentKey = key;
  const data = PROJECTS[key];
  modalTitle.textContent = data.title;
  modalCategory.textContent = data.category || "";
  modalDesc.textContent = data.desc || "";

  // optional link
  const linkWrap = document.getElementById('modalLinkWrap');
  linkWrap.innerHTML = "";
  if (data.link && data.link.href) {
    const a = document.createElement('a');
    a.href = data.link.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = data.link.text || "View Project";
    a.className = "re-link";
    linkWrap.appendChild(a);
  }

  renderSlides(key);
  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

// Close modal
function closeModal() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

// Click handlers
document.querySelectorAll('.project').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-project');
    if (key && PROJECTS[key]) openProject(key);
  });
});

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

// Simple auto-advance for GIF-heavy carousels (optional)
let autoTimer = null;
function startAutoAdvance() {
  stopAutoAdvance();
  autoTimer = setInterval(() => {
    if (!modal.classList.contains('open')) return;
    // Advance every 3 seconds by default
    nextSlide();
  }, 3000);
}
function stopAutoAdvance() {
  if (autoTimer) clearInterval(autoTimer);
}
modal?.addEventListener('mouseenter', stopAutoAdvance);
modal?.addEventListener('mouseleave', startAutoAdvance);


/* --- Previous script (kept for reference) ---
// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));

// Active link on scroll
const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a');
const setActive = () => {
  let fromTop = window.scrollY + 100;
  sections.forEach(sec => {
    if (fromTop >= sec.offsetTop && fromTop < sec.offsetTop + sec.offsetHeight) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      match?.classList.add('active');
    }
  });
};
window.addEventListener('scroll', setActive);
setActive();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Portfolio modal behavior + carousel
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDesc = document.getElementById('modalDesc');
const modalCarousel = document.getElementById('modalCarousel');
const carouselDots = document.getElementById('carouselDots');
const modalLinkWrap = document.getElementById('modalLinkWrap');
let _carouselTimer = null, _carouselIdx = 0;

const PROJECT_DETAILS = {
  chimera: {
    title: 'Chimera',
    category: 'Unity • Programming Mentor',
    images: ['images/chimera-1.png','images/chimera-2.png','images/chimera-3.png'],
    desc: `Worked with the programming team to establish clear standards and reviews, refactoring systems for long‑term scalability. Partnered with designers to streamline the asset pipeline, and together we developed and documented an approachable dungeon and enemy‑generation flow in Unity Tilemaps to keep content moving quickly.`,
    link: { href: 'https://github.com/wangsop/Chimera', label: 'GitHub — Chimera' }
  },
  chime: {
    title: 'Chime',
    category: 'Unity • Project Lead • Systems • 3D Assets',
    images: ['images/chime-1.png','images/chime-2.png','images/chime-3.png'],
    desc: `As project lead, coordinated milestones and scope while the team shaped the core architecture and enemy AI together. We set up a reliable Blender→Unity pipeline for modular assets, paired frequently to share practices, and kept tasks unblocked with hands‑on support so progress stayed steady.`,
    link: { href: 'https://github.com/vgosai3/Chime', label: 'GitHub — Chime' }
  },
  bubber: {
    title: 'Bubber Ducky',
    category: 'Game Jam • 3D Art & Programming',
    images: ['images/bubber-1.png','images/bubber-2.png','images/bubber-3.png'],
    desc: `Bubber Ducky is where I learned to make art work with mechanics—modeling and animating assets while pairing closely with the gameplay programmer to validate feel in engine. We refined rigs, state machines, and timing so movement, collisions, and feedback landed cleanly, then polished the result together. That process taught me how to shape assets around systems to achieve a smooth, playful feel.`,
    link: { href: 'https://github.com/vgosai/bubber-ducky', label: 'GitHub — Bubber Ducky' }
  },
  mewohem: {
    title: 'Meowhem',
    category: 'GMTK 2025 • Project Lead • Systems • Animation',
    images: ['images/mewohem-1.png','images/mewohem-2.png','images/mewohem-3.png'],
    desc: `On Meowhem I approached flow from the other side than I did with Bubber Ducky: building responsive mechanics first and then shaping animation to support that feel. I led movement and combat while partnering closely with the artist on timing, anticipation, and readability so sprites, effects, and state changes reinforced gameplay. The back-and-forth taught me how mechanics and animation co-design can lift each other, turning snappy inputs into a fluid, expressive experience.`,
    link: { href: 'https://github.com/vgosai/GMTK2025Jam', label: 'GitHub — Meowhem' }
  },
  dungeondivers: {
    title: 'Dungeon-Divers',
    category: 'Game Jam • Systems • Design • Programming',
    images: ['images/dungeondivers-1.png','images/dungeondivers-2.png','images/dungeondivers-3.png'],
    desc: `Dungeon-Divers became my sandbox for procedural generation and scalability. I experimented with simple generators and constraints to create layouts that stayed readable, then organized tiles and data so content could grow without breaking flow. Through that process I learned how to balance unpredictability with clarity.`,
    link: { href: 'https://github.com/vgosai/collectionPixelGame', label: 'GitHub — Dungeon-Divers' }
  }
};

function buildCarousel(imgs) {
  modalCarousel.innerHTML = '';
  carouselDots.innerHTML = '';
  if (!imgs || !imgs.length) return;
  imgs.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide' + (i===0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = src; img.alt = modalTitle.textContent + ' image ' + (i+1);
    slide.appendChild(img);
    modalCarousel.appendChild(slide);

    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Show image ' + (i+1));
    dot.className = i===0 ? 'active' : '';
    dot.addEventListener('click', () => showSlide(i, true));
    carouselDots.appendChild(dot);
  });
  _carouselIdx = 0;
  startCarousel();
}
function showSlide(i, userTriggered=false) {
  const slides = [...modalCarousel.querySelectorAll('.slide')];
  const dots = [...carouselDots.querySelectorAll('button')];
  if (!slides.length) return;
  _carouselIdx = (i + slides.length) % slides.length;
  slides.forEach((el, idx) => el.classList.toggle('active', idx === _carouselIdx));
  dots.forEach((el, idx) => el.classList.toggle('active', idx === _carouselIdx));
  if (userTriggered) restartCarousel();
}
function startCarousel() { clearInterval(_carouselTimer); _carouselTimer = setInterval(() => showSlide(_carouselIdx + 1), 4000); }
function restartCarousel() { clearInterval(_carouselTimer); _carouselTimer = setInterval(() => showSlide(_carouselIdx + 1), 4000); }

function openProject(id){
  const data = PROJECT_DETAILS[id];
  if (!data) return;
  modalTitle.textContent = data.title || '';
  modalCategory.textContent = data.category || '';
  // one-paragraph descriptions directly
  const _d = (data.desc || '').trim();
  modalDesc.innerHTML = `<h4 class="accent">Experience</h4><p>${_d}</p>`;
  modalLinkWrap.innerHTML = data.link ? `<a class="btn primary" target="_blank" rel="noopener" href="${data.link.href}">${data.link.label}</a>` : '';
  if (data.images && data.images.length) buildCarousel(data.images);
  else if (data.image) buildCarousel([data.image]);
  else buildCarousel([]);
  if (modal.parentElement !== document.body) { document.body.appendChild(modal); }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}

document.querySelectorAll('.project').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
});

modalClose?.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  clearInterval(_carouselTimer);
});
modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    clearInterval(_carouselTimer);
  }
});

*/
