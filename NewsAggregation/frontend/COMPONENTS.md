# Component & Feature Documentation

## 📦 Core Components

### ParticleBackground.jsx
**Purpose**: Animated particle background effect visible on all pages

**Features**:
- Floating particles with random movement
- Connected particles with lines
- Responsive to window resize
- GPU-accelerated canvas rendering
- Auto-adjusts particle count based on screen size

**Usage**:
```jsx
<ParticleBackground />
```

**Props**: None (self-contained)

### Navbar.jsx
**Purpose**: Fixed navigation bar with search and user menu

**Features**:
- Logo with gradient glow
- Search bar with enter key support
- Dark mode toggle
- Notifications bell
- User profile icon
- Admin button
- Responsive hamburger menu

**Props**:
- `darkMode` (boolean) - Current dark mode state
- `onDarkModeToggle` (function) - Toggle dark mode
- `onMenuToggle` (function) - Toggle sidebar
- `isMobile` (boolean) - Mobile detection

**Usage**:
```jsx
<Navbar 
  darkMode={darkMode}
  onDarkModeToggle={toggleDarkMode}
  onMenuToggle={toggleSidebar}
  isMobile={isMobile}
/>
```

### Sidebar.jsx
**Purpose**: Side information panel with trending, sources, and weather

**Features**:
- Trending topics with search counts
- Top news sources with color coding
- Weather widget with temperature
- Popular tags
- Sticky positioning
- Hidden on mobile

**Props**:
- `isOpen` (boolean) - Sidebar visibility

**Usage**:
```jsx
<Sidebar isOpen={sidebarOpen} />
```

### NewsCard.jsx
**Purpose**: Reusable article card component

**Features**:
- Article image with hover zoom
- Category badge
- Breaking news indicator
- Source credibility score
- Published date and read time
- Sentiment analysis badge
- Like, share, bookmark buttons
- Hover lift animation
- Click to navigate to article

**Props**:
- `article` (object) - Article data
  - `id`, `title`, `description`, `image`, `source`, `date`, `readTime`, `category`, `credibility`, `sentiment`, `breaking`
- `index` (number) - Animation stagger index

**Usage**:
```jsx
<NewsCard article={article} index={0} />
```

### HeroSection.jsx
**Purpose**: Large featured article section on homepage

**Features**:
- Full-width hero image with overlay
- Featured headline typography
- Description text
- Read More button with glow
- Source information
- Staggered animations

**Usage**:
```jsx
<HeroSection />
```

**Props**: None (uses mock data)

### BreakingNewsTicker.jsx
**Purpose**: Animated ticker for breaking news

**Features**:
- Auto-rotating news items every 6 seconds
- Smooth transitions between items
- Alert icon animation
- Progress indicators
- Gradient background

**Usage**:
```jsx
<BreakingNewsTicker />
```

**Props**: None (uses mock data)

### TrendingSlider.jsx
**Purpose**: Auto-sliding carousel for trending articles

**Features**:
- Auto-slide every 7 seconds
- Manual navigation arrows
- Indicator dots
- Spring physics animations
- Direction-aware slide transitions

**Props**:
- `articles` (array) - Articles to display

**Usage**:
```jsx
<TrendingSlider articles={articles} />
```

## 📄 Page Components

### Homepage.jsx
**Purpose**: Main landing page

**Components Used**:
- BreakingNewsTicker
- HeroSection
- TrendingSlider
- NewsCard (grid)

**Features**:
- Breaking news ticker
- Hero section
- Trending slider
- Featured articles grid
- Load more button
- Staggered animations

### ArticlePage.jsx
**Purpose**: Individual article reading page

**Features**:
- Large hero image
- Article header with metadata
- AI-powered summary box
- Rich article content
- Scroll progress bar
- Like, bookmark, share actions
- Related articles carousel
- Author information
- Publication details

**Props**:
- `id` (from URL params) - Article ID

### SearchPage.jsx
**Purpose**: AI-powered search interface

**Features**:
- Glowing search input
- Voice search icon
- Semantic visualization with animated nodes
- Example searches
- Trending keywords
- Search results display
- Real-time search animation

**Visualization**:
- Interactive node graph
- Animated connections
- Color-coded nodes
- Pulse animations

### UserDashboard.jsx
**Purpose**: Personalized user dashboard

**Features**:
- Welcome message
- Reading statistics (streak, saved, hours, total)
- Tabbed interface (Recommended, Saved, History)
- Followed topics management
- Notification preferences
- Reading goal tracker with progress bar
- Personalized recommendations

**Sidebar Elements**:
- Followed topics with tags
- Notification preferences
- Reading goal progress

### AdminDashboard.jsx
**Purpose**: Administrative dashboard with analytics

**Features**:
- Key performance indicators
- Traffic analytics chart (users & articles)
- Category performance chart
- Recent articles management
- Moderation queue
- Content status tracking
- Priority-based review system

**Charts Used**:
- LineChart (traffic)
- BarChart (category performance)

## 🎨 Styling System

### Tailwind CSS Utilities

