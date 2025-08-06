-- Create UTM tracking table
CREATE TABLE IF NOT EXISTS utm_tracking (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  gclid TEXT,
  fbclid TEXT,
  landing_page TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_utm_user_id ON utm_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_utm_campaign ON utm_tracking(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_utm_source ON utm_tracking(utm_source);
CREATE INDEX IF NOT EXISTS idx_utm_created_at ON utm_tracking(created_at);

-- Create view for UTM campaign analysis (fixed)
CREATE OR REPLACE VIEW utm_campaign_analysis AS
SELECT 
  utm_campaign,
  utm_source,
  utm_medium,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT session_id) as sessions,
  COUNT(*) as total_visits
FROM utm_tracking 
GROUP BY utm_campaign, utm_source, utm_medium
ORDER BY unique_users DESC;

-- Create separate view for time analysis
CREATE OR REPLACE VIEW utm_time_analysis AS
SELECT 
  user_id,
  utm_campaign,
  utm_source,
  AVG(time_between_visits) as avg_time_between_visits
FROM (
  SELECT 
    user_id,
    utm_campaign,
    utm_source,
    EXTRACT(EPOCH FROM (created_at - LAG(created_at) OVER (PARTITION BY user_id ORDER BY created_at))) as time_between_visits
  FROM utm_tracking
) time_data
WHERE time_between_visits IS NOT NULL
GROUP BY user_id, utm_campaign, utm_source; 