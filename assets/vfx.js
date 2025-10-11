
// VFX add-on: keeps your original script intact, only handles the new 'vfx' card.
(function(){
  const card = document.querySelector('.project[data-project="vfx"]');
  if (!card) return;

  // Modal elements from your existing markup
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinkWrap = document.getElementById('modalLinkWrap');
  const modalCarousel = document.getElementById('modalCarousel');
  const carouselDots = document.getElementById('carouselDots');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  const VFX = {
    title: "VFX",
    category: "Shaders / VFX Prototyping",
    desc: "Short 1–2s loops. Each GIF/video slide has its own caption.",
    slides: [
      { src: "images/vfx-1.gif", alt: "Gold particle waves VFX", caption: "Particle ribbon / golden waves — real-time prototype." }
      // Add more slides later: { src: "images/vfx-2.gif", alt: "...", caption: "..." }
    ]
  };

  let idx = 0;
  function render() {
    modalCarousel.innerHTML = "";
    carouselDots.innerHTML = "";
    VFX.slides.forEach((s, i) => {
      const el = document.createElement('div');
      el.className = 'slide' + (i===0?' active':'');
      const img = document.createElement('img');
      img.src = s.src; img.alt = s.alt||""; img.loading = 'eager';
      el.appendChild(img);
      modalCarousel.appendChild(el);
      const dot = document.createElement('button');
      if (i===0) dot.classList.add('active');
      dot.addEventListener('click', ()=>go(i));
      carouselDots.appendChild(dot);
    });
    modalCaption && (modalCaption.textContent = VFX.slides[0].caption||"");
  }
  function go(i){
    const slides = modalCarousel.querySelectorAll('.slide');
    const dots = carouselDots.querySelectorAll('button');
    slides.forEach((s, k)=>s.classList.toggle('active', k===i));
    dots.forEach((d, k)=>d.classList.toggle('active', k===i));
    idx = i;
    modalCaption && (modalCaption.textContent = VFX.slides[i].caption||"");
  }

  card.addEventListener('click', ()=>{
    modalTitle.textContent = VFX.title;
    modalCategory.textContent = VFX.category;
    modalDesc.textContent = VFX.desc;
    modalLinkWrap.innerHTML = ""; // no link by default
    render();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  });

  // Close resets caption (leave original close behavior intact)
  modalClose?.addEventListener('click', ()=>{ idx=0; });
})();
