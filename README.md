# 🟢 WIZNEO - Matrix-Themed Linktree

A stunning Matrix-inspired landing page featuring animated rain effects, floating particles, and neon green aesthetics. Perfect for creators, entrepreneurs, and tech enthusiasts who want a unique bio link page.

![Matrix Theme](https://img.shields.io/badge/theme-matrix-00FF41?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎬 **Matrix Rain Animation** - Authentic falling code effect
- ✨ **Floating Particles** - Dynamic particle system for depth
- 🔗 **Custom Link Cards** - Eye-catching cards with icons and descriptions
- 📱 **Fully Responsive** - Looks great on all devices
- 🎨 **Neon Glow Effects** - Signature Matrix green glow on hover
- 🚀 **Fast & Optimized** - Built with Vite for lightning-fast performance
- 📊 **Analytics Ready** - Built-in analytics tracking

## 🎯 Live Demo

Check out the live version: [wizneo.lovable.app](https://wizneo.lovable.app)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone https://github.com/WIZNEOAI/wizneo-linktree.git

# Navigate to the project directory
cd wizneo-linktree

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:8080`

## 🎨 Customization Guide

### 1. Update Profile Information

Edit `src/pages/Index.tsx`:

```tsx
// Change your name/brand (lines 65-69)
<h1>YOUR NAME</h1>

// Update tagline (lines 75-79)
<p>Your custom tagline here</p>
```

### 2. Replace Profile Picture

1. Add your image to `public/lovable-uploads/`
2. Update the image path in `src/pages/Index.tsx` (line 55):

```tsx
<img src="/lovable-uploads/your-image.png" alt="Your Name" />
```

### 3. Customize Links

Edit the `links` array in `src/pages/Index.tsx` (lines 16-35):

```tsx
const links = [
  {
    icon: "phone",           // Available icons: phone, tech, brain, link, and more
    title: "Your Link Title",
    description: "Your link description",
    url: "https://your-url.com"
  },
  // Add more links...
];
```

### 4. Update Social Media Links

Modify social media URLs in `src/pages/Index.tsx` (lines 98-142):

```tsx
<SocialIcon url="https://instagram.com/your-handle" />
<SocialIcon url="https://youtube.com/@your-channel" />
<SocialIcon url="https://twitter.com/your-handle" />
<SocialIcon url="https://tiktok.com/@your-handle" />
<SocialIcon url="https://github.com/your-username" />
```

### 5. Customize Colors

The project uses a Matrix green theme. To customize colors, edit `src/index.css`:

```css
:root {
  --matrix-green: 136 100% 50%;  /* HSL values */
  --matrix-dark: 120 100% 10%;
}
```

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React + React Social Icons
- **Routing:** React Router DOM
- **Animations:** Custom CSS + Tailwind

## 📦 Project Structure

```
src/
├── components/
│   ├── MatrixRain.tsx       # Matrix falling code animation
│   ├── FloatingParticles.tsx # Particle system
│   ├── LinkCard.tsx         # Custom link card component
│   └── ui/                  # shadcn/ui components
├── pages/
│   └── Index.tsx            # Main landing page
├── hooks/
│   └── useAnalytics.ts      # Analytics tracking
└── index.css                # Global styles & animations
```

## 🎭 Available Icons

The project includes several built-in icons for your link cards:
- `phone` - Phone/calendar icon
- `tech` - Technology/gear icon
- `brain` - AI/brain icon
- `link` - Generic link icon
- And more in `src/utils/iconMapping.ts`

## 🚀 Deployment

### Deploy with Lovable (Easiest)

1. Fork this repo to your GitHub
2. Connect to [Lovable](https://lovable.dev)
3. Click Share → Publish
4. Your site is live!

### Deploy with Vercel/Netlify

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Then connect your GitHub repo to Vercel or Netlify for automatic deployments.

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/WIZNEOAI/wizneo-linktree/issues).

## 💚 Credits

Created by [WIZNEO](https://github.com/WIZNEOAI) - Transforming minds through AI and innovation.

Built with [Lovable](https://lovable.dev) - The AI-powered web development platform.

---

⭐ If you find this project useful, please consider giving it a star!

🔗 Follow WIZNEO:
- [Instagram](https://instagram.com/wizneo.io)
- [YouTube](https://youtube.com/@wiz-neo)
- [Twitter/X](https://x.com/Wizneoio)
- [TikTok](https://tiktok.com/@wizneo.io)
- [GitHub](https://github.com/WIZNEOAI)