**Custom Colors**:
```
dark: { 900: "#050816", 800: "#0B1026", 700: "#1a1a2e" }
neon: { cyan: "#00d4ff", purple: "#b833ff", pink: "#ff006e", blue: "#0066ff" }
```

**Custom Animations**:
```
glow - Neon glowing effect
float - Floating motion
pulse-glow - Pulsing glow
slide-in - Slide entrance
fade-in - Fade entrance
shimmer - Shimmer loading effect
typing - Typing animation
```

**Utility Classes**:
```
glass-morphism - Glassmorphism effect
glass-morphism-lg - Large glassmorphism
neon-cyan-glow - Cyan glow shadow
neon-purple-glow - Purple glow shadow
neon-pink-glow - Pink glow shadow
gradient-text - Purple-blue-cyan gradient
btn-glow - Glowing button
btn-gradient - Gradient button
card-hover - Card hover animation
card-hover-lift - Lift on hover
```

### CSS Files

**globals.css**:
- Import Tailwind directives
- Glassmorphism definitions
- Neon glow effects
- Button styles
- Card hover effects
- Scrollbar styling
- Skeleton loading
- Selection colors
- Animations

**App.css**:
- App-level styles
- Additional utilities
- Responsive adjustments

## 🎬 Animation Library: Framer Motion

### Common Patterns

**Fade In**:
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Slide & Fade**:
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  Content
</motion.div>
```

**Hover Effects**:
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

**Staggered Children**:
```javascript
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => <Item key={item} />)}
</motion.div>
```

## 🛠 Utility Functions

### helpers.js

**formatDate(date)**
- Converts date to relative format ("2h ago")

**formatReadTime(wordCount)**
- Calculates reading time based on word count

**formatViews(views)**
- Formats view count (1M, 2.5K, etc.)

**truncateText(text, maxLength)**
- Truncates text with ellipsis

**generateId()**
- Generates random unique ID

**shareArticle(title, url, platform)**
- Opens social share dialog
- Platforms: twitter, facebook, linkedin, whatsapp

**getSentimentColor(sentiment)**
- Returns color for sentiment badge
- positive: cyan, negative: pink, neutral: purple

**getCategoryColor(category)**
- Returns color for category badge

### api.js

**apiService**
- get(endpoint)
- post(endpoint, data)
- put(endpoint, data)
- delete(endpoint)

**articlesAPI**
- getAll()
- getById(id)
- search(query)
- getTrending()
- getRecommendations(userId)

**searchAPI**
- semantic(query)
- trending()
- suggestions(query)

**userAPI**
- getProfile(userId)
- updateProfile(userId, data)
- getSavedArticles(userId)
- saveArticle(userId, articleId)

**analyticsAPI**
- getTraffic()
- getCategoryStats()
- getUserStats()
- getArticleStats(articleId)

## 📊 Mock Data Structure

### Article Object
```javascript
{
  id: number,
  title: string,
  description: string,
  image: string (URL),
  sourceLogo: string (URL),
  source: string,
  date: string,
  readTime: string,
  category: string,
  credibility: number (0-100),
  sentiment: string ('Positive'|'Negative'|'Neutral'),
  breaking: boolean
}
```

### User Stats
```javascript
{
  icon: React.Component,
  label: string,
  value: string,
  change: string,
  color: string (hex)
}
```

### Category Stats
```javascript
{
  category: string,
  count: number,
  growth: number
}
```

## 🔄 Data Flow Examples

### Reading an Article
1. User browses homepage
2. Clicks on NewsCard
3. Navigate to `/article/{id}`
4. ArticlePage fetches/displays article
5. User can interact (like, bookmark, share)

### Searching Articles
1. User enters query in search bar
2. Navbar navigates to SearchPage
3. SearchPage displays semantic visualization
4. User clicks search or selects example
5. Results displayed as NewsCard grid

### User Dashboard
1. User clicks profile icon
2. Navigate to `/dashboard`
3. Dashboard loads user data
4. User can switch tabs
5. Manage preferences and view history

## 🎯 Component Reusability

### NewsCard Usage Across Pages
- Homepage: Featured articles grid
- ArticlePage: Related articles
- SearchPage: Search results
- UserDashboard: Recommended/Saved/History

### Particles Background
- Applied globally in App.jsx
- Visible on all pages
- Auto-adjusts to screen size

### Sidebar
- Reused across desktop pages
- Sticky positioning
- Responsive (hidden on mobile)

## 🔌 Integration Points

### To Add Real API Data
Replace mock data in components:
```javascript
useEffect(() => {
  fetch('/api/articles')
    .then(r => r.json())
    .then(data => setArticles(data))
}, [])
```

### To Add Authentication
Wrap routes with ProtectedRoute component:
```javascript
<Route 
  path="/dashboard" 
  element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} 
/>
```

### To Add Database
Update API service endpoints:
```javascript
const API_BASE_URL = 'https://api.newssphereai.com'
```

---

**Last Updated**: 2024
**Component Count**: 13 components
**Page Count**: 5 pages
**Utility Functions**: 15+
