# Quick Start Guide - NewsSphere AI

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Open Browser
Navigate to `http://localhost:3000`

## 🎯 Key Features to Explore

### Homepage
- See the hero section, trending slider, and breaking news ticker
- Hover over news cards for interactive effects
- Click "Load More" to see infinite scrolling

### AI Search
- Go to Search page (click search bar in navbar)
- See the semantic visualization with animated nodes
- Try example searches or trending keywords
- View search results with filtering

### User Dashboard
- Click user icon in navbar
- View personalized recommendations
- Check reading statistics and goals
- Manage saved articles and topics

### Admin Dashboard
- Click "Admin" button in navbar
- View traffic analytics and charts
- Manage articles and moderation queue
- Check real-time statistics

### Interactive Elements
- **Hover Effects**: Cards lift and glow on hover
- **Animations**: Smooth page transitions and element animations
- **Particles**: Dynamic background particle effects
- **Glowing Buttons**: Neon-effect interactive buttons
- **Breaking News**: Auto-rotating news ticker

## 📦 Project Files

Key files and their purposes:

```
App.jsx              - Main app component with routing
Navbar.jsx          - Navigation bar with search
Sidebar.jsx         - Trending topics and info sidebar
NewsCard.jsx        - Reusable article card component
HeroSection.jsx     - Homepage hero section
BreakingNewsTicker.jsx - Animated breaking news ticker
TrendingSlider.jsx  - Auto-sliding articles carousel
Homepage.jsx        - Main landing page
ArticlePage.jsx     - Individual article reading
SearchPage.jsx      - AI semantic search page
UserDashboard.jsx   - Personalized user dashboard
AdminDashboard.jsx  - Admin analytics dashboard
ParticleBackground.jsx - Animated background particles
```

## 🎨 Customizing Styles

### Using Tailwind Classes
The app uses Tailwind CSS extensively. All styling is done with utility classes:
- `glass-morphism` - Glassmorphism effect
- `neon-cyan-glow` - Cyan neon glow
- `gradient-text` - Purple-to-blue gradient text
- `btn-gradient` - Gradient button styling

### Colors in tailwind.config.js
```javascript
colors: {
  dark: { 900: "#050816", 800: "#0B1026" },
  neon: {
    cyan: "#00d4ff",
    purple: "#b833ff",
    pink: "#ff006e",
    blue: "#0066ff"
  }
}
```

## 🚀 Common Customizations

### Change Primary Color
Update in `tailwind.config.js`:
```javascript
neon: {
  cyan: "#YOUR_COLOR",
}
```

### Add New Page
1. Create file in `src/pages/YourPage.jsx`
2. Add route in `App.jsx`
3. Add navigation link in `Navbar.jsx`

### Modify Animation Duration
Edit `tailwind.config.js` keyframes:
```javascript
keyframes: {
  glow: {
    '0%, 100%': { boxShadow: '0 0 20px rgba(...)' },
    '50%': { boxShadow: '0 0 40px rgba(...)' }
  }
}
```

## 🔗 API Integration

To connect real data:

1. **Fetch Articles**
```javascript
useEffect(() => {
  fetch('/api/articles')
    .then(r => r.json())
    .then(data => setArticles(data))
}, [])
```

2. **Search Implementation**
```javascript
const handleSearch = async () => {
  const response = await fetch(`/api/search?q=${searchQuery}`)
  const results = await response.json()
  setResults(results)
}
```

3. **User Dashboard**
```javascript
useEffect(() => {
  fetch('/api/user/recommendations')
    .then(r => r.json())
    .then(data => setRecommendedArticles(data))
}, [])
```

## 📊 Using Mock Data

Mock data is defined in each component. Example:
```javascript
const [articles] = useState([
  {
    id: 1,
    title: 'Article Title',
    description: 'Description',
    image: 'image-url',
    // ... more fields
  },
  // ... more articles
])
```

## 🎬 Framer Motion Usage

Examples of animations:

```javascript
// Fade in animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Hover effect
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// Staggered children
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => <Item key={item} />)}
</motion.div>
```

## 🔧 Troubleshooting

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm start
```

### Tailwind styles not appearing
```bash
# Rebuild tailwind
npm run build
```

### Animations not smooth
- Check browser hardware acceleration is enabled
- Reduce number of particles in ParticleBackground
- Check animation frame rate

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com)

## 🎉 Next Steps

1. Integrate with real backend API
2. Add user authentication
3. Implement database connectivity
4. Add more features and pages
5. Deploy to production
6. Monitor analytics

Enjoy building! 🚀
