# Environment Variables Setup Guide

## Issue: "Unable to save results" Error

If you're seeing the "unable to save results" popup when trying to save your test results, this is because the Supabase database connection is not configured.

## Solution: Configure Environment Variables

### Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://database.new)
2. Create a new project
3. Wait for the project to be set up

### Step 2: Get Your Project Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

### Step 3: Create Environment File

1. In your project root directory, create a file called `.env.local`
2. Add the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the actual values from Step 2.

### Step 4: Set Up Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Run the following SQL to create the required table:

```sql
-- Create user_profiles table
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

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- Create index on archetype for filtering
CREATE INDEX IF NOT EXISTS idx_user_profiles_archetype ON user_profiles(archetype);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert profiles (for email collection)
CREATE POLICY "Allow anyone to insert profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);

-- Create policy to allow profile owners to update their own profile
CREATE POLICY "Allow profile owners to update their profile" ON user_profiles
  FOR UPDATE USING (true);
```

### Step 5: Restart Your Development Server

1. Stop your development server (Ctrl+C)
2. Run `npm run dev` again

### Step 6: Test the Save Functionality

1. Go through the archetype test
2. Try saving your results
3. The "unable to save results" error should be resolved

## Troubleshooting

### If you still get errors:

1. **Check your .env.local file**: Make sure it's in the root directory and has the correct values
2. **Restart the server**: Environment variables require a server restart
3. **Check Supabase connection**: Verify your project URL and key are correct
4. **Check browser console**: Look for any additional error messages

### Common Issues:

- **"Database not configured"**: Environment variables are missing or incorrect
- **"Failed to save profile"**: Database table doesn't exist or permissions are wrong
- **Network errors**: Check your internet connection and Supabase project status

## For Production Deployment

If deploying to Vercel or another platform:

1. Add the environment variables in your deployment platform's settings
2. Make sure to use the same variable names: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy your application

## Support

If you continue to have issues:

1. Check the browser console for detailed error messages
2. Verify your Supabase project is active and accessible
3. Ensure the database table was created successfully
4. Contact support with the specific error message you're seeing 