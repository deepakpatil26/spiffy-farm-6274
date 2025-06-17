import { supabase } from '../lib/supabase'
import { Product } from '../lib/supabase'

export interface ProductFilters {
  category?: string[]
  page?: number
  limit?: number
  sortBy?: 'price'
  sortOrder?: 'asc' | 'desc'
}

export const productService = {
  // Get men's products
  async getMenProducts(filters: ProductFilters = {}) {
    const { category, page = 1, limit = 12, sortBy, sortOrder } = filters
    
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('gender', 'men')
    
    if (category && category.length > 0) {
      query = query.in('category', category)
    }
    
    if (sortBy && sortOrder) {
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })
    }
    
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    query = query.range(from, to)
    
    const { data, error, count } = await query
    
    if (error) throw error
    
    return { data: data || [], total: count || 0 }
  },

  // Get women's products
  async getWomenProducts(filters: ProductFilters = {}) {
    const { category, page = 1, limit = 12, sortBy, sortOrder } = filters
    
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('gender', 'women')
    
    if (category && category.length > 0) {
      query = query.in('category', category)
    }
    
    if (sortBy && sortOrder) {
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })
    }
    
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    query = query.range(from, to)
    
    const { data, error, count } = await query
    
    if (error) throw error
    
    return { data: data || [], total: count || 0 }
  },

  // Get single product
  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Add product (admin)
  async addProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update product (admin)
  async updateProduct(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete product (admin)
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}