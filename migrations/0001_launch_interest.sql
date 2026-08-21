CREATE TABLE launch_interest (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id TEXT NOT NULL,
  email TEXT NOT NULL,
  product TEXT NOT NULL,
  source_path TEXT,
  source_referrer TEXT,
  source_campaign TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_launch_interest_product ON launch_interest (product);
CREATE UNIQUE INDEX idx_launch_interest_email_product ON launch_interest (email, product);
