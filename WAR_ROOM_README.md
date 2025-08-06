# 🔥 War Room - User Analytics Dashboard

## Overview

The War Room is an admin-only dashboard that tracks user behavior, test results, and time spent on different pages throughout their archetype journey. This system provides valuable insights into user engagement and archetype distribution.

## Features

### 🎯 User Tracking
- **Time Tracking**: Automatically tracks time spent on each page
- **Journey Mapping**: Records the user's path through different archetype pages
- **Test Results**: Stores complete archetype analysis and results
- **Email Collection**: Captures user emails for follow-up and analysis

### 📊 Analytics Dashboard
- **User Profiles**: View all user profiles with detailed information
- **Time Analytics**: See how long users spend on each page
- **Archetype Distribution**: Track which archetypes are most popular
- **Filtering & Sorting**: Filter by archetype, sort by date/time/archetype
- **Real-time Stats**: Overview of total users, time spent, and averages

### 🔐 Security
- **Admin-Only Access**: Restricted to authorized admin emails
- **Row Level Security**: Database-level security policies
- **Authentication Required**: Must be logged in to access

## Setup Instructions

### 1. Database Setup

Run the SQL migration to create the required table:

```sql
-- Execute the contents of database/user_profiles.sql in your Supabase SQL editor
```

### 2. Admin Configuration

Update the admin emails in the API route:

```typescript
// In app/api/war-room/profiles/route.ts
const ADMIN_EMAILS = ['your-admin-email@example.com', 'another-admin@example.com']
```

### 3. Environment Variables

Ensure your Supabase environment variables are configured:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How It Works

### 1. User Journey Flow

1. **Landing**: User visits an archetype chamber page
2. **Start Tracking**: User clicks "Begin Your Journey" button
3. **Time Tracking**: System automatically tracks time on each page
4. **Email Collection**: User reaches "Who You Are" page and submits email
5. **Profile Creation**: Complete profile saved with all tracking data

### 2. Time Tracking System

- **Context Provider**: `lib/timeTracking.tsx` manages time tracking state
- **Page Detection**: Automatically detects page changes using Next.js router
- **Persistent Tracking**: Continues tracking across page navigation
- **Data Collection**: Records time spent on each unique page path

### 3. Data Storage

User profiles contain:
- **Email**: User's email address
- **Archetype**: Their discovered archetype
- **Test Results**: Complete archetype analysis
- **Time Spent**: Breakdown of time on each page
- **Total Time**: Sum of all time spent
- **Timestamps**: Creation and last activity times

## API Endpoints

### GET /api/war-room/profiles
- **Purpose**: Fetch all user profiles
- **Access**: Admin only
- **Returns**: Array of user profile objects

### POST /api/war-room/profiles
- **Purpose**: Create or update user profile
- **Access**: Public (for email collection)
- **Body**: `{ email, archetype, testResults, timeSpent }`

## Usage

### Accessing the War Room

1. Navigate to `/war-room` in your browser
2. Log in with an admin email account
3. View the analytics dashboard

### Understanding the Data

- **Total Users**: Number of unique users who completed the journey
- **Total Time Spent**: Cumulative time across all users
- **Archetypes Discovered**: Number of unique archetypes found
- **Average Time Per User**: Mean time spent per user

### Filtering and Sorting

- **Filter by Archetype**: View users of specific archetypes
- **Sort by Date**: See most recent users first
- **Sort by Time**: See users who spent the most time
- **Sort by Archetype**: Group users by archetype

## Security Considerations

### Admin Access
- Only specified admin emails can access the war room
- Database policies enforce admin-only read access
- Authentication required for all admin operations

### Data Privacy
- User emails are collected for analytics purposes
- Time tracking data is anonymized by page path
- No personal information beyond email is stored

### Database Security
- Row Level Security (RLS) enabled
- Policies restrict access based on user role
- Public insert allowed for email collection
- Admin-only read/update operations

## Troubleshooting

### Common Issues

1. **Access Denied Error**
   - Ensure you're logged in with an admin email
   - Check that your email is in the ADMIN_EMAILS array

2. **No Profiles Showing**
   - Verify the database table exists
   - Check that users have completed the journey
   - Ensure email collection is working

3. **Time Tracking Not Working**
   - Verify TimeTrackingProvider is in the layout
   - Check that startTracking() is called
   - Ensure page navigation is working correctly

### Database Issues

1. **Table Not Found**
   - Run the SQL migration in Supabase
   - Check table permissions and policies

2. **RLS Policy Errors**
   - Verify admin emails in policies match your configuration
   - Check authentication is working properly

## Future Enhancements

- **Real-time Updates**: Live dashboard updates
- **Export Functionality**: Download data as CSV/JSON
- **Advanced Analytics**: User behavior patterns
- **A/B Testing**: Track different user flows
- **Integration**: Connect with external analytics tools 