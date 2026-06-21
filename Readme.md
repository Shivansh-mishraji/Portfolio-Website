<div align="center">

<!-- Dynamic Typing Header -->
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=30&pause=1000&color=7C3AED&center=true&vCenter=true&width=600&lines=Shivansh+Mishra;AI+%26+ML+Engineer;Full-Stack+Vibe+Coder;Data+Science+Builder" alt="Typing SVG" /></a>

<p align="center">
  A highly optimized, fully responsive, and interactive personal portfolio showcasing projects in Machine Learning, Data Science, and Full-Stack AI Product Development.
</p>

<!-- Tech Stack Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JS" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <a href="https://www.kaggle.com/shivansh7275" target="_blank"><img src="https://img.shields.io/badge/Kaggle-20BEFF?style=for-the-badge&logo=Kaggle&logoColor=white" alt="Kaggle" /></a>
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
</p>

</div>

---

## 🚀 Interactive UI & Performance Engine

This portfolio isn't just a static page — it's a **multi-page Vite/React hybrid** web experience with cinematic animations and production-grade performance.

- **Interactive 3D Dynamics**: Dynamic HTML5 particle canvas (2D) + Three.js React-Fiber cinematic background (3D), custom WebGL particle fields with live mouse repulsion physics.
- **Cinematic Effects**: GSAP ScrollTrigger reveal animations, magnetic hover on nav/buttons, glassmorphism tilt cards with glare effects, custom SVG grain overlay.
- **Extreme Mobile Smoothness**:
  - ⚡ **Adaptive Particles**: Count scales 200 (mobile) → 500 (tablet) → 800 (desktop)
  - 🎯 **Touch Guard**: Three.js entirely disabled on touch-only devices
  - 🌀 **Scroll Debouncing**: `requestAnimationFrame` + `passive:true` listeners
  - 📱 **Touch Optimized**: All hover effects guarded by `(hover: hover) and (pointer: fine)`
- **Multi-Page App**: Vite configured with Rollup multi-entry for all 5 resume variants + main portfolio

## 🛡️ Enterprise Security

- **Zero Tabnabbing**: All external links sandboxed with `rel="noopener noreferrer"`
- **Spam Mitigation**: Contact form has invisible honeypot (`_honey`) + FormSubmit captcha
- **Strict CSP**: `Content-Security-Policy` meta tag whitelisting only required domains
- **Form Security**: Input validation (required fields, email type, textarea minlength)

## 📱 Instant SMS Notifications

Contact form messages trigger **instant push notifications** to Shivansh's phone via [ntfy.sh](https://ntfy.sh) — a 100% free, open-source push notification service. No paid SMS gateway needed.

- Fire-and-forget JavaScript `fetch` to `https://ntfy.sh/` on form submit
- High-priority notification with sender name, email, subject, message
- Backup copy sent to Gmail via FormSubmit.co
- Works forever, no account required

## ♿ Accessibility (WCAG 2.1)

- `:focus-visible` keyboard navigation with cyan outline
- `.skip-nav` skip-to-content link for screen readers
- `aria-label` on all interactive elements
- `prefers-reduced-motion` disables all CSS animations
- Semantic HTML5 with proper heading hierarchy

---

## 📊 Developer Metrics

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=shivansh-mishraji&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0f172a" alt="GitHub Stats" />
  <br/>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=shivansh-mishraji&theme=tokyonight&hide_border=true&background=0f172a" alt="GitHub Streak" />
  <br/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=shivansh-mishraji&layout=compact&theme=tokyonight&hide_border=true&bg_color=0f172a" alt="Top Languages" />
</div>

---

## 🐛 Bug Fixes (v2.0)

| # | Fix | File |
|---|-----|------|
| 1 | Mobile nav completely broken (functions in dead comment block) | `main.js` |
| 2 | Section headings lost gradient (AdvancedEffects split text nodes) | `AdvancedEffects.jsx` |
| 3 | Undefined `--navy-deep` CSS variable | `CinematicBackground.jsx` |
| 4 | 3D tilt conflict on project cards (dual listeners) | `AdvancedEffects.jsx` + `main.js` |
| 5 | Divide-by-zero in particle repulsion (d=0 → NaN) | `main.js` |
| 6 | Custom cursor applied on touch devices | `CustomCursor.jsx` |
| 7 | Grain overlay covered onboarding screen | `cinematic.css` |
| 8 | Contact form redirect hardcoded to old Vercel URL | `index.html` |
| 9 | Resume back-link broke in new tab / Vercel deploys | All resume HTMLs |
| 10 | Resume files missing from Vite build (not in rollupOptions) | `vite.config.js` |

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production (multi-page)
npm run build
```

---
<div align="center">
  <i>Built by Shivansh Mishra — Continuous learner, builder, and AI enthusiast.</i>
</div>
