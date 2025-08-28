-- Ground Zero — Elastic Archetype Engine Database Migration 2.1
-- Comprehensive database updates for new engine features

-- =============== MIGRATION VERSION TRACKING ===============
CREATE TABLE IF NOT EXISTS migration_versions (
  id SERIAL PRIMARY KEY,
  version VARCHAR(50) NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT,
  checksum VARCHAR(64)
);

-- Insert current migration
INSERT INTO migration_versions (version, description) 
VALUES ('2.1.0', 'Elastic Archetype Engine - Enhanced Results & Telemetry');

-- =============== ENHANCED QUIZ RESULTS TABLE ===============
-- Add new fields to existing quiz_results table (if it exists)
DO $$ 
BEGIN
  -- Check if quiz_results table exists
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'quiz_results') THEN
    -- Add new Elastic Engine fields
    ALTER TABLE quiz_results 
    ADD COLUMN IF NOT EXISTS r_index DECIMAL(5,2),
    ADD COLUMN IF NOT EXISTS delivery_version VARCHAR(2) CHECK (delivery_version IN ('V1', 'V2')),
    ADD COLUMN IF NOT EXISTS flips INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS dual_result BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS final_margin_pct DECIMAL(5,2),
    ADD COLUMN IF NOT EXISTS stability_state VARCHAR(20) CHECK (stability_state IN ('stable', 'volatile')),
    ADD COLUMN IF NOT EXISTS a1_history JSONB,
    ADD COLUMN IF NOT EXISTS margin_history JSONB,
    ADD COLUMN IF NOT EXISTS top3_history JSONB,
    ADD COLUMN IF NOT EXISTS engine_version VARCHAR(20) DEFAULT '2.1.0';
    
    -- Add indexes for new fields
    CREATE INDEX IF NOT EXISTS idx_quiz_results_r_index ON quiz_results(r_index);
    CREATE INDEX IF NOT EXISTS idx_quiz_results_delivery_version ON quiz_results(delivery_version);
    CREATE INDEX IF NOT EXISTS idx_quiz_results_flips ON quiz_results(flips);
    CREATE INDEX IF NOT EXISTS idx_quiz_results_dual_result ON quiz_results(dual_result);
    CREATE INDEX IF NOT EXISTS idx_quiz_results_engine_version ON quiz_results(engine_version);
    
    RAISE NOTICE 'Enhanced existing quiz_results table with Elastic Engine fields';
  ELSE
    -- Create new quiz_results table if it doesn't exist
    CREATE TABLE quiz_results (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255),
      final_archetype VARCHAR(50) NOT NULL,
      alt_archetype VARCHAR(50),
      triggers JSONB,
      trigger_counts JSONB,
      r_index DECIMAL(5,2),
      delivery_version VARCHAR(2) CHECK (delivery_version IN ('V1', 'V2')),
      flips INTEGER DEFAULT 0,
      dual_result BOOLEAN DEFAULT FALSE,
      final_margin_pct DECIMAL(5,2),
      stability_state VARCHAR(20) CHECK (stability_state IN ('stable', 'volatile')),
      a1_history JSONB,
      margin_history JSONB,
      top3_history JSONB,
      engine_version VARCHAR(20) DEFAULT '2.1.0',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Add indexes
    CREATE INDEX idx_quiz_results_user_id ON quiz_results(user_id);
    CREATE INDEX idx_quiz_results_final_archetype ON quiz_results(final_archetype);
    CREATE INDEX idx_quiz_results_r_index ON quiz_results(r_index);
    CREATE INDEX idx_quiz_results_delivery_version ON quiz_results(delivery_version);
    CREATE INDEX idx_quiz_results_flips ON quiz_results(flips);
    CREATE INDEX idx_quiz_results_dual_result ON quiz_results(dual_result);
    CREATE INDEX idx_quiz_results_engine_version ON quiz_results(engine_version);
    CREATE INDEX idx_quiz_results_created_at ON quiz_results(created_at);
    
    RAISE NOTICE 'Created new quiz_results table with Elastic Engine fields';
  END IF;
END $$;

