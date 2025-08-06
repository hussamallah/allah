-- Create enhanced page metrics table
CREATE TABLE IF NOT EXISTS enhanced_page_metrics (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  current_page TEXT NOT NULL,
  time_spent INTEGER DEFAULT 0,
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
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  archetype TEXT,
  page_type TEXT DEFAULT 'other',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_enhanced_metrics_user_id ON enhanced_page_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_enhanced_metrics_page_type ON enhanced_page_metrics(page_type);
CREATE INDEX IF NOT EXISTS idx_enhanced_metrics_archetype ON enhanced_page_metrics(archetype);
CREATE INDEX IF NOT EXISTS idx_enhanced_metrics_created_at ON enhanced_page_metrics(created_at);
CREATE INDEX IF NOT EXISTS idx_enhanced_metrics_device_type ON enhanced_page_metrics(device_type);

-- Create a function to get comprehensive analytics
CREATE OR REPLACE FUNCTION get_enhanced_page_analytics(
  p_page_type TEXT DEFAULT NULL,
  p_archetype TEXT DEFAULT NULL,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  page_type TEXT,
  archetype TEXT,
  total_visitors INTEGER,
  total_page_views INTEGER,
  avg_time_on_page NUMERIC,
  avg_scroll_depth NUMERIC,
  bounce_rate NUMERIC,
  avg_interactions NUMERIC,
  exit_intent_rate NUMERIC,
  device_breakdown JSONB,
  top_pages JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(epm.page_type, 'all') as page_type,
    COALESCE(epm.archetype, 'all') as archetype,
    COUNT(DISTINCT epm.user_id) as total_visitors,
    COUNT(*) as total_page_views,
    ROUND(AVG(epm.time_spent), 2) as avg_time_on_page,
    ROUND(AVG(epm.scroll_depth), 2) as avg_scroll_depth,
    ROUND((COUNT(CASE WHEN epm.bounce_rate = true THEN 1 END) * 100.0 / COUNT(*)), 2) as bounce_rate,
    ROUND(AVG(epm.interactions), 2) as avg_interactions,
    ROUND((COUNT(CASE WHEN epm.exit_intent = true THEN 1 END) * 100.0 / COUNT(*)), 2) as exit_intent_rate,
    jsonb_object_agg(
      epm.device_type, 
      COUNT(*) 
    ) as device_breakdown,
    jsonb_object_agg(
      epm.current_page, 
      COUNT(*) 
    ) as top_pages
  FROM enhanced_page_metrics epm
  WHERE epm.created_at >= NOW() - INTERVAL '1 day' * p_days
    AND (p_page_type IS NULL OR epm.page_type = p_page_type)
    AND (p_archetype IS NULL OR epm.archetype = p_archetype)
  GROUP BY epm.page_type, epm.archetype
  ORDER BY total_visitors DESC;
END;
$$ LANGUAGE plpgsql; 