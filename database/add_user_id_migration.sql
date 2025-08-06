-- Migration: Add user_id column to user_profiles table
-- This script can be run safely multiple times (idempotent)

-- Check if user_id column exists, if not add it
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

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND column_name = 'user_id'; 