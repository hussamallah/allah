# 🚀 Manual Deployment Guide

This project uses **manual deployment** to Vercel. All auto-deployment functions have been removed for simplicity and control.

## 📋 Available Deployment Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run deploy` | Deploy to production | Final deployment |
| `npm run deploy:dev` | Deploy to preview | Testing changes |
| `npm run deploy:watch` | Deploy with file watching | Development |

## 🎯 Quick Start

### 1. **Deploy to Production**
```bash
npm run deploy
```

### 2. **Deploy to Preview (Testing)**
```bash
npm run deploy:dev
```

### 3. **Deploy with File Watching**
```bash
npm run deploy:watch
```

## 🔧 Prerequisites

1. **Vercel CLI installed:**
   ```bash
   npm i -g vercel
   ```

2. **Logged into Vercel:**
   ```bash
   vercel login
   ```

3. **Environment variables configured** in your Vercel dashboard

## 📝 Deployment Process

1. **Make your changes** to the code
2. **Test locally** with `npm run dev`
3. **Deploy manually** with one of the commands above
4. **Check the deployment** in your Vercel dashboard

## 🎉 Benefits of Manual Deployment

- ✅ **Full control** over when deployments happen
- ✅ **No unexpected deployments** from file changes
- ✅ **Cleaner development workflow**
- ✅ **Better debugging** - you know exactly when deployments occur
- ✅ **Reduced complexity** - no auto-deployment scripts to maintain

## 🚨 Troubleshooting

### If deployment fails:
1. Check your environment variables in Vercel dashboard
2. Ensure all dependencies are installed: `npm install`
3. Test build locally: `npm run build`
4. Check Vercel logs for specific errors

### If you need to rollback:
1. Go to your Vercel dashboard
2. Navigate to the project
3. Go to "Deployments" tab
4. Find the previous working deployment
5. Click "Redeploy"

---

**Ready to deploy? Use `npm run deploy` for production or `npm run deploy:dev` for testing!** 🚀 