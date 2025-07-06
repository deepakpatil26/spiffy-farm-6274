import { supabase } from '../lib/supabase'
import { Product } from '../lib/supabase'
import { toBackendId, toFrontendId } from '../utils/idMapper'

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
      .from('products_data')
      .select('*', { count: 'exact' })
      .eq('gender', 'men')
      
    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)
    
    if (category && category.length > 0) {
      query = query.in('category', category)
    }
    
    if (sortBy && sortOrder) {
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })
    }
    
    const { data, error, count } = await query
    
    if (error) throw error
    
    return { data: data || [], total: count || 0 }
  },

  // Get women's products
  async getWomenProducts(filters: ProductFilters = {}) {
    const { category, page = 1, limit = 12, sortBy, sortOrder } = filters
    
    let query = supabase
      .from('products_data')
      .select('*', { count: 'exact' })
      .eq('gender', 'women')
      
    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)
    
    if (category && category.length > 0) {
      query = query.in('category', category)
    }
    
    if (sortBy && sortOrder) {
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })
    }
    
    const { data, error, count } = await query
    
    if (error) throw error
    
    return { data: data || [], total: count || 0 }
  },

  // Get single product
  async getProduct(id: string) {
    const backendId = toBackendId(id)
    const { data, error } = await supabase
      .from('products_data')
      .select('*')
      .eq('id', backendId)
      .single()

    if (error) throw error
    
    // Convert the ID back to frontend format
    if (data) {
      return {
        ...data,
        id: toFrontendId(data.id).toString()
      }
    }
    return null
  },

  // Add product (admin)
  async addProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('products_data')
      .insert([product])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update product (admin)
  async updateProduct(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products_data')
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
      .from('products_data')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}