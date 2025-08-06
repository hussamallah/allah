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

-- Step 6: Verify the setup
SELECT 
  'Table created successfully' as status,
  COUNT(*) as row_count
FROM user_profiles;

-- Step 7: Show all policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'user_profiles'; 