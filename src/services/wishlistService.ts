import { supabase } from '../lib/supabase'
import { Product } from '../types'
import { toBackendId, toFrontendId } from '../utils/idMapper'

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
    console.log(`[wishlistService] Getting wishlist items for user: ${userId}`);
    
    // First get the wishlist items
    const { data: wishlistItems, error: wishlistError } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId);
    
    if (wishlistError) {
      console.error('[wishlistService] Error fetching wishlist items:', wishlistError);
      throw wishlistError;
    }
    
    if (!wishlistItems?.length) {
      console.log('[wishlistService] No wishlist items found');
      return [];
    }

    console.log(`[wishlistService] Found ${wishlistItems.length} wishlist items`);

    // Get all product IDs (convert from backend to frontend for product lookup)
    const backendProductIds = wishlistItems.map(item => item.product_id);

    // Fetch all products in one query
    const { data: products, error: productsError } = await supabase
      .from('products_data')
      .select('*')
      .in('id', backendProductIds);
    
    if (productsError) {
      console.error('[wishlistService] Error fetching products:', productsError);
      throw productsError;
    }

    console.log(`[wishlistService] Found ${products?.length || 0} products for wishlist items`);

    // Combine the data
    const result = wishlistItems.map(item => ({
      ...item,
      product_id: toFrontendId(parseInt(item.product_id)).toString(), // Convert to frontend ID
      products_data: products?.find(p => p.id.toString() === item.product_id.toString()) ? {
        id: toFrontendId(products.find(p => p.id.toString() === item.product_id.toString())!.id).toString(),
        title: products.find(p => p.id.toString() === item.product_id.toString())!.title || 'Unknown Product',
        price: products.find(p => p.id.toString() === item.product_id.toString())!.price || 0,
        actualPrice: products.find(p => p.id.toString() === item.product_id.toString())!.price || 0,
        image: products.find(p => p.id.toString() === item.product_id.toString())!.images__001 || 
               products.find(p => p.id.toString() === item.product_id.toString())!.image || '',
        images: [
          products.find(p => p.id.toString() === item.product_id.toString())!.images__001,
          products.find(p => p.id.toString() === item.product_id.toString())!.images__002,
          products.find(p => p.id.toString() === item.product_id.toString())!.images__003,
          products.find(p => p.id.toString() === item.product_id.toString())!.images__004,
          products.find(p => p.id.toString() === item.product_id.toString())!.images__005
        ].filter(Boolean),
        description: products.find(p => p.id.toString() === item.product_id.toString())!.description || '',
        category: products.find(p => p.id.toString() === item.product_id.toString())!.category__name || 'other',
        slug: products.find(p => p.id.toString() === item.product_id.toString())!.slug || `product-${toFrontendId(products.find(p => p.id.toString() === item.product_id.toString())!.id)}`,
        type: 'regular',
        gender: 'unisex'
      } : undefined
    }));

    console.log('[wishlistService] Returning combined wishlist data:', result);
    return result;
  },

  // Add item to wishlist
  async addToWishlist(userId: string, productId: string) {
    console.log(`[wishlistService] Adding product ${productId} to wishlist for user ${userId}`);
    
    // Convert frontend ID to backend ID
    const backendProductId = toBackendId(parseInt(productId));
    console.log(`[wishlistService] Converted frontend ID ${productId} to backend ID ${backendProductId}`);
    
    // First check if product exists in products_data table
    const { data: product, error: productError } = await supabase
      .from('products_data')
      .select('*')
      .eq('id', backendProductId)
      .single();
    
    if (productError || !product) {
      console.error('[wishlistService] Product not found:', productError);
      throw new Error('Product not found');
    }
    
    console.log('[wishlistService] Product found:', product.title);

    // Check if item already exists in wishlist (using backend ID)
    const { data: existingItem } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', backendProductId)
      .single();
    
    if (existingItem) {
      console.log('[wishlistService] Item already in wishlist');
      throw new Error('Item already in wishlist');
    }

    // Add to wishlist (using backend ID)
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert([{ 
        user_id: userId, 
        product_id: backendProductId,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) {
      console.error('[wishlistService] Error adding to wishlist:', error);
      throw error;
    }
    
    console.log('[wishlistService] Successfully added to wishlist:', data);
    
    // Return the wishlist item with complete product data (using frontend ID)
    const wishlistItem: WishlistItem = {
      ...data,
      product_id: productId, // Use original frontend ID
      products_data: {
        id: productId, // Use frontend ID
        title: product.title || 'Unknown Product',
        price: product.price || 0,
        actualPrice: product.price || 0,
        image: product.images__001 || product.image || '',
        images: [
          product.images__001,
          product.images__002,
          product.images__003,
          product.images__004,
          product.images__005
        ].filter(Boolean),
        description: product.description || '',
        category: product.category__name || 'other',
        slug: product.slug || `product-${productId}`,
        type: 'regular',
        gender: 'unisex'
      }
    };
    
    return wishlistItem;
  },

  // Remove item from wishlist
  async removeFromWishlist(userId: string, productId: string) {
    console.log(`[wishlistService] Removing product ${productId} from wishlist for user ${userId}`);
    
    // Convert frontend ID to backend ID
    const backendProductId = toBackendId(parseInt(productId));
    console.log(`[wishlistService] Converted frontend ID ${productId} to backend ID ${backendProductId}`);
    
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', backendProductId)
    
    if (error) {
      console.error('[wishlistService] Error removing from wishlist:', error);
      throw error;
    }
    
    console.log('[wishlistService] Successfully removed from wishlist');
  },

  // Check if item is in wishlist
  async isInWishlist(userId: string, productId: string) {
    // Convert frontend ID to backend ID
    const backendProductId = toBackendId(parseInt(productId));
    
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', backendProductId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },

  // Clear wishlist
  async clearWishlist(userId: string) {
    console.log(`[wishlistService] Clearing wishlist for user ${userId}`);
    
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) {
      console.error('[wishlistService] Error clearing wishlist:', error);
      throw error;
    }
    
    console.log('[wishlistService] Successfully cleared wishlist');
  }
}