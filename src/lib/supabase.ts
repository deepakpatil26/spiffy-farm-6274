import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL ||
  'https://butgdlroubygbwncfvht.supabase.co';
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dGdkbHJvdWJ5Z2J3bmNmdmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzA5MjcsImV4cCI6MjA4NjkwNjkyN30.SeRmpP2N6jPV5-mkqe-_UQ5ocfTK3uHFfYMm2_DXQWk';

// Configure the auth options to persist the session in local storage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
});

// Database types
export interface Product {
  id: string;
  title: string;
  price: number;
  actualPrice: number;
  image: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  category: string;
  gender: 'men' | 'women';
  type: string;
  discount?: number;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  created_at?: string;
}
