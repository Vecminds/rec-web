-- Add country and phone columns to talent_submissions
ALTER TABLE talent_submissions
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS phone text;

-- Add country and phone columns to company_submissions
ALTER TABLE company_submissions
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS phone text;
