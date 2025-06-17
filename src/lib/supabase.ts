import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'your-supabase-url'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

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