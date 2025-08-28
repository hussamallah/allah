# War Room Testing Guide

## Overview
The War Room is a comprehensive analytics dashboard with multiple pages for different types of data analysis. This guide will help you test all the available pages and functionality.

## Accessing the War Room

1. **Login**: Navigate to `/war-room/login` and enter your admin credentials
2. **Main Dashboard**: After login, you'll be redirected to `/war-room`

## Available Pages

### 1. Dashboard (`/war-room`)
- **Purpose**: Main overview with real-time user activity
- **Features**:
  - Active users grid with archetype filtering
  - System statistics (active users, dormant users, completed journeys)
  - Node distribution charts
  - User activity monitor
  - Critical alerts
  - Bulk user management (select, delete)

### 2. Page Timers (`/war-room/page-timers`)
- **Purpose**: Detailed page activity tracking
- **Features**:
  - Real-time page timer data
  - User activity on specific pages
  - Time spent analysis
  - Page navigation patterns

### 3. Landing Analytics (`/war-room/landing-analytics`)
- **Purpose**: Landing page performance metrics
- **Features**:
  - Landing page conversion rates
  - Archetype-specific analytics
  - User engagement metrics
  - Filter by archetype

### 4. Funnel Analytics (`/war-room/funnel-analytics`)
- **Purpose**: User journey funnel analysis
- **Features**:
  - Conversion funnel visualization
  - Drop-off point analysis
  - Journey stage tracking
  - Performance metrics

### 5. Payment Analytics (`/war-room/payment-analytics`)
- **Purpose**: Payment and revenue tracking
- **Features**:
  - Payment conversion rates
  - Revenue metrics
  - Payment method analysis
  - Transaction tracking

### 6. Post-Purchase Analytics (`/war-room/post-purchase-analytics`)
- **Purpose**: Post-purchase behavior analysis
- **Features**:
  - Post-purchase engagement
  - Retention metrics
  - User satisfaction tracking
  - Follow-up behavior

### 7. Revenue Attribution (`/war-room/revenue-attribution`)
- **Purpose**: Revenue source analysis
- **Features**:
  - Attribution modeling
  - Source tracking
  - Campaign performance
  - ROI analysis

### 8. Test Page (`/war-room/test`)
- **Purpose**: API and navigation testing
- **Features**:
  - API endpoint testing
  - Navigation verification
  - Database connection status
  - Quick access to all pages

## Testing Checklist

### ✅ Basic Navigation
- [ ] Can access all pages from navigation bar
- [ ] Active page is highlighted in navigation
- [ ] Mobile navigation works correctly
- [ ] Logout functionality works

### ✅ API Endpoints
- [ ] `/api/war-room/users-real-time` returns data
- [ ] `/api/war-room/page-timers` returns data
- [ ] `/api/war-room/profiles/[id]` DELETE works
- [ ] All analytics endpoints respond

### ✅ Data Display
- [ ] User grid shows real-time data
- [ ] Filters work (archetype, phase)
- [ ] User details modal opens
- [ ] Time tracking displays correctly
- [ ] Statistics update in real-time

### ✅ User Management
- [ ] Can select individual users
- [ ] Can select all users
- [ ] Bulk delete functionality works
- [ ] Individual user deletion works
- [ ] User details show correct information

### ✅ Analytics Pages
- [ ] Landing analytics loads with data
- [ ] Funnel analytics displays charts
- [ ] Payment analytics shows metrics
- [ ] Post-purchase analytics works
- [ ] Revenue attribution displays data

## Common Issues and Solutions

### Issue: Only Page Timers Showing
**Cause**: Navigation not properly set up
**Solution**: 
1. Check that the layout.tsx file has the navigation bar
2. Verify all page routes exist
3. Ensure authentication is working

### Issue: No Data Displaying
**Cause**: API endpoints not working or database connection issues
**Solution**:
1. Check database connection
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors

### Issue: Navigation Not Working
**Cause**: Layout issues or routing problems
**Solution**:
1. Verify Next.js routing is set up correctly
2. Check that all page components exist
3. Ensure layout.tsx is properly configured

## Testing Commands

### Start Development Server
```bash
cd hussamallah
npm run dev
```

### Test API Endpoints
```bash
# Test users endpoint
curl http://localhost:3000/api/war-room/users-real-time

# Test page timers endpoint
curl http://localhost:3000/api/war-room/page-timers
```

### Check Database Connection
```bash
# Run the test script
node test-war-room.js
```

## Environment Variables Required

Make sure these environment variables are set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Troubleshooting

1. **Check Browser Console**: Look for JavaScript errors
2. **Check Network Tab**: Verify API calls are successful
3. **Check Database**: Ensure Supabase connection is working
4. **Check Authentication**: Verify admin login is working

## Quick Test Flow

1. Start the development server
2. Navigate to `/war-room/login`
3. Login with admin credentials
4. Test each navigation button
5. Verify data is loading on each page
6. Test user management features
7. Check mobile responsiveness

This should give you a comprehensive way to test all war room functionality! 