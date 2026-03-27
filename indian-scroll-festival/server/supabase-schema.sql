-- =============================================
-- STEP 1: Create the submissions table
-- =============================================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact TEXT NOT NULL,
  how_heard TEXT,
  submission_title TEXT NOT NULL,
  category TEXT NOT NULL,
  video_url TEXT,
  payment_id TEXT UNIQUE NOT NULL,
  order_id TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 499,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_submissions_payment_id ON submissions(payment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert from backend" ON submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select for duplicate check" ON submissions
  FOR SELECT USING (true);

-- Policy: Allow update for video URL after background upload
CREATE POLICY "Allow update for video url" ON submissions
  FOR UPDATE USING (true) WITH CHECK (true);

-- =============================================
-- STEP 2: Create storage bucket for video uploads
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('submissions', 'submissions', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload files to the submissions bucket
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'submissions');

-- Allow public read access to uploaded files
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'submissions');
