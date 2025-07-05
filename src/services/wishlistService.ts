import { supabase } from '../lib/supabase'
import { Product } from '../types'

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  products_data?: Product
}

export const wishlistService = {
  // Get wishlist items for user with product details
  async getWishlistItems(userId: string): Promise<WishlistItem[]> {
    // First get the wishlist items
    const { data: wishlistItems, error: wishlistError } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId);
    
    if (wishlistError) throw wishlistError;
    if (!wishlistItems?.length) return [];

    // Get all product IDs
    const productIds = wishlistItems.map(item => item.product_id);

    // Fetch all products in one query
    const { data: products, error: productsError } = await supabase
      .from('products_data')
      .select('*')
      .in('id', productIds);
    
    if (productsError) throw productsError;

    // Combine the data
    return wishlistItems.map(item => ({
      ...item,
      products_data: products?.find(p => p.id === item.product_id)
    }));
  },

  // Add item to wishlist
  async addToWishlist(userId: string, productId: string) {
    // First check if product exists
    // Fetch the complete product data
    const { data: product, error: productError } = await supabase
      .from('products_data')
      .select('*')
      .eq('id', productId)
      .single();
    
    if (productError || !product) {
      throw new Error('Product not found');
    }
    
    // Ensure we have all required Product fields
    const completeProduct: Product = {
      id: product.id,
      title: product.title || 'Unknown Product',
      price: product.price || 0,
      actualPrice: product.actualPrice || product.price || 0,
      image: product.image || '',
      category: product.category || 'other',
      type: product.type || 'other',
      gender: product.gender || 'unisex',
      ...product // Spread the rest of the product properties
    };

    // Check if item already exists in wishlist
    const { data: existingItem } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();
    
    if (existingItem) {
      throw new Error('Item already in wishlist');
    }

    const { data, error } = await supabase
      .from('wishlist_items')
      .insert([{ 
        user_id: userId, 
        product_id: productId,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    // Return the wishlist item with complete product data
    const wishlistItem: WishlistItem = {
      ...data,
      products_data: completeProduct
    };
    return wishlistItem;
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
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },

  // Clear wishlist
  async clearWishlist(userId: string) {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
  }
}