const themeToggle = document.getElementById('themeToggle');
    const iconSun = document.getElementById('iconSun');
    const iconMoon = document.getElementById('iconMoon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    function applyTheme(t){
      document.documentElement.setAttribute('data-theme', t);
      const light = t === 'light';
      iconSun.style.display = light ? 'none' : 'block';
      iconMoon.style.display = light ? 'block' : 'none';
      localStorage.setItem('theme', t);
    }
    applyTheme(localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light'));
    themeToggle.addEventListener('click', ()=>{
      const cur = document.documentElement.getAttribute('data-theme');
      applyTheme(cur === 'light' ? 'dark' : 'light');
    });

    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    menuToggle?.addEventListener('click', ()=>{
      const open = mobileDrawer.style.display === 'flex';
      mobileDrawer.style.display = open ? 'none' : 'flex';
    });
    mobileDrawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=> mobileDrawer.style.display='none'));

    const heroVideo = document.getElementById('heroVideo');
    const heroPlay = document.getElementById('heroPlay');
    heroPlay.addEventListener('click', ()=>{
      if(heroVideo.paused){ heroVideo.play(); heroPlay.textContent = 'Pauziraj video'; }
      else { heroVideo.pause(); heroPlay.textContent = 'Pusti video'; }
    });

    const statNums = document.querySelectorAll('.stat .num');
    let statsStarted = false;
    function animateStats(){
      statNums.forEach(el=>{
        const target = +el.dataset.count;
        const dur = 1300;
        const start = performance.now();
        function tick(now){
          const p = Math.min(1, (now - start) / dur);
          const val = Math.floor(target * (0.1 + 0.9 * p*p));
          el.textContent = val.toLocaleString('sr-RS');
          if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      })
    }

    const track = document.getElementById('track');
    const slides = Array.from(track.children);
    let index = 0;
    function goTo(i){ index = (i + slides.length) % slides.length; track.style.transform = `translateX(-${index*100}%)`; }
    document.getElementById('prev').addEventListener('click', ()=> goTo(index-1));
    document.getElementById('next').addEventListener('click', ()=> goTo(index+1));
    setInterval(()=> goTo(index+1), 13000);

    document.querySelectorAll('.faq-item').forEach(item=>{
      item.querySelector('.faq-q').addEventListener('click', ()=> item.classList.toggle('open'));
    });

    
    


    const navLinks = document.querySelectorAll('nav.desktop a');
    const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
    const spy = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          navLinks.forEach(l=> l.classList.remove('active'));
          const id = '#' + entry.target.id;
          const link = document.querySelector(`nav.desktop a[href="${id}"]`);
          if(link) link.classList.add('active');
        }
      })
    },{ threshold:.4 });
    sections.forEach(sec=> sec && spy.observe(sec));

    const revealEls = document.querySelectorAll('.reveal');
    const revealIO = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); revealIO.unobserve(e.target); } })
    },{ threshold:.2 });
    revealEls.forEach(el=>revealIO.observe(el));

    const statsSection = document.getElementById('uticaj');
    const statsIO = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting && !statsStarted){ statsStarted = true; animateStats(); statsIO.disconnect(); }
    },{threshold:.4});
    statsIO.observe(statsSection);

    const toTop = document.getElementById('toTop');
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY;
      toTop.classList.toggle('show', y > 600);
    });
    toTop.addEventListener('click', ()=> window.scrollTo({ top: 0, behavior: 'smooth' }));

    const progress = document.getElementById('progress');
    document.addEventListener('scroll', ()=>{
      const h = document.documentElement;
      const p = (h.scrollTop)/(h.scrollHeight - h.clientHeight);
      progress.style.transform = `scaleX(${p})`;
    });

    document.getElementById('year').textContent = new Date().getFullYear();



document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {  // ✅ provjera da sekcija postoji
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});



    bootFromHash();
