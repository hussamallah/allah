-- Create revenue events table
CREATE TABLE IF NOT EXISTS revenue_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  archetype TEXT,
  transaction_type TEXT NOT NULL,
  product_id TEXT,
  cohort_date DATE NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_revenue_events_user_id ON revenue_events(user_id);
CREATE INDEX IF NOT EXISTS idx_revenue_events_archetype ON revenue_events(archetype);
CREATE INDEX IF NOT EXISTS idx_revenue_events_transaction_type ON revenue_events(transaction_type);
CREATE INDEX IF NOT EXISTS idx_revenue_events_cohort_date ON revenue_events(cohort_date);
CREATE INDEX IF NOT EXISTS idx_revenue_events_created_at ON revenue_events(created_at);
CREATE INDEX IF NOT EXISTS idx_revenue_events_amount ON revenue_events(amount);

-- Create a function to calculate LTV by archetype
CREATE OR REPLACE FUNCTION get_ltv_by_archetype(
  p_days INTEGER DEFAULT 90
)
RETURNS TABLE (
  archetype TEXT,
  total_users INTEGER,
  total_revenue DECIMAL(10,2),
  avg_ltv DECIMAL(10,2),
  median_ltv DECIMAL(10,2),
  max_ltv DECIMAL(10,2),
  revenue_per_user DECIMAL(10,2)
) AS $$
BEGIN
  RETURN QUERY
  WITH user_revenue AS (
    SELECT 
      archetype,
      user_id,
      SUM(amount) as total_user_revenue
    FROM revenue_events
    WHERE created_at >= NOW() - INTERVAL '1 day' * p_days
      AND transaction_type = 'purchase'
      AND archetype IS NOT NULL
    GROUP BY archetype, user_id
  ),
  archetype_stats AS (
    SELECT 
      archetype,
      COUNT(*) as total_users,
      SUM(total_user_revenue) as total_revenue,
      AVG(total_user_revenue) as avg_ltv,
      PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_user_revenue) as median_ltv,
      MAX(total_user_revenue) as max_ltv
    FROM user_revenue
    GROUP BY archetype
  )
  SELECT 
    archetype,
    total_users,
    total_revenue,
    avg_ltv,
    median_ltv,
    max_ltv,
    CASE 
      WHEN total_users > 0 THEN total_revenue / total_users
      ELSE 0
    END as revenue_per_user
  FROM archetype_stats
  ORDER BY avg_ltv DESC;
END;
$$ LANGUAGE plpgsql;

-- Create a function to calculate cohort analysis
CREATE OR REPLACE FUNCTION get_cohort_analysis(
  p_days INTEGER DEFAULT 90
)
RETURNS TABLE (
  cohort_date DATE,
  total_users INTEGER,
  day_0_revenue DECIMAL(10,2),
  day_7_revenue DECIMAL(10,2),
  day_30_revenue DECIMAL(10,2),
  day_90_revenue DECIMAL(10,2),
  retention_rate_7 NUMERIC,
  retention_rate_30 NUMERIC,
  retention_rate_90 NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH cohort_users AS (
    SELECT 
      cohort_date,
      user_id,
      MIN(created_at) as first_purchase_date
    FROM revenue_events
    WHERE created_at >= NOW() - INTERVAL '1 day' * p_days
      AND transaction_type = 'purchase'
    GROUP BY cohort_date, user_id
  ),
  cohort_revenue AS (
    SELECT 
      cu.cohort_date,
      cu.user_id,
      cu.first_purchase_date,
      SUM(CASE 
        WHEN re.created_at::date = cu.first_purchase_date::date THEN re.amount
        ELSE 0
      END) as day_0_revenue,
      SUM(CASE 
        WHEN re.created_at::date BETWEEN cu.first_purchase_date::date 
          AND (cu.first_purchase_date::date + INTERVAL '7 days') THEN re.amount
        ELSE 0
      END) as day_7_revenue,
      SUM(CASE 
        WHEN re.created_at::date BETWEEN cu.first_purchase_date::date 
          AND (cu.first_purchase_date::date + INTERVAL '30 days') THEN re.amount
        ELSE 0
      END) as day_30_revenue,
      SUM(CASE 
        WHEN re.created_at::date BETWEEN cu.first_purchase_date::date 
          AND (cu.first_purchase_date::date + INTERVAL '90 days') THEN re.amount
        ELSE 0
      END) as day_90_revenue
    FROM cohort_users cu
    LEFT JOIN revenue_events re ON cu.user_id = re.user_id
    GROUP BY cu.cohort_date, cu.user_id, cu.first_purchase_date
  ),
  cohort_retention AS (
    SELECT 
      cohort_date,
      COUNT(*) as total_users,
      COUNT(CASE WHEN day_7_revenue > 0 THEN 1 END) as retained_7,
      COUNT(CASE WHEN day_30_revenue > 0 THEN 1 END) as retained_30,
      COUNT(CASE WHEN day_90_revenue > 0 THEN 1 END) as retained_90,
      SUM(day_0_revenue) as day_0_revenue,
      SUM(day_7_revenue) as day_7_revenue,
      SUM(day_30_revenue) as day_30_revenue,
      SUM(day_90_revenue) as day_90_revenue
    FROM cohort_revenue
    GROUP BY cohort_date
  )
  SELECT 
    cohort_date,
    total_users,
    day_0_revenue,
    day_7_revenue,
    day_30_revenue,
    day_90_revenue,
    CASE 
      WHEN total_users > 0 THEN ROUND((retained_7 * 100.0 / total_users), 2)
      ELSE 0
    END as retention_rate_7,
    CASE 
      WHEN total_users > 0 THEN ROUND((retained_30 * 100.0 / total_users), 2)
      ELSE 0
    END as retention_rate_30,
    CASE 
      WHEN total_users > 0 THEN ROUND((retained_90 * 100.0 / total_users), 2)
      ELSE 0
    END as retention_rate_90
  FROM cohort_retention
  ORDER BY cohort_date DESC;
END;
$$ LANGUAGE plpgsql; 