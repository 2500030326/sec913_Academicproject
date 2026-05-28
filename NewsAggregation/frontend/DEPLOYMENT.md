# Deployment Guide - NewsSphere AI

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] API endpoints configured
- [ ] Images optimized
- [ ] Performance tested
- [ ] Mobile responsive tested
- [ ] Browser compatibility verified

## Environment Setup

### 1. Create Production Environment File
```bash
cp .env.example .env.production.local
```

### 2. Configure Production Values
```
REACT_APP_API_BASE_URL=https://api.newssphereai.com
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_DEBUG_MODE=false
```

## Building for Production

### Local Build
```bash
npm run build
```

Output: `build/` directory with optimized files

### Build Analysis
```bash
npm install -g serve
serve -s build
# Test the production build locally
```

## Deployment Options

### Option 1: Vercel (Recommended)

**Advantages**: Zero-config deployment, serverless functions, edge functions

**Steps:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Configuration** - Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "REACT_APP_API_BASE_URL": "@api_base_url",
    "REACT_APP_DEBUG_MODE": "false"
  }
}
```

### Option 2: Netlify

**Advantages**: Continuous deployment, form handling, edge functions

**Steps:**
```bash
# Connect GitHub repository through Netlify UI
# Or use Netlify CLI:
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**Configuration** - Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[env]
  REACT_APP_API_BASE_URL = "https://api.newssphereai.com"
```

### Option 3: Docker

**Advantages**: Containerized, reproducible, flexible hosting

**Dockerfile**:
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000

ENV REACT_APP_API_BASE_URL=https://api.newssphereai.com
CMD ["serve", "-s", "build", "-l", "3000"]
```

**Build and Run**:
```bash
# Build image
docker build -t newssphereai .

# Run container
docker run -p 3000:3000 newssphereai

# Push to registry
docker tag newssphereai your-registry/newssphereai:latest
docker push your-registry/newssphereai:latest
```

### Option 4: AWS S3 + CloudFront

**Steps:**
1. Create S3 bucket for hosting
2. Enable static website hosting
3. Upload build files:
```bash
aws s3 sync build/ s3://your-bucket-name --delete
```

4. Create CloudFront distribution pointing to S3

### Option 5: Traditional Server (VPS)

**Using Nginx**:
```nginx
server {
    listen 80;
    server_name newssphereai.com www.newssphereai.com;

    root /var/www/newssphereai/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Install & Configure**:
```bash
# SSH into server
ssh user@your-server.com

# Clone repository
git clone <repo-url>
cd frontend

# Install & build
npm install
npm run build

# Configure Nginx
sudo cp nginx.conf /etc/nginx/sites-available/newssphereai
sudo ln -s /etc/nginx/sites-available/newssphereai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate

### Using Let's Encrypt
```bash
# On server
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d newssphereai.com -d www.newssphereai.com
```

### Certificate Auto-Renewal
```bash
# Verify auto-renewal
sudo certbot renew --dry-run
```

## Performance Optimization

### Enable Gzip Compression
**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### HTTP/2
**Nginx**:
```nginx
listen 443 ssl http2;
```

### Caching Headers
```nginx
# Cache HTML (short)
location ~* \.html$ {
    expires 1h;
}

# Cache assets (long)
location ~* \.(js|css|png|jpg)$ {
    expires 1y;
}
```

## Analytics & Monitoring

### Performance Monitoring
```javascript
// In App.jsx
if (process.env.REACT_APP_ENABLE_ANALYTICS === 'true') {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log)
    getFID(console.log)
    getFCP(console.log)
    getLCP(console.log)
    getTTFB(console.log)
  })
}
```

### Error Tracking
```javascript
// Integrate Sentry
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

### Analytics
```javascript
// Google Analytics
import ReactGA from "react-ga4"

ReactGA.initialize(process.env.REACT_APP_GA_ID)
```

## Database Setup

### PostgreSQL
```bash
# Create database
createdb newssphereai

# Initialize schema
psql newssphereai < schema.sql
```

### MongoDB
```bash
# Connection string
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/newssphereai
```

## API Deployment

### Backend Service (Spring Boot)
```bash
# Build JAR
mvn clean package

# Deploy to server
scp target/newssphereai-api.jar user@server:/opt/app/

# Run with systemd
sudo systemctl start newssphereai-api
```

## Backup & Recovery

### Database Backups
```bash
# PostgreSQL
pg_dump newssphereai > backup.sql

# Restore
psql newssphereai < backup.sql
```

### File Backups
```bash
# AWS S3 backup
aws s3 sync /var/www/newssphereai s3://backup-bucket/
```

## Continuous Integration/Deployment

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v2
        with:
          name: build
          path: build/
      - run: |
          # Deploy to server
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Monitoring & Maintenance

### Health Checks
```bash
# Check service status
curl https://newssphereai.com/api/health

# Monitor logs
tail -f /var/log/nginx/access.log
```

### Regular Maintenance
- Check for security updates
- Monitor disk space
- Review error logs
- Update dependencies
- Test disaster recovery

## Troubleshooting Deployment

### Issue: Blank page
- Check build directory
- Verify routing configuration
- Check browser console for errors
- Verify API base URL

### Issue: Slow performance
- Enable gzip compression
- Optimize images
- Configure caching headers
- Use CDN for static assets
- Check database performance

### Issue: API connection errors
- Verify API URL in environment
- Check CORS headers
- Verify API server is running
- Check firewall rules
- Review network tab in DevTools

## Rollback Procedure

### Vercel
```bash
vercel rollback
```

### Manual
```bash
# Restore previous build
aws s3 sync s3://backup-bucket/build/ ./build/
```

## Post-Deployment

- [ ] Test all pages and features
- [ ] Check performance metrics
- [ ] Verify SSL certificate
- [ ] Monitor error tracking
- [ ] Test API endpoints
- [ ] Load test application
- [ ] Verify analytics tracking
- [ ] Set up monitoring alerts

## Support & Scaling

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Deploy multiple instances
- Use database replication
- Implement caching layer (Redis)

### Vertical Scaling
- Increase server resources
- Optimize code and queries
- Implement pagination
- Use CDN for static assets

---

**Last Updated**: 2024
**Version**: 1.0.0
