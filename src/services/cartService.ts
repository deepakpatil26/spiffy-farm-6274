import { supabase } from '../lib/supabase';
import { CartItem } from '../types';
import { productService } from './productService';
import { toBackendId, toFrontendId } from '../utils/idMapper';

export interface SupabaseCartItem {
  id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  products_data: {
    id: number;
    title: string;
    price: number;
    description?: string;
    category__name: string;
    slug: string;
    images__001?: string;
    images__002?: string;
    images__003?: string;
    images__004?: string;
    images__005?: string;
  };
}

export const cartService = {
  /**
   * Get all cart items for a user with product details
   */
  async getCartItems(userId: string): Promise<CartItem[]> {
    try {
      // First, get the cart items
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select('id, product_id, quantity')
        .eq('user_id', userId);

      if (error) {
        console.error('[cartService] Error fetching cart items:', error);
        throw error;
      }

      if (!cartItems || cartItems.length === 0) return [];

      // Get unique product IDs from cart items using Array.from instead of spread operator
      const productIdSet = new Set(cartItems.map((item) => item.product_id));
      const uniqueProductIds = Array.from(productIdSet);

      // Fetch all products from the database using productService
      const productPromises = uniqueProductIds.map(async (backendProductId) => {
        try {
          // Convert backend ID to frontend ID for the service
          const frontendId = toFrontendId(backendProductId);
          const product = await productService.getProduct(
            frontendId.toString(),
          );
          return { id: backendProductId, product };
        } catch (error) {
          console.warn(
            `[cartService] Failed to fetch product ${backendProductId}:`,
            error,
          );
          return { id: backendProductId, product: null };
        }
      });

      const productResults = await Promise.all(productPromises);
      const productsMap = new Map();

      productResults.forEach(({ id, product }) => {
        if (product) {
          productsMap.set(id, product);
        }
      });

      // Transform the data to match the CartItem interface
      const transformedItems: CartItem[] = [];

      for (const cartItem of cartItems) {
        const product = productsMap.get(cartItem.product_id);
        if (!product) {
          console.warn(
            `[cartService] Product not found for cart item:`,
            cartItem,
          );
          continue; // Skip items with missing product data
        }

        // Get the first available image from the productService format
        let image = 'https://placehold.co/600x400';
        const images: string[] = [];

        // productService returns images as an array
        if (
          product.images &&
          Array.isArray(product.images) &&
          product.images.length > 0
        ) {
          image = product.images[0];
          images.push(...product.images);
        }

        // If no images found, use placeholder
        if (images.length === 0) {
          images.push(image);
        }

        transformedItems.push({
          id: product.id.toString(),
          cart_item_id: cartItem.id,
          title: product.title || 'Unknown Product',
          price: product.price || 0,
          actualPrice: product.price || 0,
          image: image,
          images: images,
          description: product.description || '',
          category: product.category || 'other',
          slug: product.slug || `product-${product.id}`,
          gender: 'unisex', // Default since external API doesn't provide this
          type: 'regular', // Default since external API doesn't provide this
          quantity: cartItem.quantity || 1,
        });
      }

      return transformedItems;
    } catch (error) {
      console.error('[cartService] Error in getCartItems:', error);
      throw error;
    }
  },

  /**
   * Add item to cart or update quantity if already exists
   */
  async addToCart(
    userId: string,
    productId: string | number,
    quantity: number = 1,
  ): Promise<CartItem[]> {
    try {
      // Handling Mock Admin User
      if (userId === 'admin-super-user-id') {
        return []; // Return empty array or mock updated cart
      }

      // Convert productId to number if it's a string and validate
      const productIdNum =
        typeof productId === 'string' ? parseInt(productId, 10) : productId;
      const backendProductId = toBackendId(productIdNum);

      if (isNaN(productIdNum) || isNaN(backendProductId)) {
        throw new Error('Invalid product ID');
      }

      // Verify the product exists in our database

      let product;
      try {
        // Get product using the frontend ID (service will handle the conversion)
        const result = await productService.getProduct(productId.toString());
        if (!result) {
          throw new Error(
            `Product with ID ${productId} (backend ID: ${backendProductId}) not found in database`,
          );
        }
        product = result;
      } catch (error) {
        const errorMessage = `Product with ID ${productId} not found in database`;
        console.error(`[cartService] ${errorMessage}`, error);

        throw new Error(errorMessage);
      }

      if (!product) {
        const errorMessage = `Product with ID ${productIdNum} not found`;
        console.error(`[cartService] ${errorMessage}`);

        throw new Error(errorMessage);
      }

      // Check if item already exists in cart

      let existingItem = null;
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', userId)
          .eq('product_id', backendProductId)
          .maybeSingle();

        if (error) {
          console.error(
            '[cartService] Error checking for existing cart item:',
            error,
          );
          throw error;
        }

        existingItem = data;
      } catch (error) {
        console.error('[cartService] Error in cart item lookup:', error);

        throw error;
      }

      if (existingItem) {
        // Update quantity if item exists
        const newQuantity = (existingItem.quantity || 1) + quantity;

        const { error: updateError } = await supabase
          .from('cart_items')
          .update({
            quantity: newQuantity,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingItem.id);

        if (updateError) {
          console.error('[cartService] Error updating cart item:', updateError);

          throw updateError;
        }
      } else {
        // Add new item to cart

        const newCartItem = {
          user_id: userId,
          product_id: backendProductId, // Use the backend product ID
          quantity: quantity,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { data: newItem, error: insertError } = await supabase
          .from('cart_items')
          .insert([newCartItem])
          .select()
          .single();

        if (insertError) {
          console.error(
            '[cartService] Error adding item to cart:',
            insertError,
          );

          throw insertError;
        }
      }

      // Return the updated cart

      const updatedCart = await this.getCartItems(userId);

      return updatedCart;
    } catch (error) {
      console.error('[cartService] Error in addToCart:', error);

      throw error;
    }
  },

  /**
   * Update cart item quantity
   */

  async updateCartItem(
    userId: string,
    cartItemId: string,
    quantity: number,
  ): Promise<CartItem[]> {
    try {
      if (quantity < 1) {
        // If quantity is less than 1, remove the item
        return this.removeFromCart(userId, cartItemId);
      }

      // Handling Mock Admin User
      if (userId === 'admin-super-user-id') {
        return [];
      }

      // First verify the cart item exists and belongs to the user
      const { data: cartItem, error: fetchError } = await supabase
        .from('cart_items')
        .select('user_id')
        .eq('id', cartItemId)
        .single();

      if (fetchError) {
        console.error('[cartService] Error fetching cart item:', fetchError);
        throw fetchError;
      }

      if (cartItem.user_id !== userId) {
        throw new Error('Unauthorized to update this item');
      }

      // Update the quantity
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({
          quantity,
          updated_at: new Date().toISOString(),
        })
        .eq('id', cartItemId);

      if (updateError) {
        console.error('[cartService] Error updating cart item:', updateError);
        throw updateError;
      }

      // Return the updated cart
      return this.getCartItems(userId);
    } catch (error) {
      console.error('[cartService] Error in updateCartItem:', error);
      throw error;
    }
  },

  /**
   * Remove item from cart
   */

  async removeFromCart(
    userId: string,
    cartItemId: string,
  ): Promise<CartItem[]> {
    try {
      // Handling Mock Admin User
      if (userId === 'admin-super-user-id') {
        return [];
      }

      // First verify the cart item exists and belongs to the user
      const { data: cartItem, error: fetchError } = await supabase
        .from('cart_items')
        .select('user_id')
        .eq('id', cartItemId)
        .single();

      if (fetchError) {
        console.error('[cartService] Error fetching cart item:', fetchError);
        throw fetchError;
      }

      if (cartItem.user_id !== userId) {
        throw new Error('Unauthorized to remove this item');
      }

      // Delete the cart item
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (deleteError) {
        console.error('[cartService] Error removing cart item:', deleteError);
        throw deleteError;
      }

      // Return the updated cart
      return this.getCartItems(userId);
    } catch (error) {
      console.error('[cartService] Error in removeFromCart:', error);
      throw error;
    }
  },

  /**
   * Clear all items from cart
   */
  async clearCart(userId: string): Promise<void> {
    try {
      // Handling Mock Admin User
      if (userId === 'admin-super-user-id') {
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('[cartService] Error clearing cart:', error);
        throw error;
      }
    } catch (error) {
      console.error('[cartService] Error in clearCart:', error);
      throw error;
    }
  },
};
