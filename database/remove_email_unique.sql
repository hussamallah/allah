-- Remove UNIQUE constraint on email to allow multiple users
-- Run this in your Supabase SQL editor

-- Drop the unique constraint on email
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_email_unique;

-- Verify the constraint is gone
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'user_profiles' AND column_name = 'email'; 