-- Fix Delete Policy for War Room
-- Run this in your Supabase SQL Editor

-- Step 1: Enable RLS if not already enabled
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow anyone to insert profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow profile owners to update their profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow anyone to read profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow anyone to delete profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow admins to read all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow admins to update any profile" ON user_profiles;

-- Step 3: Create new policies that allow all operations
CREATE POLICY "Allow anyone to insert profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow profile owners to update their profile" ON user_profiles
  FOR UPDATE USING (true);

CREATE POLICY "Allow anyone to read profiles" ON user_profiles
  FOR SELECT USING (true);

-- This is the key policy for delete functionality
CREATE POLICY "Allow anyone to delete profiles" ON user_profiles
  FOR DELETE USING (true);

-- Step 4: Verify the policies were created
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
WHERE tablename = 'user_profiles'
ORDER BY cmd, policyname;

-- Step 5: Test the delete functionality
-- (This will show you if there are any profiles to test with)
SELECT COUNT(*) as total_profiles FROM user_profiles; 