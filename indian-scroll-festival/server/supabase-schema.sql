-- Run this in your Supabase SQL Editor to create the submissions table

CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact TEXT NOT NULL,
  how_heard TEXT,
  submission_title TEXT NOT NULL,
  category TEXT NOT NULL,
  payment_id TEXT UNIQUE NOT NULL,
  order_id TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 499,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for duplicate payment checks
CREATE UNIQUE INDEX IF NOT EXISTS idx_submissions_payment_id ON submissions(payment_id);

-- Index for querying by email
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can insert (backend only)
CREATE POLICY "Service role can insert" ON submissions
  FOR INSERT TO service_role WITH CHECK (true);

-- Policy: Only service role can read
CREATE POLICY "Service role can read" ON submissions
  FOR SELECT TO service_role USING (true);
