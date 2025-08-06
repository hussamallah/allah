-- Add unique constraint on user_id to prevent duplicate profiles
-- Run this in your Supabase SQL editor

-- Add unique constraint on user_id
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_user_id_unique UNIQUE (user_id); 