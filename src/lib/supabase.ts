import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://fultjhdhqmmuzrtkopyp.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1bHRqaGRocW1tdXpydGtvcHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMzMwNzAsImV4cCI6MjA2NTcwOTA3MH0.fphhyybfNdO2hLupdAMHnmkQ2jqk4kHd-vRxZPwToww'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Product {
  id: string
  title: string
  price: number
  actualPrice: number
  image: string
  img1?: string
  img2?: string
  img3?: string
  img4?: string
  category: string
  gender: 'men' | 'women'
  type: string
  discount?: number
  created_at?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  created_at?: string
}