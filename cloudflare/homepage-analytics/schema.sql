CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visited_at TEXT NOT NULL,
  page TEXT NOT NULL,
  title TEXT,
  referrer TEXT,
  source TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  timezone TEXT,
  colo TEXT,
  visitor_label TEXT,
  language TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_visits_visited_at ON visits (visited_at);
CREATE INDEX IF NOT EXISTS idx_visits_source ON visits (source);
CREATE INDEX IF NOT EXISTS idx_visits_city ON visits (city);
