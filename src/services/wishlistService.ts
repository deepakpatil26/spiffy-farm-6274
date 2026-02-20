import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { toBackendId, toFrontendId } from '../utils/idMapper';

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  products_data?: Product;
}

export const wishlistService = {
  // Get wishlist items for user with product details
  async getWishlistItems(userId: string): Promise<WishlistItem[]> {
    // First get the wishlist items
    const { data: wishlistItems, error: wishlistError } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId);

    if (wishlistError) {
      console.error(
        '[wishlistService] Error fetching wishlist items:',
        wishlistError,
      );
      throw wishlistError;
    }

    if (!wishlistItems?.length) {
      return [];
    }

    // Get all product IDs (convert from backend to frontend for product lookup)
    const backendProductIds = wishlistItems.map((item) => item.product_id);

    // Fetch all products in one query
    const { data: products, error: productsError } = await supabase
      .from('products_data')
      .select('*')
      .in('id', backendProductIds);

    if (productsError) {
      console.error(
        '[wishlistService] Error fetching products:',
        productsError,
      );
      throw productsError;
    }

    // Combine the data
    const result = wishlistItems.map((item) => {
      const product = products?.find(
        (p) => p.id.toString() === item.product_id.toString(),
      );

      if (!product)
        return {
          ...item,
          product_id: toFrontendId(parseInt(item.product_id)).toString(),
          products_data: undefined,
        };

      // Extract images from array or fallback
      const images =
        product.images &&
        Array.isArray(product.images) &&
        product.images.length > 0
          ? product.images
          : [
              product.image ||
                product.category__image ||
                'https://placehold.co/600x400',
            ];

      return {
        ...item,
        product_id: toFrontendId(parseInt(item.product_id)).toString(),
        products_data: {
          id: toFrontendId(product.id).toString(),
          title: product.title || 'Unknown Product',
          price: product.price || 0,
          actualPrice: product.price || 0,
          image: images[0],
          images: images,
          description: product.description || '',
          category: product.category__name || 'other',
          slug: product.slug || `product-${toFrontendId(product.id)}`,
          type: product.type || 'regular',
          gender: product.gender || 'unisex',
        },
      };
    });

    return result;
  },

  // Add item to wishlist
  async addToWishlist(userId: string, productId: string) {
    // Handling Mock Admin User
    if (userId === 'admin-super-user-id') {
      // Return a mock result to satisfy the Promise return type
      return {
        id: 'mock-wishlist-item-id',
        user_id: userId,
        product_id: productId,
        created_at: new Date().toISOString(),
        products_data: {
          id: productId,
          title: 'Mock Product',
          price: 0,
          actualPrice: 0,
          image: 'https://placehold.co/600x400',
          images: [],
          description: 'Mock Description',
          category: 'Mock Category',
          slug: 'mock-product',
          type: 'regular',
          gender: 'unisex',
        },
      };
    }

    // Convert frontend ID to backend ID
    const backendProductId = toBackendId(parseInt(productId));

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

    // Check if item already exists in wishlist (using backend ID)
    const { data: existingItem } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', backendProductId)
      .single();

    if (existingItem) {
      throw new Error('Item already in wishlist');
    }

    // Add to wishlist (using backend ID)
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert([
        {
          user_id: userId,
          product_id: backendProductId,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('[wishlistService] Error adding to wishlist:', error);
      throw error;
    }

    // Extract images from array or fallback
    const images =
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
        ? product.images
        : [
            product.image ||
              product.category__image ||
              'https://placehold.co/600x400',
          ];

    // Return the wishlist item with complete product data (using frontend ID)
    const wishlistItem: WishlistItem = {
      ...data,
      product_id: productId, // Use original frontend ID
      products_data: {
        id: productId, // Use frontend ID
        title: product.title || 'Unknown Product',
        price: product.price || 0,
        actualPrice: product.price || 0,
        image: images[0],
        images: images,
        description: product.description || '',
        category: product.category__name || 'other',
        slug: product.slug || `product-${productId}`,
        type: product.type || 'regular',
        gender: product.gender || 'unisex',
      },
    };

    return wishlistItem;
  },

  // Remove item from wishlist
  async removeFromWishlist(userId: string, productId: string) {
    // Handling Mock Admin User
    if (userId === 'admin-super-user-id') {
      return;
    }

    // Convert frontend ID to backend ID
    const backendProductId = toBackendId(parseInt(productId));

    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', backendProductId);

    if (error) {
      console.error('[wishlistService] Error removing from wishlist:', error);
      throw error;
    }
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
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('[wishlistService] Error clearing wishlist:', error);
      throw error;
    }
  },
};
