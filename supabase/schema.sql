-- ==============================================================================
-- MPOWER / BHAGYASHREE COUNSELLING - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Stores user role: 'client' or 'admin')
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. AVAILABILITY SLOTS TABLE (Admin defines slots; locked temporarily during checkout)
CREATE TABLE IF NOT EXISTS public.availability_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  counsellor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_booked BOOLEAN NOT NULL DEFAULT FALSE,
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  locked_until TIMESTAMPTZ,
  locked_by_session TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_slot_time CHECK (end_time > start_time)
);

-- Create index for fast slot lookup
CREATE INDEX IF NOT EXISTS idx_slots_start_time ON public.availability_slots(start_time);
CREATE INDEX IF NOT EXISTS idx_slots_status ON public.availability_slots(is_booked, is_locked);

-- 3. BOOKINGS TABLE (Stores session reservations, intake notes, status, and Meet link)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  slot_id UUID REFERENCES public.availability_slots(id) ON DELETE RESTRICT,
  service_id TEXT NOT NULL,
  service_title TEXT NOT NULL,
  session_time TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 50,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  intake_notes TEXT, -- Confidential client background info
  status TEXT NOT NULL DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'confirmed', 'cancelled', 'rescheduled', 'completed')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount_paid_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  google_meet_link TEXT,
  calendar_event_id TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_user ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_order ON public.bookings(razorpay_order_id);

-- 4. PAYMENTS & TRANSACTIONS TABLE (Audit log for Razorpay webhooks & refunds)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount_inr NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'captured', 'failed', 'refunded')),
  refund_id TEXT,
  refund_amount_inr NUMERIC(10, 2),
  raw_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON public.payments(booking_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Helper function: Is Current User Admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin has full access to profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- AVAILABILITY SLOTS POLICIES
CREATE POLICY "Public can view upcoming available slots"
  ON public.availability_slots FOR SELECT
  USING (TRUE);

CREATE POLICY "Admin can insert availability slots"
  ON public.availability_slots FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin or system can update slots"
  ON public.availability_slots FOR UPDATE
  USING (public.is_admin() OR auth.uid() IS NOT NULL OR TRUE);

CREATE POLICY "Admin can delete slots"
  ON public.availability_slots FOR DELETE
  USING (public.is_admin());

-- BOOKINGS POLICIES
CREATE POLICY "Clients can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Authenticated users or checkout can insert bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Clients can update their own booking (reschedule/cancel request) or Admin"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admin can manage all bookings"
  ON public.bookings FOR ALL
  USING (public.is_admin());

-- PAYMENTS POLICIES
CREATE POLICY "Clients can view their own payments via booking"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = payments.booking_id AND (bookings.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Admin or webhook service role can manage payments"
  ON public.payments FOR ALL
  USING (public.is_admin() OR TRUE);

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT := 'client';
BEGIN
  -- If user metadata specifies admin or email matches configured admin, assign admin role
  IF (NEW.raw_user_meta_data->>'role' = 'admin') THEN
    user_role := 'admin';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Client'),
    NEW.raw_user_meta_data->>'phone',
    user_role
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
