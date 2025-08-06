-- Create post_purchase_events table
CREATE TABLE IF NOT EXISTS post_purchase_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('return_visit', 'feature_usage', 'churn_indicator', 'engagement_drop')),
  archetype TEXT,
  days_since_purchase INTEGER,
  feature_name TEXT,
  usage_duration INTEGER,
  churn_reason TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_post_purchase_user_id ON post_purchase_events(user_id);
CREATE INDEX IF NOT EXISTS idx_post_purchase_event_type ON post_purchase_events(event_type);
CREATE INDEX IF NOT EXISTS idx_post_purchase_archetype ON post_purchase_events(archetype);
CREATE INDEX IF NOT EXISTS idx_post_purchase_created_at ON post_purchase_events(created_at);

-- Create view for return visit analysis
CREATE OR REPLACE VIEW return_visit_analysis AS
SELECT 
  user_id,
  archetype,
  COUNT(*) as return_visits,
  AVG(days_since_purchase) as avg_days_between_visits,
  MIN(days_since_purchase) as first_return_day,
  MAX(days_since_purchase) as last_return_day
FROM post_purchase_events 
WHERE event_type = 'return_visit'
GROUP BY user_id, archetype;

-- Create view for feature usage analysis
CREATE OR REPLACE VIEW feature_usage_analysis AS
SELECT 
  user_id,
  archetype,
  feature_name,
  COUNT(*) as usage_count,
  SUM(usage_duration) as total_usage_duration,
  AVG(usage_duration) as avg_usage_duration
FROM post_purchase_events 
WHERE event_type = 'feature_usage'
GROUP BY user_id, archetype, feature_name;

-- Create view for churn analysis
CREATE OR REPLACE VIEW churn_analysis AS
SELECT 
  user_id,
  archetype,
  churn_reason,
  COUNT(*) as churn_events,
  MIN(created_at) as first_churn_event,
  MAX(created_at) as last_churn_event
FROM post_purchase_events 
WHERE event_type = 'churn_indicator'
GROUP BY user_id, archetype, churn_reason; 