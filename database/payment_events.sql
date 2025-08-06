-- Create payment_events table
CREATE TABLE IF NOT EXISTS payment_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('payment_page_view', 'payment_attempt', 'payment_success', 'payment_failed', 'payment_abandoned')),
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  archetype TEXT,
  payment_method TEXT,
  failure_reason TEXT,
  utm_data JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_payment_user_id ON payment_events(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_event_type ON payment_events(event_type);
CREATE INDEX IF NOT EXISTS idx_payment_archetype ON payment_events(archetype);
CREATE INDEX IF NOT EXISTS idx_payment_created_at ON payment_events(created_at);

-- Create view for payment funnel analysis
CREATE OR REPLACE VIEW payment_funnel_analysis AS
SELECT 
  archetype,
  COUNT(*) FILTER (WHERE event_type = 'payment_page_view') as page_views,
  COUNT(*) FILTER (WHERE event_type = 'payment_attempt') as attempts,
  COUNT(*) FILTER (WHERE event_type = 'payment_success') as successes,
  COUNT(*) FILTER (WHERE event_type = 'payment_failed') as failures,
  ROUND((COUNT(*) FILTER (WHERE event_type = 'payment_attempt') * 100.0 / COUNT(*) FILTER (WHERE event_type = 'payment_page_view')), 2) as view_to_attempt_rate,
  ROUND((COUNT(*) FILTER (WHERE event_type = 'payment_success') * 100.0 / COUNT(*) FILTER (WHERE event_type = 'payment_attempt')), 2) as attempt_to_success_rate,
  AVG(amount) FILTER (WHERE event_type = 'payment_success') as avg_order_value
FROM payment_events 
GROUP BY archetype
ORDER BY page_views DESC;

-- Create a function to calculate payment funnel metrics
CREATE OR REPLACE FUNCTION get_payment_funnel_metrics(
  p_archetype TEXT DEFAULT NULL,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  event_type TEXT,
  total_events INTEGER,
  conversion_rate NUMERIC,
  total_revenue DECIMAL(10,2),
  avg_order_value DECIMAL(10,2),
  failure_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH event_counts AS (
    SELECT 
      event_type,
      COUNT(*) as event_count,
      SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) as revenue,
      AVG(CASE WHEN amount > 0 THEN amount ELSE NULL END) as avg_amount
    FROM payment_events
    WHERE created_at >= NOW() - INTERVAL '1 day' * p_days
      AND (p_archetype IS NULL OR archetype = p_archetype)
    GROUP BY event_type
  ),
  funnel_sequence AS (
    SELECT 
      event_type,
      event_count,
      revenue,
      avg_amount,
      ROW_NUMBER() OVER (ORDER BY 
        CASE event_type 
          WHEN 'payment_page_view' THEN 1
          WHEN 'payment_attempt' THEN 2
          WHEN 'payment_success' THEN 3
          WHEN 'payment_failed' THEN 4
          ELSE 5
        END
      ) as step_order
    FROM event_counts
  ),
  step_sequence AS (
    SELECT 
      event_type,
      event_count,
      revenue,
      avg_amount,
      step_order,
      LAG(event_count) OVER (ORDER BY step_order) as previous_count
    FROM funnel_sequence
  )
  SELECT 
    ss.event_type,
    ss.event_count as total_events,
    CASE 
      WHEN ss.previous_count IS NULL THEN 100.0
      WHEN ss.previous_count = 0 THEN 0.0
      ELSE ROUND((ss.event_count * 100.0 / ss.previous_count), 2)
    END as conversion_rate,
    COALESCE(ss.revenue, 0) as total_revenue,
    COALESCE(ss.avg_amount, 0) as avg_order_value,
    CASE 
      WHEN ss.event_type = 'payment_failed' AND ss.previous_count > 0 THEN
        ROUND((ss.event_count * 100.0 / ss.previous_count), 2)
      ELSE 0.0
    END as failure_rate
  FROM step_sequence ss
  ORDER BY ss.step_order;
END;
$$ LANGUAGE plpgsql;

-- Create a function to calculate revenue metrics by archetype
CREATE OR REPLACE FUNCTION get_revenue_metrics_by_archetype(
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  archetype TEXT,
  total_revenue DECIMAL(10,2),
  total_orders INTEGER,
  avg_order_value DECIMAL(10,2),
  conversion_rate NUMERIC,
  ltv_estimate DECIMAL(10,2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pe.archetype,
    SUM(pe.amount) as total_revenue,
    COUNT(*) as total_orders,
    AVG(pe.amount) as avg_order_value,
    ROUND(
      (COUNT(*) * 100.0 / (
        SELECT COUNT(DISTINCT user_id) 
        FROM payment_events 
        WHERE event_type = 'payment_page_view'
          AND created_at >= NOW() - INTERVAL '1 day' * p_days
      )), 2
    ) as conversion_rate,
    AVG(pe.amount) * 3 as ltv_estimate -- Simple LTV estimate (3x AOV)
  FROM payment_events pe
  WHERE pe.event_type = 'payment_success'
    AND pe.created_at >= NOW() - INTERVAL '1 day' * p_days
    AND pe.archetype IS NOT NULL
  GROUP BY pe.archetype
  ORDER BY total_revenue DESC;
END;
$$ LANGUAGE plpgsql; 