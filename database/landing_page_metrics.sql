-- Create landing page metrics table
CREATE TABLE IF NOT EXISTS landing_page_metrics (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  archetype TEXT NOT NULL,
  time_on_page INTEGER DEFAULT 0,
  scroll_depth INTEGER DEFAULT 0,
  bounce_rate BOOLEAN DEFAULT true,
  page_views INTEGER DEFAULT 1,
  interactions INTEGER DEFAULT 0,
  exit_intent BOOLEAN DEFAULT false,
  device_type TEXT DEFAULT 'desktop',
  referrer TEXT DEFAULT '',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Composite unique constraint
  UNIQUE(user_id, archetype)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_landing_metrics_archetype ON landing_page_metrics(archetype);
CREATE INDEX IF NOT EXISTS idx_landing_metrics_created_at ON landing_page_metrics(created_at);
CREATE INDEX IF NOT EXISTS idx_landing_metrics_device_type ON landing_page_metrics(device_type);
CREATE INDEX IF NOT EXISTS idx_landing_metrics_utm_source ON landing_page_metrics(utm_source);

-- Create a function to calculate aggregate metrics
CREATE OR REPLACE FUNCTION get_landing_page_analytics(
  p_archetype TEXT DEFAULT NULL,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  archetype TEXT,
  total_visitors INTEGER,
  avg_time_on_page NUMERIC,
  avg_scroll_depth NUMERIC,
  bounce_rate NUMERIC,
  avg_interactions NUMERIC,
  exit_intent_rate NUMERIC,
  device_breakdown JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(lpm.archetype, 'all') as archetype,
    COUNT(DISTINCT lpm.user_id) as total_visitors,
    ROUND(AVG(lpm.time_on_page), 2) as avg_time_on_page,
    ROUND(AVG(lpm.scroll_depth), 2) as avg_scroll_depth,
    ROUND((COUNT(CASE WHEN lpm.bounce_rate = true THEN 1 END) * 100.0 / COUNT(*)), 2) as bounce_rate,
    ROUND(AVG(lpm.interactions), 2) as avg_interactions,
    ROUND((COUNT(CASE WHEN lpm.exit_intent = true THEN 1 END) * 100.0 / COUNT(*)), 2) as exit_intent_rate,
    jsonb_object_agg(
      lpm.device_type, 
      COUNT(*) 
    ) as device_breakdown
  FROM landing_page_metrics lpm
  WHERE lpm.created_at >= NOW() - INTERVAL '1 day' * p_days
    AND (p_archetype IS NULL OR lpm.archetype = p_archetype)
  GROUP BY lpm.archetype
  ORDER BY total_visitors DESC;
END;
$$ LANGUAGE plpgsql; 