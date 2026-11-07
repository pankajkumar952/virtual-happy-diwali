# Virtual Happy Diwali

**Built by Engineer Pankaj Kumar**

A free, browser-based Diwali fireworks and crackers simulator. Tap the sky, light virtual crackers, write a wish in the sky and share it with family and friends. Runs on phones, tablets and computers with no sign-up and no backend.

## Features

- **15 firework shell types:** peony, chrysanthemum, golden willow, kamuro, brocade, pistil, crossette, ring, palm, strobe, crackle, double blast, heart, star and spiral.
- **Ground crackers:** anar (flowerpot), chakri (spinning wheel), ladi (string of crackers), atom bomb and phuljhadi (sparkler), plus fountain "Ground fx".
- **Shows:** Grand show, Today's show (a different show every day), 10-second Countdown and Finale. Auto show can be paused.
- **Write in sky:** type a wish and watch it form in fireworks.
- **Share greeting:** uses the device share sheet, with a WhatsApp fallback.
- **Layered Web Audio sound:** synthesized crack, boom, rumble and crackle with stereo positioning, a built-in limiter and smooth volume control. Sound mode: Auto, Loud, Soft or Mute.
- **Themes:** Colourful mix, Diwali Gold, Rainbow, Tricolour, Royal Blue and Pink, Pastel.
- **Performance engineering:** pooled particles (no per-frame allocation), cached colours and glow sprites, a particle cap, and automatic quality scaling when the frame rate drops.
- **Extras:** City in front toggle, Launch speed, Save photo, Full screen, tap-to-launch.

## Tech stack

Vanilla JavaScript (Canvas 2D + Web Audio API), Vite, Tailwind CSS.

## Project structure

```
virtual-happy-diwali/
├── index.html            # page, SEO metadata, simulator markup
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/               # favicon.svg, robots.txt
└── src/
    ├── main.js           # engine, audio, controls
    └── style.css         # Tailwind layers + simulator styles
```

## Local setup

Requirements: [Node.js](https://nodejs.org) 18 or newer.

```bash
# 1. Extract the ZIP and open the folder
cd virtual-happy-diwali

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the address printed in the terminal (usually http://localhost:5173), press **Start the show** and turn your sound on.

Other commands:

```bash
npm run build     # production build into ./dist
npm run preview   # serve the production build locally
```

## Push to GitHub

1. Create an empty repository on [github.com/new](https://github.com/new) named `virtual-happy-diwali` (do not add a README or .gitignore).
2. In the project folder run:

```bash
git init
git add .
git commit -m "Virtual Happy Diwali - first release"
git branch -M main
git remote add origin https://github.com/<your-username>/virtual-happy-diwali.git
git push -u origin main
```

Replace `<your-username>` with your GitHub username.

## Deploy to Vercel

**Option A: from GitHub (recommended)**

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
2. Click **Add New → Project** and import the `virtual-happy-diwali` repository.
3. Vercel detects Vite automatically. Confirm: Framework Preset **Vite**, Build Command `npm run build`, Output Directory `dist`.
4. Click **Deploy**. Every push to `main` redeploys automatically.

**Option B: Vercel CLI**

```bash
npm install -g vercel
vercel          # first deploy (preview), follow the prompts
vercel --prod   # production deploy
```

**After deploying:** add your own domain under Project → Settings → Domains. Once you have the final URL, you can add a canonical link and sitemap in `index.html` and `public/` for better search ranking.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari (desktop and mobile). Browsers only allow sound after a tap, which is why the show starts with the **Start the show** button. The simulator contains flashing lights.

## Troubleshooting

- **No sound:** press Start, check the Sound setting is not Mute, raise Volume, and make sure the phone is not on silent mode.
- **Slow on an old device:** the engine lowers particle counts automatically; closing other tabs also helps.
- **`npm install` fails:** check `node -v` shows 18 or higher.

## Credits

Built by Engineer Pankaj Kumar. © Engineer Pankaj Kumar. All rights reserved.