-- =============== ENHANCED BEHAVIORAL TELEMETRY TABLE ===============
CREATE TABLE IF NOT EXISTS behavioral_telemetry (
  id SERIAL PRIMARY KEY,
  quiz_result_id INTEGER REFERENCES quiz_results(id) ON DELETE CASCADE,
  question_index INTEGER NOT NULL,
  question_phase VARCHAR(1) CHECK (question_phase IN ('A', 'B')),
  question_id VARCHAR(50),
  selected_option_id VARCHAR(50),
  latency_ms INTEGER NOT NULL,
  switches INTEGER DEFAULT 0,
  hover_refs INTEGER DEFAULT 0,
  under_clock_hit BOOLEAN DEFAULT FALSE,
  clean_strike BOOLEAN GENERATED ALWAYS AS (
    latency_ms <= 2000 AND switches = 0
  ) STORED,
  hesitation BOOLEAN GENERATED ALWAYS AS (
    latency_ms >= 6000 OR switches >= 2
  ) STORED,
  behavior_score DECIMAL(3,2),
  normalized_latency_zscore DECIMAL(5,2),
  normalized_switches_zscore DECIMAL(5,2),
  normalized_hover_zscore DECIMAL(5,2),
  normalized_underclock_zscore DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for telemetry
CREATE INDEX idx_behavioral_telemetry_quiz_result_id ON behavioral_telemetry(quiz_result_id);
CREATE INDEX idx_behavioral_telemetry_question_index ON behavioral_telemetry(question_index);
CREATE INDEX idx_behavioral_telemetry_clean_strike ON behavioral_telemetry(clean_strike);
CREATE INDEX idx_behavioral_telemetry_hesitation ON behavioral_telemetry(hesitation);
CREATE INDEX idx_behavioral_telemetry_behavior_score ON behavioral_telemetry(behavior_score);

-- =============== ENGINE AUDIT LOGS TABLE ===============
CREATE TABLE IF NOT EXISTS engine_audit_logs (
  id SERIAL PRIMARY KEY,
  test_run_id VARCHAR(100) UNIQUE NOT NULL,
  seed BIGINT NOT NULL,
  simulation_config JSONB,
  a1_history JSONB,
  margins JSONB,
  top3_history JSONB,
  flips INTEGER,
  final_result JSONB,
  behavior_samples JSONB,
  normalized_behaviors JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for audit logs
CREATE INDEX idx_engine_audit_logs_test_run_id ON engine_audit_logs(test_run_id);
CREATE INDEX idx_engine_audit_logs_seed ON engine_audit_logs(seed);
CREATE INDEX idx_engine_audit_logs_created_at ON engine_audit_logs(created_at);

-- =============== FLIP DETECTION LOGS TABLE ===============
CREATE TABLE IF NOT EXISTS flip_detection_logs (
  id SERIAL PRIMARY KEY,
  quiz_result_id INTEGER REFERENCES quiz_results(id) ON DELETE CASCADE,
  question_index INTEGER NOT NULL,
  question_phase VARCHAR(1) CHECK (question_phase IN ('A', 'B')),
  a1_before VARCHAR(50),
  a2_before VARCHAR(50),
  a3_before VARCHAR(50),
  margin_before DECIMAL(5,2),
  a1_after VARCHAR(50),
  a2_after VARCHAR(50),
  a3_after VARCHAR(50),
  margin_after DECIMAL(5,2),
  flip_triggered BOOLEAN DEFAULT FALSE,
  flip_reason VARCHAR(100),
  gate_1_triggered BOOLEAN DEFAULT FALSE,
  gate_2_triggered BOOLEAN DEFAULT FALSE,
  consecutive_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for flip detection
CREATE INDEX idx_flip_detection_quiz_result_id ON flip_detection_logs(quiz_result_id);
CREATE INDEX idx_flip_detection_question_index ON flip_detection_logs(question_index);
CREATE INDEX idx_flip_detection_flip_triggered ON flip_detection_logs(flip_triggered);

-- =============== STABILITY STATE TRANSITIONS TABLE ===============
CREATE TABLE IF NOT EXISTS stability_transitions (
  id SERIAL PRIMARY KEY,
  quiz_result_id INTEGER REFERENCES quiz_results(id) ON DELETE CASCADE,
  question_index INTEGER NOT NULL,
  previous_state VARCHAR(20),
  current_state VARCHAR(20),
  margin_pct DECIMAL(5,2),
  consecutive_stable_count INTEGER DEFAULT 0,
  transition_reason VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for stability transitions
CREATE INDEX idx_stability_transitions_quiz_result_id ON stability_transitions(quiz_result_id);
CREATE INDEX idx_stability_transitions_question_index ON stability_transitions(question_index);
CREATE INDEX idx_stability_transitions_current_state ON stability_transitions(current_state);

-- =============== LATE OVERRIDE EVENTS TABLE ===============
CREATE TABLE IF NOT EXISTS late_override_events (
  id SERIAL PRIMARY KEY,
  quiz_result_id INTEGER REFERENCES quiz_results(id) ON DELETE CASCADE,
  question_index INTEGER NOT NULL,
  override_active BOOLEAN DEFAULT FALSE,
  multiplier_applied DECIMAL(3,2) DEFAULT 1.0,
  a1_score_before DECIMAL(8,2),
  a1_score_after DECIMAL(8,2),
  override_reason VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for late override events
CREATE INDEX idx_late_override_quiz_result_id ON late_override_events(quiz_result_id);
CREATE INDEX idx_late_override_question_index ON late_override_events(question_index);
CREATE INDEX idx_late_override_override_active ON late_override_events(override_active);

-- =============== TRIGGER ANALYSIS TABLE ===============
CREATE TABLE IF NOT EXISTS trigger_analysis (
  id SERIAL PRIMARY KEY,
  quiz_result_id INTEGER REFERENCES quiz_results(id) ON DELETE CASCADE,
  trigger_name VARCHAR(50) NOT NULL,
  selection_count INTEGER DEFAULT 0,
  valid_trigger BOOLEAN GENERATED ALWAYS AS (
    selection_count >= 3
  ) STORED,
  r_weight_sum INTEGER DEFAULT 0,
  average_r_weight DECIMAL(3,2),
  pure_a1_selections INTEGER DEFAULT 0,
  mixed_selections INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for trigger analysis
CREATE INDEX idx_trigger_analysis_quiz_result_id ON trigger_analysis(quiz_result_id);
CREATE INDEX idx_trigger_analysis_trigger_name ON trigger_analysis(trigger_name);
CREATE INDEX idx_trigger_analysis_valid_trigger ON trigger_analysis(valid_trigger);

-- =============== MIGRATION FUNCTIONS ===============

-- Function to migrate existing quiz data to new format
CREATE OR REPLACE FUNCTION migrate_existing_quiz_data()
RETURNS INTEGER AS $$
DECLARE
  migrated_count INTEGER := 0;
  result RECORD;
BEGIN
  -- Check if there are existing results to migrate
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'quiz_results') THEN
    -- Update existing records with default values for new fields
    UPDATE quiz_results 
    SET 
      r_index = COALESCE(r_index, 50.0),
      delivery_version = COALESCE(delivery_version, 'V1'),
      flips = COALESCE(flips, 0),
      dual_result = COALESCE(dual_result, FALSE),
      engine_version = '2.1.0',
      updated_at = NOW()
    WHERE engine_version IS NULL OR engine_version != '2.1.0';
    
    GET DIAGNOSTICS migrated_count = ROW_COUNT;
    
    RAISE NOTICE 'Migrated % existing quiz results to Elastic Engine format', migrated_count;
  END IF;
  
  RETURN migrated_count;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate R-Index from behavioral data
CREATE OR REPLACE FUNCTION calculate_r_index_from_telemetry(
  p_quiz_result_id INTEGER
)
RETURNS DECIMAL(5,2) AS $$
DECLARE
  choice_score DECIMAL(5,2);
  behavior_score DECIMAL(5,2);
  underclock_score DECIMAL(5,2);
  final_r_index DECIMAL(5,2);
BEGIN
  -- Calculate choice score (60% weight)
  SELECT COALESCE(AVG(behavior_score), 0) * 0.60
  INTO choice_score
  FROM behavioral_telemetry
  WHERE quiz_result_id = p_quiz_result_id;
  
  -- Calculate behavior score (25% weight)
  SELECT 
    CASE 
      WHEN AVG(CASE WHEN clean_strike THEN 1.0 ELSE 0.0 END) > 0.7 THEN 0.25
      WHEN AVG(CASE WHEN hesitation THEN 0.0 ELSE 1.0 END) > 0.7 THEN 0.25
      ELSE 0.15
    END
  INTO behavior_score
  FROM behavioral_telemetry
  WHERE quiz_result_id = p_quiz_result_id;
  
  -- Calculate under-clock score (15% weight)
  SELECT 
    CASE 
      WHEN AVG(CASE WHEN under_clock_hit THEN 1.0 ELSE 0.0 END) > 0.5 THEN 0.15
      ELSE 0.10
    END
  INTO underclock_score
  FROM behavioral_telemetry
  WHERE quiz_result_id = p_quiz_result_id;
  
  -- Calculate final R-Index (0-100 scale)
  final_r_index = (choice_score + behavior_score + underclock_score) * 100;
  
  -- Ensure bounds
  final_r_index = GREATEST(0, LEAST(100, final_r_index));
  
  RETURN final_r_index;
END;
$$ LANGUAGE plpgsql;

-- Function to determine delivery version based on R-Index
CREATE OR REPLACE FUNCTION determine_delivery_version(p_r_index DECIMAL(5,2))
RETURNS VARCHAR(2) AS $$
BEGIN
  RETURN CASE 
    WHEN p_r_index < 50 THEN 'V1'
    ELSE 'V2'
  END;
END;
$$ LANGUAGE plpgsql;

-- =============== VIEWS FOR ANALYSIS ===============

-- View for comprehensive quiz results with telemetry
CREATE OR REPLACE VIEW enhanced_quiz_results AS
SELECT 
  qr.*,
  bt.total_questions,
  bt.avg_latency_ms,
  bt.total_switches,
  bt.total_hover_refs,
  bt.under_clock_hits,
  bt.clean_strikes,
  bt.hesitations,
  ta.valid_triggers_count,
  ta.total_r_weight
FROM quiz_results qr
LEFT JOIN (
  SELECT 
    quiz_result_id,
    COUNT(*) as total_questions,
    AVG(latency_ms) as avg_latency_ms,
    SUM(switches) as total_switches,
    SUM(hover_refs) as total_hover_refs,
    SUM(CASE WHEN under_clock_hit THEN 1 ELSE 0 END) as under_clock_hits,
    SUM(CASE WHEN clean_strike THEN 1 ELSE 0 END) as clean_strikes,
    SUM(CASE WHEN hesitation THEN 1 ELSE 0 END) as hesitations
  FROM behavioral_telemetry
  GROUP BY quiz_result_id
) bt ON qr.id = bt.quiz_result_id
LEFT JOIN (
  SELECT 
    quiz_result_id,
    COUNT(CASE WHEN valid_trigger THEN 1 END) as valid_triggers_count,
    SUM(r_weight_sum) as total_r_weight
  FROM trigger_analysis
  GROUP BY quiz_result_id
) ta ON qr.id = ta.quiz_result_id;

-- View for flip detection analysis
CREATE OR REPLACE VIEW flip_analysis AS
SELECT 
  fdl.*,
  qr.final_archetype,
  qr.r_index,
  qr.delivery_version
FROM flip_detection_logs fdl
JOIN quiz_results qr ON fdl.quiz_result_id = qr.id
WHERE fdl.flip_triggered = TRUE
ORDER BY fdl.created_at DESC;

-- View for stability state analysis
CREATE OR REPLACE VIEW stability_analysis AS
SELECT 
  st.*,
  qr.final_archetype,
  qr.r_index,
  qr.delivery_version
FROM stability_transitions st
JOIN quiz_results qr ON st.quiz_result_id = qr.id
ORDER BY st.created_at DESC;

-- =============== PERFORMANCE OPTIMIZATION ===============

-- Create materialized view for frequently accessed statistics
CREATE MATERIALIZED VIEW quiz_engine_statistics AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_results,
  AVG(r_index) as avg_r_index,
  AVG(flips) as avg_flips,
  COUNT(CASE WHEN dual_result THEN 1 END) as dual_results,
  COUNT(CASE WHEN delivery_version = 'V1' THEN 1 END) as v1_deliveries,
  COUNT(CASE WHEN delivery_version = 'V2' THEN 1 END) as v2_deliveries,
  COUNT(CASE WHEN stability_state = 'stable' THEN 1 END) as stable_results,
  COUNT(CASE WHEN stability_state = 'volatile' THEN 1 END) as volatile_results
FROM quiz_results
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Create index on materialized view
CREATE UNIQUE INDEX idx_quiz_engine_statistics_date ON quiz_engine_statistics(date);

-- =============== CLEANUP AND MAINTENANCE ===============

-- Function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_quiz_engine_views()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW quiz_engine_statistics;
  RAISE NOTICE 'Refreshed quiz engine materialized views';
END;
$$ LANGUAGE plpgsql;

-- Function to clean old audit logs (keep last 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM engine_audit_logs 
  WHERE created_at < NOW() - INTERVAL '30 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RAISE NOTICE 'Cleaned up % old audit log entries', deleted_count;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- =============== FINAL MIGRATION STEPS ===============

-- Run migration functions
SELECT migrate_existing_quiz_data();

-- Create initial statistics
SELECT refresh_quiz_engine_views();

-- Set up automated cleanup (if using pg_cron extension)
-- SELECT cron.schedule('cleanup-audit-logs', '0 2 * * *', 'SELECT cleanup_old_audit_logs();');

-- =============== MIGRATION COMPLETE ===============
RAISE NOTICE 'Elastic Archetype Engine Database Migration 2.1.0 Complete!';
RAISE NOTICE 'New tables created: behavioral_telemetry, engine_audit_logs, flip_detection_logs, stability_transitions, late_override_events, trigger_analysis';
RAISE NOTICE 'Enhanced quiz_results table with R-Index, delivery version, flips, dual results, and audit data';
RAISE NOTICE 'Views created: enhanced_quiz_results, flip_analysis, stability_analysis';
RAISE NOTICE 'Materialized view created: quiz_engine_statistics';
RAISE NOTICE 'Functions created: migrate_existing_quiz_data, calculate_r_index_from_telemetry, determine_delivery_version';
