<div align="center">

<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Space+Grotesk&weight=700&size=32&pause=1000&color=7C3AED&center=true&vCenter=true&width=650&lines=Shivansh+Mishra;ML+Builder+%26+AI+Product+Explorer;Data+Science+%7C+Machine+Learning;10%2B+Live+Deployed+Projects" alt="Typing SVG" /></a>

<p align="center">
  <strong>🚀 Personal Portfolio Website</strong> — A cinematic, fully responsive, production-grade portfolio showcasing Machine Learning, Data Science, and AI product engineering.
</p>

<p align="center">
  <a href="https://shivansh-mishraji.github.io/Portfolio-Website/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Portfolio-7C3AED?style=for-the-badge" alt="Live Site" />
  </a>
  <img src="https://img.shields.io/badge/Status-Active-10b981?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
</p>

</div>

---

## 👤 About

**Shivansh Mishra** — Pre-final year B.Tech CSE student at BBD University, Lucknow, specializing in **Cloud Computing & Machine Learning** (CGPA 8.0+).

Aspiring **ML Engineer** & **Data Scientist** with 10+ live deployed projects, active Kaggle contributions, and a passion for building AI-first products that solve real problems.

📍 Lucknow, UP · Remote OK &nbsp;|&nbsp; 📧 shivanshmishraji90@gmail.com &nbsp;|&nbsp; 📞 +91 9651165190

---

## ✨ Features

### 🎨 Visual & Animation Engine
- **Custom Particle Canvas** — HTML5 2D canvas with 200–800 adaptive particles + live mouse repulsion physics
- **Three.js Cinematic Background** — 3D WebGL particle field (disabled on touch devices for performance)
- **GSAP ScrollTrigger** — Smooth section reveal animations on scroll
- **Magnetic Hover** — Buttons and nav links follow cursor with physics-based attraction
- **Glassmorphism Cards** — Project cards with 3D tilt + glare effects
- **Custom Cursor** — Animated glow cursor (desktop only)
- **Typewriter Effect** — Animated role text in the hero section

### ⚡ Performance
| Optimization | Detail |
|---|---|
| Adaptive particles | 200 mobile → 500 tablet → 800 desktop |
| Touch guard | Three.js disabled on touch-only devices |
| Scroll debouncing | `requestAnimationFrame` + `passive:true` |
| Image optimization | `.webp` with `<picture>` fallback to `.jpg` |
| Font preloading | `rel="preload"` + `font-display:swap` |
| CSS animations | Disabled via `prefers-reduced-motion` |

### 🛡️ Security
- **Zero Tabnabbing** — All external links use `rel="noopener noreferrer"`
- **Strict CSP** — Content-Security-Policy meta tag whitelisting trusted domains only
- **Honeypot Spam Trap** — Invisible `_honey` field catches bots silently
- **Input Validation** — Client-side name/email/message validation before send

### ♿ Accessibility (WCAG 2.1)
- Skip-to-content link (`.skip-nav`) for screen readers
- `aria-label` on all interactive elements
- `:focus-visible` keyboard navigation with visible outline
- Semantic HTML5 with proper heading hierarchy (`h1` → `h2` → `h3`)

### 📬 Contact Form
- Submissions delivered to Gmail via **FormSubmit.co** (free, no backend needed)
- Auto-response email sent to the visitor
- Spam protection via honeypot + hidden captcha field

---

## 🗂️ Project Structure

```
Portfolio-Website/
├── index.html              # Main portfolio (single-page)
├── resume-master.html      # Master resume (all roles)
├── resume-ml-engineer.html # ML Engineer resume
├── resume-data-scientist.html
├── resume-data-analyst.html
├── resume-ai-engineer.html
├── resume.html             # General resume
├── profile.webp / .jpg     # Profile photo (WebP + fallback)
├── src/
│   ├── main.js             # Core JS (animations, canvas, nav, tabs)
│   ├── main.css            # Primary stylesheet (dark theme, components)
│   ├── cinematic.jsx       # Three.js + GSAP cinematic background
│   ├── cinematic.css       # Cinematic styles
│   └── components/         # React components (cursor, onboarding, etc.)
├── vite.config.js          # Multi-page Vite build config
└── package.json
```

---

## 🚀 Live Projects Showcased

| Project | Type | Live |
|---|---|---|
| Nyaya Mitra — AI Legal Super-App | AI Product | In Development |
| Contact Forge — Cloud Web App | Full-Stack | [Live](https://contactforge-cloud-web.vercel.app/) |
| ML Career Roadmap | Guide | [Live](https://ml-career-roadmap.vercel.app/) |
| BankChurners — Customer Churn EDA | Data Science | [Live](https://bank-churners-data-analyzer.vercel.app/) |
| House Price Prediction | ML (Scikit-learn) | [Live](https://house-price-prediction-app-tau.vercel.app) |
| Car Price Prediction (GridSearchCV) | ML | [Live](https://car-price-prediction-with-machine-l.vercel.app/) |
| Iris Classification Benchmark | ML | [Live](https://iris-flower-classification-tan.vercel.app/) |
| Unemployment Trends Analysis | EDA | [Live](https://unemployment-analysis-with-python-ivory.vercel.app/) |
| Text-to-Handwriting Converter | Web Tool | [Live](https://text-to-handwriting-converter-mu.vercel.app/) |
| Kaggle-Boost Automation | Python Scripting | [GitHub](https://github.com/Shivansh-mishraji/Kaggle-Boost) |

---

## 💻 Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/shivansh-mishraji/Portfolio-Website.git
cd Portfolio-Website

# 2. Install dependencies
npm install

# 3. Start dev server (with hot-reload)
npm run dev

# 4. Build for production
npm run build
```

---

## 📊 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=shivansh-mishraji&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0f172a" alt="GitHub Stats" />
  <br/>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=shivansh-mishraji&theme=tokyonight&hide_border=true&background=0f172a" alt="GitHub Streak" />
  <br/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=shivansh-mishraji&layout=compact&theme=tokyonight&hide_border=true&bg_color=0f172a" alt="Top Languages" />
</div>

---

## 🔗 Connect

<p align="center">
  <a href="https://www.linkedin.com/in/shivansh-mishra-132b97358" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="https://github.com/shivansh-mishraji" target="_blank"><img src="https://img.shields.io/badge/GitHub-24292e?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://www.kaggle.com/shivansh7275" target="_blank"><img src="https://img.shields.io/badge/Kaggle-20BEFF?style=for-the-badge&logo=kaggle&logoColor=white" /></a>
  <a href="mailto:shivanshmishraji90@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
</p>

---

<div align="center">
  <i>Built with ❤️ by Shivansh Mishra — Continuous learner, builder, and AI enthusiast · Lucknow, India</i>
</div>
