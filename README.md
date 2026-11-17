# 🪔 Virtual Happy Diwali

**Built by Engineer Pankaj Kumar**

[![Live Demo](https://img.shields.io/badge/Live-Demo-orange?style=for-the-badge&logo=vercel)](https://virtual-happy-diwali.vercel.app/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-Powered-646CFF?style=for-the-badge&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**Experience the magic of Diwali with Virtual Happy Diwali!**

A free, browser-based Diwali fireworks and crackers simulator. Tap the sky, light virtual crackers, write a wish in the sky, and share festive greetings with family and friends.

No sign-up, no backend, and no installation required. Just open the website and enjoy the celebration on your phone, tablet, or computer.

## 🌐 Live Demo

**Experience the celebration here:**

### [🎆 Virtual Happy Diwali – Open Live Website](https://virtual-happy-diwali.vercel.app/)

## ✨ Features

### 🎆 1. Fireworks Simulation
- 15 different firework shell types:
  - Peony
  - Chrysanthemum
  - Golden Willow
  - Kamuro
  - Brocade
  - Pistil
  - Crossette
  - Ring
  - Palm
  - Strobe
  - Crackle
  - Double Blast
  - Heart
  - Star
  - Spiral

### 🧨 2. Virtual Ground Crackers
- Anar (Flowerpot)
- Chakri (Spinning Wheel)
- Ladi (String of Crackers)
- Atom Bomb
- Phuljhadi (Sparkler)
- Ground FX Fountain

### 🎇 3. Special Fireworks Shows
- Grand Show
- Today's Show – A different show every day
- 10-Second Countdown
- Grand Finale
- Automatic show mode with pause functionality

### 💌 4. Write Your Wish in the Sky
- Enter your personal Diwali greeting.
- Watch your message appear through fireworks.
- Create a memorable festive experience.

### 📲 5. Share Diwali Greetings
- Share greetings using your device's native share menu.
- WhatsApp sharing fallback.
- Send festive wishes to friends and family.

### 🔊 6. Immersive Sound Effects
Layered Web Audio API sound effects:
- Crack
- Boom
- Rumble
- Crackle
- Stereo positioning
- Built-in audio limiter
- Smooth volume control

Sound modes:
- Auto
- Loud
- Soft
- Mute

### 🎨 7. Beautiful Themes
Choose from six visual themes:
- Colourful Mix
- Diwali Gold
- Rainbow
- Tricolour
- Royal Blue and Pink
- Pastel

### ⚡ 8. Performance Optimization
- Pooled particles to reduce per-frame allocations.
- Cached colours and glow sprites.
- Particle count limits.
- Automatic quality scaling when frame rates drop.
- Optimized Canvas 2D rendering.

### 🛠️ 9. Additional Controls
- City in Front toggle
- Adjustable Launch Speed
- Save Photo
- Full-Screen Mode
- Tap-to-Launch Fireworks

## 🧑‍💻 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and animations |
| JavaScript | Fireworks engine and application logic |
| Canvas 2D API | Fireworks and particle rendering |
| Web Audio API | Synthesized sound effects |
| Vite | Development server and build tool |
| Tailwind CSS | Utility-first styling |
| Vercel | Deployment and hosting |
| Git & GitHub | Version control and source code hosting |

## 📂 Project Structure

```text
virtual-happy-diwali/
│
├── index.html
│   └── Page structure, SEO metadata and simulator markup
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
├── public/
│   ├── favicon.svg
│   └── robots.txt
│
└── src/
    ├── main.js
    │   └── Fireworks engine, audio and controls
    │
    └── style.css
        └── Tailwind layers and simulator styles
```

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install:

- [Node.js 18 or newer](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/virtual-happy-diwali.git
```

### 2. Navigate to the Project

```bash
cd virtual-happy-diwali
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

Open the local URL printed in your terminal, usually:

```text
http://localhost:5173
```

Click **Start the Show** and enjoy the fireworks!

### 5. Production Build

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

The production files will be generated inside the `dist/` directory.

## 📤 Push Project to GitHub

Create an empty repository on GitHub:

[Create GitHub Repository](https://github.com/new)

Repository name:

```text
virtual-happy-diwali
```

Run these commands inside your project folder:

```bash
git init
git add .
git commit -m "Virtual Happy Diwali - first release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/virtual-happy-diwali.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## ☁️ Deploy on Vercel

The project is deployed using Vercel.

**Live Website:**

https://virtual-happy-diwali.vercel.app/

### Deploy Using GitHub

1. Visit [Vercel](https://vercel.com/).
2. Sign in using your GitHub account.
3. Select **Add New → Project**.
4. Import your `virtual-happy-diwali` repository.
5. Configure the following settings:

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

6. Click **Deploy**.

Vercel can automatically redeploy the project whenever you push changes to your connected GitHub repository.

### Deploy Using Vercel CLI

Alternatively, use:

```bash
npm install -g vercel
vercel
vercel --prod
```

## 🌍 Browser Compatibility

Supported browsers:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Apple Safari

Compatible with:
- Desktop computers
- Android smartphones
- iPhones and iPads
- Tablets

**Note:** Browsers require user interaction before enabling audio playback. Click the Start the Show button to activate the experience.

The simulator contains flashing lights.

## 🔧 Troubleshooting

**Problem: No Sound**

- Click Start the Show.
- Check that Sound Mode is not set to Mute.
- Increase the volume.
- Check your device's silent mode.

**Problem: Slow Performance**

- Close unnecessary browser tabs.
- Reduce the number of active effects if controls are available.
- The simulator automatically adjusts particle quality when performance drops.

**Problem: npm install Fails**

Check your Node.js version:

```bash
node -v
```

Make sure Node.js 18 or newer is installed.

## 🎯 Project Goals

The main goals of Virtual Happy Diwali are:

- Promote safe and eco-friendly virtual celebrations.
- Provide an interactive festive experience.
- Make Diwali celebrations accessible across devices.
- Demonstrate browser-based graphics and audio technologies.
- Combine JavaScript, Canvas 2D and Web Audio API in an interactive project.

## 👨‍💻 Developer

**Engineer Pankaj Kumar**

B.Tech – Computer Science Engineering

- GitHub: https://github.com/pankajkumar952/
- LinkedIn: https://www.linkedin.com/in/pankaj-kumar-0b82a8238/
- Portfolio: https://pankaj95231.github.io/Portfolio/

## ❤️ Credits

Designed and developed with ❤️ by **Engineer Pankaj Kumar**.

A small digital celebration created to spread happiness, positivity, and the spirit of Diwali.

**Wishing everyone a very Happy and Prosperous Diwali! 🪔🎆**

---

© Engineer Pankaj Kumar. All Rights Reserved.
