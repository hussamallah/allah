-- Create conversion_events table
CREATE TABLE IF NOT EXISTS conversion_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  step TEXT NOT NULL,
  archetype TEXT,
  page_type TEXT,
  current_page TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversion_user_id ON conversion_events(user_id);
CREATE INDEX IF NOT EXISTS idx_conversion_step ON conversion_events(step);
CREATE INDEX IF NOT EXISTS idx_conversion_archetype ON conversion_events(archetype);
CREATE INDEX IF NOT EXISTS idx_conversion_created_at ON conversion_events(created_at);

-- Create view for conversion funnel analysis
CREATE OR REPLACE VIEW conversion_funnel_analysis AS
SELECT 
  step,
  archetype,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(EXTRACT(EPOCH FROM (created_at - LAG(created_at) OVER (PARTITION BY user_id ORDER BY created_at)))) as avg_time_to_next_step
FROM conversion_events 
GROUP BY step, archetype
ORDER BY step;
```

```sql:hussamallah/database/quiz_events.sql
-- Create quiz_events table
CREATE TABLE IF NOT EXISTS quiz_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('question_view', 'question_answer', 'question_abandon', 'back_button', 'quiz_complete')),
  question_number INTEGER,
  question_id TEXT,
  archetype TEXT,
  time_spent INTEGER,
  answer TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_quiz_user_id ON quiz_events(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_event_type ON quiz_events(event_type);
CREATE INDEX IF NOT EXISTS idx_quiz_question_number ON quiz_events(question_number);
CREATE INDEX IF NOT EXISTS idx_quiz_archetype ON quiz_events(archetype);
CREATE INDEX IF NOT EXISTS idx_quiz_created_at ON quiz_events(created_at);

-- Create view for quiz abandonment analysis
CREATE OR REPLACE VIEW quiz_abandonment_analysis AS
SELECT 
  question_number,
  archetype,
  COUNT(*) FILTER (WHERE event_type = 'question_view') as views,
  COUNT(*) FILTER (WHERE event_type = 'question_answer') as answers,
  COUNT(*) FILTER (WHERE event_type = 'question_abandon') as abandons,
  COUNT(*) FILTER (WHERE event_type = 'back_button') as back_clicks,
  AVG(time_spent) FILTER (WHERE event_type = 'question_answer') as avg_time_to_answer,
  AVG(time_spent) FILTER (WHERE event_type = 'question_abandon') as avg_time_before_abandon
FROM quiz_events 
GROUP BY question_number, archetype
ORDER BY question_number;
```

```
