/* ─── PARTICLES (DISABLED for Performance) ────────── */
// The legacy 2D particle canvas was running simultaneously with the new 
// Three.js CinematicBackground, causing massive GPU load and lag.
// We disable this legacy system and rely entirely on the modern React 3D background.
/*
const cnv = document.getElementById('canvas');
const cx = cnv.getContext('2d');
let pts = [], mx = -999, my = -999;

function resize() {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
  init();
}

function init() {
  pts = [];
  const density = window.innerWidth < 768 ? 35000 : 16000;
  const n = Math.floor(innerWidth * innerHeight / density);
  for (let i = 0; i < n; i++) {
    pts.push({
      x: Math.random() * cnv.width,
      y: Math.random() * cnv.height,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.5 + .4,
      o: Math.random() * .5 + .1,
      c: ['#7c3aed', '#06b6d4', '#ffffff'][Math.floor(Math.random() * 3)]
    });
  }
}

resize();
let resizeTo;
window.addEventListener('resize', () => {
  clearTimeout(resizeTo);
  resizeTo = setTimeout(resize, 200);
});

function draw() {
  cx.clearRect(0, 0, cnv.width, cnv.height);
  pts.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = cnv.width;
    if (p.x > cnv.width) p.x = 0;
    if (p.y < 0) p.y = cnv.height;
    if (p.y > cnv.height) p.y = 0;
    // Repulsion with divide-by-zero guard
    const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
    if (d < 100 && d > 0.5) { p.x += dx / d * 1.5; p.y += dy / d * 1.5; }
    cx.beginPath();
    cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    cx.fillStyle = p.c;
    cx.globalAlpha = p.o;
    cx.fill();
  });
  cx.globalAlpha = 1;
  if (window.innerWidth > 768) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          cx.beginPath();
          cx.moveTo(pts[i].x, pts[i].y);
          cx.lineTo(pts[j].x, pts[j].y);
          cx.strokeStyle = `rgba(124,58,237,${.07 * (1 - d / 110)})`;
          cx.lineWidth = .5;
          cx.stroke();
        }
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();
*/

/* ─── CURSOR GLOW (handled by React CustomCursor) ─── */
// The #cursor div is kept in HTML only as a fallback glow for touch devices
// On mouse devices, React's CustomCursor component takes over.
const cur = document.getElementById('cursor');
if (cur && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  // React CustomCursor is active — hide the CSS-only fallback
  cur.style.display = 'none';
}

/* ─── TYPED TEXT ─────────────────────────────── */
const lines = ['Data Science Enthusiast', 'ML Engineer (Aspiring)', 'EDA Practitioner', 'Python & SQL Developer', 'Kaggle Contributor', 'AI-Accelerated Builder', 'Problem Solver & Creator', 'B.Tech CSE · CGPA 8.0+'];
let li = 0, ci = 0, del = false;
const tel = document.getElementById('typed');
let lastTime = 0;
let waitTime = 0;
function type(time) {
  if (!tel) return;
  if (!lastTime) lastTime = time;
  const delta = time - lastTime;
  
  if (waitTime > 0) {
    if (delta > waitTime) {
      waitTime = 0;
      lastTime = time;
    } else {
      window.requestAnimationFrame(type);
      return;
    }
  }

  const speed = del ? 55 : 85;
  if (delta > speed) {
    lastTime = time;
    const w = lines[li];
    if (!del) {
      tel.textContent = w.slice(0, ++ci);
      if (ci === w.length) { del = true; waitTime = 1900; }
    } else {
      tel.textContent = w.slice(0, --ci);
      if (ci === 0) { del = false; li = (li + 1) % lines.length; waitTime = 300; }
    }
  }
  window.requestAnimationFrame(type);
}
window.requestAnimationFrame(type);

/* ─── SCROLL ─────────────────────────────────── */
const nav2 = document.getElementById('nav');
const btt = document.getElementById('btt');
const prog = document.getElementById('prog');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const sy = scrollY, dh = document.documentElement.scrollHeight - innerHeight;
      if (dh > 0) prog.style.width = (sy / dh * 100) + '%';
      nav2.classList.toggle('stuck', sy > 50);
      btt.classList.toggle('show', sy > 400);
      const secs = ['about', 'skills', 'projects', 'experience', 'focus', 'resume', 'education', 'interests', 'contact'];
      let cur2 = '';
      secs.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 130) cur2 = id;
      });
      document.querySelectorAll('.nav-ul a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur2));
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ─── MOBILE NAV ─────────────────────────────── */
function toggleNav() {
  const burger = document.getElementById('burger');
  const mobnav = document.getElementById('mobnav');
  const isOpen = !mobnav.hidden;
  burger.classList.toggle('open', !isOpen);
  burger.setAttribute('aria-expanded', String(!isOpen));
  if (isOpen) {
    mobnav.hidden = true;
    document.body.classList.remove('nav-open');
  } else {
    mobnav.hidden = false;
    document.body.classList.add('nav-open');
  }
}

function closeNav() {
  const burger = document.getElementById('burger');
  const mobnav = document.getElementById('mobnav');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  mobnav.hidden = true;
  document.body.classList.remove('nav-open');
}

// Close mobile nav on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

/* ─── REVEAL ─────────────────────────────────── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      e.target.querySelectorAll('.bar-fill').forEach(b => b.style.width = b.dataset.pct + '%');
      e.target.querySelectorAll('[data-count]').forEach(el => count(el));
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.rv,.rvl,.rvr').forEach(el => obs.observe(el));

/* ─── COUNTER ────────────────────────────────── */
function count(el) {
  const t = +el.dataset.count;
  let c = 0;
  const s = Math.ceil(t / 40);
  // Guard against repeated triggers
  if (el.dataset.counted) return;
  el.dataset.counted = 'true';
  const tmr = setInterval(() => {
    c = Math.min(c + s, t);
    el.textContent = c + '+';
    if (c >= t) clearInterval(tmr);
  }, 38);
}

/* ─── TABS ───────────────────────────────────── */
function switchTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
  document.getElementById('panel-' + id).classList.add('on');
  btn.classList.add('on');
  document.querySelectorAll('#panel-' + id + ' .bar-fill').forEach(b => {
    b.style.width = '0%';
    setTimeout(() => b.style.width = b.dataset.pct + '%', 60);
  });
}
window.addEventListener('load', () => {
  setTimeout(() => document.querySelectorAll('#panel-core .bar-fill').forEach(b => b.style.width = b.dataset.pct + '%'), 700);
});

/* ─── TILT on project cards ───────────────────── */
// Only add tilt on devices with a fine pointer (mouse), not touch
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.pcard').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 14;
      const y = ((e.clientY - r.top) / r.height - .5) * -14;
      c.style.transform = `translateY(-7px) rotateX(${y}deg) rotateY(${x}deg)`;
      c.style.transformStyle = 'preserve-3d';
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });
}

/* ─── SMOOTH SCROLL ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href'));
  if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); closeNav(); }
}));

/* ─── Expose to global scope for HTML inline event listeners ─── */
window.toggleNav = toggleNav;
window.closeNav = closeNav;
window.switchTab = switchTab;
