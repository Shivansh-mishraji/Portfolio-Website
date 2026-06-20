
  /* ─── PARTICLES ──────────────────────────────── */
  const cnv = document.getElementById('canvas');
  const cx = cnv.getContext('2d');
  let pts = [], mx = -999, my = -999;
  function resize(){ cnv.width=innerWidth; cnv.height=innerHeight; init(); }
  function init(){
    pts=[];
    const n=Math.floor(innerWidth*innerHeight/16000);
    for(let i=0;i<n;i++) pts.push({ x:Math.random()*cnv.width, y:Math.random()*cnv.height, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*1.5+.4, o:Math.random()*.5+.1, c:['#7c3aed','#06b6d4','#ffffff'][Math.floor(Math.random()*3)] });
  }
  resize(); window.addEventListener('resize',resize);
  function draw(){
    cx.clearRect(0,0,cnv.width,cnv.height);
    pts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=cnv.width; if(p.x>cnv.width)p.x=0;
      if(p.y<0)p.y=cnv.height; if(p.y>cnv.height)p.y=0;
      const dx=p.x-mx,dy=p.y-my,d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){p.x+=dx/d*1.5;p.y+=dy/d*1.5;}
      cx.beginPath(); cx.arc(p.x,p.y,p.r,0,Math.PI*2); cx.fillStyle=p.c; cx.globalAlpha=p.o; cx.fill();
    });
    cx.globalAlpha=1;
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<110 && window.innerWidth > 768){ cx.beginPath(); cx.moveTo(pts[i].x,pts[i].y); cx.lineTo(pts[j].x,pts[j].y); cx.strokeStyle=`rgba(124,58,237,${.07*(1-d/110)})`; cx.lineWidth=.5; cx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  draw();

  /* ─── CURSOR GLOW ────────────────────────────── */
  const cur=document.getElementById('cursor');
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; cur.style.left=e.clientX+'px'; cur.style.top=e.clientY+'px'; });

  /* ─── TYPED TEXT ─────────────────────────────── */
  const lines=['Data Science Enthusiast','ML Engineer (in progress)','AI Product Builder','Vibe Coder & Prototyper','Python Developer','Cloud Computing Student'];
  let li=0,ci=0,del=false;
  const tel=document.getElementById('typed');
  function type(){
    const w=lines[li];
    if(!del){ tel.textContent=w.slice(0,++ci); if(ci===w.length){del=true;setTimeout(type,1900);return;} }
    else{ tel.textContent=w.slice(0,--ci); if(ci===0){del=false;li=(li+1)%lines.length;} }
    setTimeout(type,del?55:85);
  }
  type();

  /* ─── SCROLL ─────────────────────────────────── */
  const nav2=document.getElementById('nav');
  const btt=document.getElementById('btt');
  const prog=document.getElementById('prog');
  let ticking = false;
  window.addEventListener('scroll',()=>{
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const sy=scrollY, dh=document.documentElement.scrollHeight-innerHeight;
        prog.style.width=(sy/dh*100)+'%';
        nav2.classList.toggle('stuck',sy>50);
        btt.classList.toggle('show',sy>400);
        const secs=['about','skills','projects','experience','focus','education','contact'];
        let cur2='';
        secs.forEach(id=>{ const el=document.getElementById(id); if(el&&el.getBoundingClientRect().top<130)cur2=id; });
        document.querySelectorAll('.nav-ul a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur2));
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  // old scroll listener commented out:
  /*
    const sy=scrollY, dh=document.documentElement.scrollHeight-innerHeight;
    prog.style.width=(sy/dh*100)+'%';
    nav2.classList.toggle('stuck',sy>50);
    btt.classList.toggle('show',sy>400);
    const secs=['about','skills','projects','experience','focus','education','contact'];
    let cur2='';
    secs.forEach(id=>{ const el=document.getElementById(id); if(el&&el.getBoundingClientRect().top<130)cur2=id; });
    document.querySelectorAll('.nav-ul a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur2));
  });

  /* ─── MOBILE NAV ─────────────────────────────── */
  function toggleNav(){ document.getElementById('burger').classList.toggle('open'); document.getElementById('mobnav').classList.toggle('open'); }
  function closeNav(){ document.getElementById('burger').classList.remove('open'); document.getElementById('mobnav').classList.remove('open'); }

  /* ─── REVEAL ─────────────────────────────────── */
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        e.target.querySelectorAll('.bar-fill').forEach(b=>b.style.width=b.dataset.pct+'%');
        e.target.querySelectorAll('[data-count]').forEach(el=>count(el));
      }
    });
  },{threshold:.1});
  document.querySelectorAll('.rv,.rvl,.rvr').forEach(el=>obs.observe(el));

  /* ─── COUNTER ────────────────────────────────── */
  function count(el){ const t=+el.dataset.count; let c=0; const s=Math.ceil(t/40); const tmr=setInterval(()=>{ c=Math.min(c+s,t); el.textContent=c+'+'; if(c>=t)clearInterval(tmr); },38); }

  /* ─── TABS ───────────────────────────────────── */
  function switchTab(id,btn){
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('on'));
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('on'));
    document.getElementById('panel-'+id).classList.add('on');
    btn.classList.add('on');
    document.querySelectorAll('#panel-'+id+' .bar-fill').forEach(b=>{b.style.width='0%';setTimeout(()=>b.style.width=b.dataset.pct+'%',60);});
  }
  window.addEventListener('load',()=>{ setTimeout(()=>document.querySelectorAll('#panel-core .bar-fill').forEach(b=>b.style.width=b.dataset.pct+'%'),700); });

  /* ─── TILT ───────────────────────────────────── */
  document.querySelectorAll('.pcard').forEach(c=>{
    c.addEventListener('mousemove',e=>{ const r=c.getBoundingClientRect(),x=((e.clientX-r.left)/r.width-.5)*14,y=((e.clientY-r.top)/r.height-.5)*-14; c.style.transform=`translateY(-7px) rotateX(${y}deg) rotateY(${x}deg)`; c.style.transformStyle='preserve-3d'; });
    c.addEventListener('mouseleave',()=>c.style.transform='');
  });



  /* ─── SMOOTH SCROLL ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{ const t=document.querySelector(a.getAttribute('href')); if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});} }));

// Expose to global scope for HTML event listeners
window.toggleNav = toggleNav;
window.closeNav = closeNav;
window.switchTab = switchTab;
