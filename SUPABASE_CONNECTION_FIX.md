# 🔧 Fix: "Failed to save profile" Error

## 🚨 Problem Identified

The error **"Failed to save profile. Please try again."** is occurring because your Supabase API key is **invalid**. This means:

- Your Supabase project may have been deleted
- The API key has been regenerated
- The project URL is incorrect

## 🛠️ Solution: Fix Your Supabase Connection

### Step 1: Create a New Supabase Project

1. Go to [Supabase Dashboard](https://database.new)
2. Click "New Project"
3. Choose your organization
4. Enter a project name (e.g., "hussamallah-archetypes")
5. Enter a database password (save this!)
6. Choose a region close to you
7. Click "Create new project"
8. Wait for the project to be set up (2-3 minutes)

### Step 2: Get Your New Credentials

1. In your new Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

### Step 3: Update Your Environment Variables

1. Open your `.env.local` file in the project root
2. Replace the existing values with your new credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-new-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-new-anon-key-here
```

### Step 4: Set Up the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste this SQL script:

```sql
-- Complete Database Setup for Hussamallah Archetype App
-- Run this in your Supabase SQL Editor

-- Step 1: Create the user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  archetype VARCHAR(100) NOT NULL,
  test_results JSONB,
  time_spent JSONB DEFAULT '{}',
  total_time INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_archetype ON user_profiles(archetype);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at DESC);

-- Step 3: Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anyone to insert profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow profile owners to update their profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow anyone to read profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow anyone to delete profiles" ON user_profiles;

-- Step 5: Create policies for the application
-- Allow anyone to insert profiles (for email collection)
CREATE POLICY "Allow anyone to insert profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);

-- Allow profile owners to update their own profile
CREATE POLICY "Allow profile owners to update their profile" ON user_profiles
  FOR UPDATE USING (true);

-- Allow reading profiles (for admin/war room)
CREATE POLICY "Allow anyone to read profiles" ON user_profiles
  FOR SELECT USING (true);

-- Allow deleting profiles (for admin/war room)
CREATE POLICY "Allow anyone to delete profiles" ON user_profiles
  FOR DELETE USING (true);
```

3. Click "Run" to execute the script

### Step 5: Test Your Connection

1. Run the diagnostic script to verify everything is working:

```bash
node scripts/fix-supabase-connection.js
```

2. You should see: **"🎉 All tests passed! Your Supabase connection is working correctly."**

### Step 6: Restart Your Development Server

1. Stop your development server (Ctrl+C)
2. Run `npm run dev` again
3. Test the save functionality

## ✅ Expected Result

After following these steps, you should be able to:
- Save profile data without errors
- See success messages instead of "Failed to save profile"
- Have your data stored in the Supabase database

## 🔍 Troubleshooting

### If you still get errors:

1. **Check the diagnostic script output** - it will tell you exactly what's wrong
2. **Verify your .env.local file** - make sure the values are correct
3. **Restart your server** - environment variables require a restart
4. **Check browser console** - look for additional error messages

### Common Issues:

- **"Invalid API key"** - Your credentials are wrong, follow Step 2-3
- **"Table does not exist"** - Follow Step 4 to create the table
- **"Permission denied"** - The SQL script in Step 4 should fix this
- **Network errors** - Check your internet connection

## 📞 Need Help?

If you continue to have issues:

1. Run the diagnostic script: `node scripts/fix-supabase-connection.js`
2. Check the output for specific error messages
3. Follow the instructions provided by the script
4. Contact support with the specific error message

## 🔗 Useful Links

- [Supabase Dashboard](https://database.new)
- [API Settings](https://supabase.com/dashboard/project/_?showConnect=true)
- [SQL Editor](https://supabase.com/dashboard/project/_/sql)
- [Setup Guide](SETUP_ENVIRONMENT_VARIABLES.md) 