(function () {
  // Open from the single VFX card
  const card = document.querySelector('.project[data-project="vfx"]');
  if (!card) return;

  // Modal bits (already in your HTML)
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinkWrap = document.getElementById('modalLinkWrap');
  const modalCarousel = document.getElementById('modalCarousel');
  const carouselDots = document.getElementById('carouselDots');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  // ---------------------------
  // ENTRIES
  // 0) your original entry (unchanged)
  // 1) NEW: Water Trail Shader (images/Water_Trail.gif)
  // 2) NEW: Water Shader (images/Water_final.gif)
  // ---------------------------
  const ENTRIES = [
    {
      id: 'gold-waves',
      title: 'Water Shader',
      tags: 'Unity 6 • Shader Graph • C#',
      slides: [
        {
          src: 'images/vfx-1.gif',
          alt: 'Gold particle waves VFX',
          caption: 'Depth-Graident, Caustic, Highlights.'
        }
      ],
      experienceHTML: `
        <h4 style="margin:.4rem 0 .25rem;">Experience</h4>
        <p>Developing this water shader was an exciting deep dive into procedural effects and shader logic. Starting from a procedurally generated dungeon, I generated a height map where elevation was determined by distance-from-wall using a multi-source BFS. That data drove a depth-aware color gradient base layer. I then layered animated caustics driven by a Perlin noise gradient, offsetting the loop to create natural water motion. Finally, I added specular highlights to simulate reflective lighting so the surface shimmers in play. This project sharpened my understanding of HLSL in Unity, texture blending, and noise manipulation—bridging math and art to craft effects that feel alive.</p>
      `
    },
    {
      id: 'water-trail',
      title: 'Water Trail Shader',
      tags: 'Unity 6 • Shader Graph • C#',
      slides: [
        {
          src: 'images/Water_Trail.gif',
          alt: 'Animated water trail shader GIF',
          caption: 'Velocity-based wake with foam + caustic breakup.'
        }
      ],
      experienceHTML: `
        <h4 style="margin:.4rem 0 .25rem;">Experience</h4>
        <p>
          This effect is a <em>ripple shader</em> applied to a <strong>Trail Renderer</strong> whose width is scripted to track
          the parent sprite’s <strong>collider size</strong> and movement <strong>speed</strong>. At rest, the wake collapses
          smoothly; at higher speeds, it widens and the ripples intensify to communicate momentum. I focused on responsiveness
          and control: a velocity→width curve, ripple frequency, and a gentle falloff so the trail never overstays. The result
          feels reactive in motion and stays quiet when the character is still, which helps gameplay readability.
        </p>      `
    },
    {
      id: 'water-shader',
      title: 'Water Shader',
      tags: 'Unity 6 • Shader Graph • C#',
      slides: [
        {
          src: 'images/Water_final.gif',
          alt: 'Animated stylized water shader GIF',
          caption: 'Depth gradient + dual caustics + sparkles.'
        }
      ],
      experienceHTML: `
        <h4 style="margin:.4rem 0 .25rem;">Experience</h4>
        <p>
          Building on my earlier version, I expanded the layering strategy and refined how each pass contributes to the final
          read. I added control masks so <strong>caustics are depth-aware</strong>—they concentrate in shallow areas and fall
          off naturally with depth—then raised <strong>contrast</strong> to make the pattern feel crisp without overpowering
          the base gradient. I also rebuilt the <strong>specular highlights</strong> into <em>smaller, sparser sparkles</em>
          so the surface shimmers instead of cluttering the frame. These changes came from testing variations, comparing
          captures side-by-side, and dialing parameters toward what supports play first and foremost.
        </p>      `
    }
  ];

  let currentEntry = 0;

  function renderEntry(idx) {
    const entry = ENTRIES[idx];
    if (!entry) return;

    // Title / meta / text
    modalTitle.textContent = entry.title;
    modalCategory.textContent = entry.tags || '';
    modalDesc.innerHTML = entry.experienceHTML || '';
    modalLinkWrap.innerHTML = '';

    // Slides (one per entry here, but supports many)
    modalCarousel.innerHTML = '';
    entry.slides.forEach((s, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (i === 0 ? ' active' : '');
      const img = document.createElement('img');
      img.src = s.src;
      img.alt = s.alt || '';
      img.loading = 'eager';
      slide.appendChild(img);
      modalCarousel.appendChild(slide);
    });
    modalCaption && (modalCaption.textContent = entry.slides[0]?.caption || '');

    // Entry selector (dots under the GIF)
    carouselDots.innerHTML = '';
    ENTRIES.forEach((e, i) => {
      const dot = document.createElement('button');
      if (i === idx) dot.classList.add('active');
      dot.setAttribute('aria-label', `Show ${e.title}`);
      dot.addEventListener('click', () => {
        currentEntry = i;
        renderEntry(currentEntry);
      });
      carouselDots.appendChild(dot);
    });
  }

  function openVFXModal() {
    currentEntry = 0; // start on your original item
    renderEntry(currentEntry);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // keyboard: left/right to change entry, esc to close
    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') {
        currentEntry = Math.min(currentEntry + 1, ENTRIES.length - 1);
        renderEntry(currentEntry);
      }
      if (e.key === 'ArrowLeft') {
        currentEntry = Math.max(currentEntry - 1, 0);
        renderEntry(currentEntry);
      }
    }
    document.addEventListener('keydown', onKey);
    modal.addEventListener(
      'close-cleanup',
      () => document.removeEventListener('keydown', onKey),
      { once: true }
    );

    function close() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      modal.dispatchEvent(new Event('close-cleanup'));
    }
    modalClose?.addEventListener('click', close, { once: true });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    }, { once: true });
  }

  card.addEventListener('click', openVFXModal);
})();
