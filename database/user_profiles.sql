-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  archetype VARCHAR(100),
  test_results JSONB,
  user_id VARCHAR(255),
  time_spent JSONB,
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

-- Create policy to allow admins to read all profiles
CREATE POLICY "Allow admins to read all profiles" ON user_profiles
  FOR SELECT USING (
    auth.jwt() ->> 'email' IN ('admin@example.com', 'hussam@example.com')
  );

-- Create policy to allow anyone to insert profiles (for email collection)
CREATE POLICY "Allow anyone to insert profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);

-- Create policy to allow profile owners to update their own profile
CREATE POLICY "Allow profile owners to update their profile" ON user_profiles
  FOR UPDATE USING (
    auth.jwt() ->> 'email' = email
  );

-- Create policy to allow admins to update any profile
CREATE POLICY "Allow admins to update any profile" ON user_profiles
  FOR UPDATE USING (
    auth.jwt() ->> 'email' IN ('admin@example.com', 'hussam@example.com')
  ); 