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
    desc: `Bubber Ducky is where I really focused on making animations and models that would make the player controller feel smooth and responsive. We refined rigs, state machines, and timing so movement, collisions, and feedback landed cleanly. That process taught me how to shape assets around systems to achieve a smooth, playful feel.`,
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
    desc: `Dungeon-Divers became my sandbox for procedural generation and scalability. I experimented with simple generators and constraints to create layouts that stayed readable, then organized tiles and data so content could grow without breaking flow. Through that process I learned how to balance unpredictability with clarity. In addition, I got familiar with creating facing direction animation sets and programming the managing system for 8 directional movement for pixel art characters.`,
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
