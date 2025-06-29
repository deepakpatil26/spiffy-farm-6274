import { supabase } from '../lib/supabase'

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: {
    id: string
    title: string
    price: number
    image: string
    category: string
    gender: string
  }
}

export const wishlistService = {
  // Get wishlist items for user
  async getWishlistItems(userId: string) {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data || []
  },

  // Add item to wishlist
  async addToWishlist(userId: string, productId: string) {
    // Check if item already exists in wishlist
    const { data: existingItem } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()
    
    if (existingItem) {
      throw new Error('Item already in wishlist')
    }

    const { data, error } = await supabase
      .from('wishlist_items')
      .insert([{ user_id: userId, product_id: productId }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Remove item from wishlist
  async removeFromWishlist(userId: string, productId: string) {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
    
    if (error) throw error
  },

  // Check if item is in wishlist
  async isInWishlist(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return !!data
  },

  // Clear wishlist
  async clearWishlist(userId: string) {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
    
    if (error) throw error
  }
}