-- SQL Script to set up the 'bookings' table in Supabase
-- Run this in your Supabase project's SQL Editor

-- 1. Create the bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    specialist TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME WITHOUT TIME ZONE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policy: Allow anyone (public clients) to submit a new booking
CREATE POLICY "Allow public inserts" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- 4. RLS Policy: Allow authenticated users (Admins) to view all bookings
CREATE POLICY "Allow authenticated admins to read" 
ON public.bookings 
FOR SELECT 
TO authenticated 
USING (true);

-- 5. RLS Policy: Allow authenticated users (Admins) to update booking status
CREATE POLICY "Allow authenticated admins to update" 
ON public.bookings 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 6. RLS Policy: Allow authenticated users (Admins) to delete a booking
CREATE POLICY "Allow authenticated admins to delete" 
ON public.bookings 
FOR DELETE 
TO authenticated 
USING (true);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
