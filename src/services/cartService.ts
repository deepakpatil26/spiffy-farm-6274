import { supabase } from "../lib/supabase";
import { CartItem } from "../types";

export interface SupabaseCartItem {
  id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  products: {
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
    gender: string;
    type: string;
  };
}

export const cartService = {
  /**
   * Get all cart items for a user with product details
   */
  async getCartItems(userId: string): Promise<CartItem[]> {
    console.log(`[cartService] getCartItems - userId: ${userId}`);

    try {
      console.log("[cartService] Fetching cart items with product details...");

      // First, get the cart items
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select('id, product_id, quantity')
        .eq('user_id', userId);

      if (error) throw error;
      if (!cartItems || cartItems.length === 0) return [];

      // Get all product IDs from cart items
      const productIds = cartItems.map(item => item.product_id);

      // Then fetch all products in the cart
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .in('id', productIds);

      if (productsError) throw productsError;

      // Transform the data to match the CartItem interface
      const transformedItems: CartItem[] = [];
      
      for (const cartItem of cartItems) {
        const product = products?.find(p => p.id === cartItem.product_id);
        if (!product) continue; // Skip items with missing product data
        
        transformedItems.push({
          id: cartItem.product_id,
          cart_item_id: cartItem.id,
          title: product.title,
          price: product.price,
          actualPrice: product.actualPrice || product.price,
          image: product.images__001 || "",
          img1: product.images__001,
          img2: product.images__002,
          img3: product.images__003,
          img4: product.images__004,
          category: product.category__name || "",
          gender: product.gender || "",
          type: product.type || "",
          quantity: cartItem.quantity || 1,
        });
      }

      console.log("[cartService] Transformed cart items:", transformedItems);
      return transformedItems;
    } catch (error) {
      console.error("[cartService] Error in getCartItems:", error);
      throw error;
    }
  },

  /**
   * Add item to cart or update quantity if already exists
   */
  async addToCart(
    userId: string,
    productId: string,
    quantity: number = 1
  ): Promise<CartItem[]> {
    console.log(
      `[cartService] addToCart - userId: ${userId}, productId: ${productId}, quantity: ${quantity}`
    );

    try {
      // Check if item already exists in cart
      const { data: existingItem, error: fetchError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", userId)
        .eq("product_id", productId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 is "no rows returned"
        console.error(
          "[cartService] Error checking for existing cart item:",
          fetchError
        );
        throw fetchError;
      }

      if (existingItem) {
        // Update quantity if item exists
        await supabase
          .from("cart_items")
          .update({
            quantity: existingItem.quantity + quantity,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingItem.id);
      } else {
        // Add new item to cart
        await supabase.from("cart_items").insert([
          {
            user_id: userId,
            product_id: productId,
            quantity,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      }

      // Return the updated cart
      return this.getCartItems(userId);
    } catch (error) {
      console.error("[cartService] Error in addToCart:", error);
      throw error;
    }
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(
    userId: string,
    cartItemId: string,
    quantity: number
  ): Promise<CartItem[]> {
    console.log(
      `[cartService] updateCartItem - userId: ${userId}, cartItemId: ${cartItemId}, quantity: ${quantity}`
    );

    try {
      if (quantity < 1) {
        // If quantity is less than 1, remove the item
        return this.removeFromCart(userId, cartItemId);
      }

      // First verify the cart item exists and belongs to the user
      const { data: cartItem, error: fetchError } = await supabase
        .from("cart_items")
        .select("user_id")
        .eq("id", cartItemId)
        .single();

      if (fetchError) {
        console.error("[cartService] Error fetching cart item:", fetchError);
        throw fetchError;
      }

      if (cartItem.user_id !== userId) {
        throw new Error("Unauthorized to update this item");
      }

      // Update the quantity
      const { error: updateError } = await supabase
        .from("cart_items")
        .update({
          quantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", cartItemId);

      if (updateError) {
        console.error("[cartService] Error updating cart item:", updateError);
        throw updateError;
      }

      // Return the updated cart
      return this.getCartItems(userId);
    } catch (error) {
      console.error("[cartService] Error in updateCartItem:", error);
      throw error;
    }
  },

  /**
   * Remove item from cart
   */
  async removeFromCart(
    userId: string,
    cartItemId: string
  ): Promise<CartItem[]> {
    console.log(
      `[cartService] removeFromCart - userId: ${userId}, cartItemId: ${cartItemId}`
    );

    try {
      // First verify the cart item exists and belongs to the user
      const { data: cartItem, error: fetchError } = await supabase
        .from("cart_items")
        .select("user_id")
        .eq("id", cartItemId)
        .single();

      if (fetchError) {
        console.error("[cartService] Error fetching cart item:", fetchError);
        throw fetchError;
      }

      if (cartItem.user_id !== userId) {
        throw new Error("Unauthorized to remove this item");
      }

      // Delete the cart item
      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartItemId);

      if (deleteError) {
        console.error("[cartService] Error removing cart item:", deleteError);
        throw deleteError;
      }

      // Return the updated cart
      return this.getCartItems(userId);
    } catch (error) {
      console.error("[cartService] Error in removeFromCart:", error);
      throw error;
    }
  },

  /**
   * Clear all items from cart
   */
  async clearCart(userId: string): Promise<void> {
    console.log(`[cartService] clearCart - userId: ${userId}`);

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

      if (error) {
        console.error("[cartService] Error clearing cart:", error);
        throw error;
      }

      console.log("[cartService] Cart cleared successfully");
    } catch (error) {
      console.error("[cartService] Error in clearCart:", error);
      throw error;
    }
  },
};
