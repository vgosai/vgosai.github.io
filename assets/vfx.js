
(function(){ 
  const card = document.querySelector('.project[data-project="vfx"]');
  if (!card) return;

  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinkWrap = document.getElementById('modalLinkWrap');
  const modalCarousel = document.getElementById('modalCarousel');
  const carouselDots = document.getElementById('carouselDots');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  const WaterShader = {
    title: "Water Shader",
    tags: "HLSL (Unity) • C#",
    slides: [
      { src: "images/vfx-1.gif", alt: "Gold particle waves VFX", caption: "Particle ribbon / golden waves — real-time prototype." }
    ]
  };

  function renderSlides() {
    modalCarousel.innerHTML = "";
    carouselDots.innerHTML = "";
    WaterShader.slides.forEach((s, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (i===0?' active':'');
      const img = document.createElement('img');
      img.src = s.src; img.alt = s.alt||""; img.loading = 'eager';
      slide.appendChild(img);
      modalCarousel.appendChild(slide);

      const dot = document.createElement('button');
      if (i===0) dot.classList.add('active');
      dot.addEventListener('click', () => go(i));
      carouselDots.appendChild(dot);
    });
    modalCaption && (modalCaption.textContent = WaterShader.slides[0].caption||"");
  }

  function go(i) {
    const slides = modalCarousel.querySelectorAll('.slide');
    const dots = carouselDots.querySelectorAll('button');
    slides.forEach((s, k)=>s.classList.toggle('active', k===i));
    dots.forEach((d, k)=>d.classList.toggle('active', k===i));
    modalCaption && (modalCaption.textContent = WaterShader.slides[i].caption||"");
  }

  card.addEventListener('click', () => {
    modalTitle.textContent = WaterShader.title;
    modalCategory.textContent = WaterShader.tags;
    modalDesc.innerHTML = `
      <h4 style="margin:.4rem 0 .25rem;">Experience</h4>
      <p>Developing this water shader was an exciting deep dive into procedural effects and shader logic. Starting from a procedurally generated dungeon, I generated a height map where elevation was determined by distance-from-wall using a multi‑source BFS. That data drove a depth‑aware color gradient base layer. I then layered animated caustics driven by a Perlin noise gradient, offsetting the loop to create natural water motion. Finally, I added specular highlights to simulate reflective lighting so the surface shimmers in play. This project sharpened my understanding of HLSL in Unity, texture blending, and noise manipulation—bridging math and art to craft effects that feel alive.</p>
`;
    modalLinkWrap.innerHTML = "";
    renderSlides();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  });
})();
