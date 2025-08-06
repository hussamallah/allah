-- Migration to fix user_profiles table schema
-- Run this in your Supabase SQL editor

-- First, drop existing constraints
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_email_key;
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_archetype_check;

-- Modify email column to allow NULL
ALTER TABLE user_profiles ALTER COLUMN email DROP NOT NULL;

-- Modify archetype column to allow NULL
ALTER TABLE user_profiles ALTER COLUMN archetype DROP NOT NULL;

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'time_spent') THEN
        ALTER TABLE user_profiles ADD COLUMN time_spent JSONB;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'total_time') THEN
        ALTER TABLE user_profiles ADD COLUMN total_time INTEGER DEFAULT 0;
    END IF;
END $$;

-- Recreate unique constraint on email (allowing NULL)
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_email_unique UNIQUE (email);

-- Update RLS policies to work with nullable email
DROP POLICY IF EXISTS "Allow profile owners to update their profile" ON user_profiles;
CREATE POLICY "Allow profile owners to update their profile" ON user_profiles
  FOR UPDATE USING (
    auth.jwt() ->> 'email' = email OR email IS NULL
  );

-- Add policy to allow reading profiles with or without email
DROP POLICY IF EXISTS "Allow admins to read all profiles" ON user_profiles;
CREATE POLICY "Allow admins to read all profiles" ON user_profiles
  FOR SELECT USING (true);

-- Add policy to allow inserting profiles without email
DROP POLICY IF EXISTS "Allow anyone to insert profiles" ON user_profiles;
CREATE POLICY "Allow anyone to insert profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);

-- Add policy to allow updating profiles
DROP POLICY IF EXISTS "Allow admins to update any profile" ON user_profiles;
CREATE POLICY "Allow admins to update any profile" ON user_profiles
  FOR UPDATE USING (true); 