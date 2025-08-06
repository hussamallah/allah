-- Migration: Add user_id column to user_profiles table
-- This script can be run safely multiple times (idempotent)
-- Run this in Supabase Dashboard → SQL Editor

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'user_id'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN user_id VARCHAR(255);
        RAISE NOTICE 'Added user_id column to user_profiles table';
    ELSE
        RAISE NOTICE 'user_id column already exists in user_profiles table';
    END IF;
END $$;

-- Add index for better performance on user_id queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Add index for last_activity queries (used in war room)
CREATE INDEX IF NOT EXISTS idx_user_profiles_last_activity ON user_profiles(last_activity DESC);

-- Verify the migration
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND column_name = 'user_id'; 