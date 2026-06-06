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
DROP POLICY IF EXISTS "Allow public inserts" ON public.bookings;
CREATE POLICY "Allow public inserts" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- 4. RLS Policy: Allow authenticated users (Admins) to view all bookings
DROP POLICY IF EXISTS "Allow authenticated admins to read" ON public.bookings;
CREATE POLICY "Allow authenticated admins to read" 
ON public.bookings 
FOR SELECT 
TO authenticated 
USING (true);

-- 5. RLS Policy: Allow authenticated users (Admins) to update booking status
DROP POLICY IF EXISTS "Allow authenticated admins to update" ON public.bookings;
CREATE POLICY "Allow authenticated admins to update" 
ON public.bookings 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 6. RLS Policy: Allow authenticated users (Admins) to delete a booking
DROP POLICY IF EXISTS "Allow authenticated admins to delete" ON public.bookings;
CREATE POLICY "Allow authenticated admins to delete" 
ON public.bookings 
FOR DELETE 
TO authenticated 
USING (true);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);


-- -------------------------------------------------------------
-- 7. SQL to Create an Admin User in Supabase Auth (Optional Reference)
-- Run this in the Supabase Dashboard SQL Editor to register your first admin.
-- Make sure to change the placeholders for email and password.
-- -------------------------------------------------------------

/*
-- Enable pgcrypto (used for hashing passwords)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Define your credentials and run:
DO $$
DECLARE
  _email TEXT := 'admin@example.com';         -- CHANGE THIS TO YOUR EMAIL
  _password TEXT := 'SecurePassword123';     -- CHANGE THIS TO YOUR PASSWORD
  _user_id UUID := gen_random_uuid();
BEGIN
  -- Check if user already exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = _email) THEN
    RAISE NOTICE 'User with email % already exists.', _email;
  ELSE
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone,
      phone_confirmed_at,
      phone_change,
      phone_change_sent_at,
      confirmed_at,
      email_change,
      email_change_sent_at,
      email_change_token_current,
      email_change_confirm_status,
      banned_until,
      reauthentication_token,
      reauthentication_sent_at,
      is_sso_user,
      deleted_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      _user_id,
      'authenticated',
      'authenticated',
      _email,
      crypt(_password, gen_salt('bf')),
      now(),
      NULL,
      NULL,
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      FALSE,
      now(),
      now(),
      NULL,
      NULL,
      '',
      NULL,
      now(),
      '',
      NULL,
      '',
      0,
      NULL,
      '',
      NULL,
      FALSE,
      NULL
    );

    -- Insert corresponding identity record (required for logins to work)
    INSERT INTO auth.identities (
      id,
      provider_id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      _user_id::text, -- provider_id is the user's uuid as text
      _user_id,
      json_build_object('sub', _user_id, 'email', _email)::jsonb,
      'email',
      now(),
      now(),
      now()
    );

    RAISE NOTICE 'Successfully created admin user % with ID %', _email, _user_id;
  END IF;
END $$;
*/

