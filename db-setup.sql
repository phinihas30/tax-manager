-- Create tax_records table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.tax_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  tax_type TEXT NOT NULL CHECK (tax_type IN ('Direct', 'Indirect')),
  tax_name TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date_of_payment DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Paid')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES auth.users (id)
    ON DELETE CASCADE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_tax_records_user_id ON tax_records (user_id);
CREATE INDEX IF NOT EXISTS idx_tax_records_tax_type ON tax_records (tax_type);
CREATE INDEX IF NOT EXISTS idx_tax_records_status ON tax_records (status);

-- Set up Row Level Security (RLS) policies
ALTER TABLE public.tax_records ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own records
CREATE POLICY select_own_records ON public.tax_records FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to only insert their own records
CREATE POLICY insert_own_records ON public.tax_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to only update their own records
CREATE POLICY update_own_records ON public.tax_records FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to only delete their own records
CREATE POLICY delete_own_records ON public.tax_records FOR DELETE
  USING (auth.uid() = user_id); 