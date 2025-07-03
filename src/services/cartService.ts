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
  // In cartService.ts, update the getCartItems function:
  async getCartItems(userId: string): Promise<CartItem[]> {
    console.log(`[cartService] getCartItems - userId: ${userId}`);

    try {
      console.log("[cartService] Fetching cart items from database...");

      // First, get the cart items with product IDs
      const { data: cartItems, error: cartError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", userId);

      if (cartError) {
        console.error("[cartService] Error fetching cart items:", cartError);
        throw cartError;
      }

      console.log("[cartService] Cart items from database:", cartItems);

      if (!cartItems || cartItems.length === 0) {
        console.log("[cartService] No cart items found for user");
        return [];
      }

      // Get all product IDs from cart
      const productIds = cartItems.map((item) => item.product_id);

      // Fetch all products in the cart
      const { data: products, error: productsError } = await supabase
        .from("products_table")
        .select("*")
        .in("id", productIds);

      if (productsError) {
        console.error("[cartService] Error fetching products:", productsError);
        throw productsError;
      }

      console.log("[cartService] Products from database:", products);

      // Combine cart items with product data
      const transformedItems = cartItems
        .map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.product_id);

          if (!product) {
            console.warn(
              `[cartService] Product not found for cart item:`,
              cartItem
            );
            return null;
          }

          // Map the product fields to match the expected CartItem interface
          return {
            id: product.id,
            title: product.title,
            price: product.price,
            actualPrice: product.price, // Adjust if you have a different field for actual price
            image: product.images__001 || "", // Use the first image
            img1: product.images__001,
            img2: product.images__002,
            img3: product.images__003,
            img4: product.images__004,
            category: product.category__name || "",
            gender: (product.gender?.toLowerCase() === "women"
              ? "women"
              : "men") as "men" | "women",
            type: product.category__name || "",
            quantity: cartItem.quantity,
            cart_item_id: cartItem.id,
          } as CartItem; // Explicitly type the object as CartItem
        })
        .filter((item): item is CartItem => item !== null); // Type guard to ensure non-null items

      console.log("[cartService] Transformed cart items:", transformedItems);
      return transformedItems;
    } catch (error) {
      console.error("[cartService] Error in getCartItems:", error);
      throw error;
    }
  },

  // Add item to cart
  async addToCart(userId: string, productId: string, quantity: number = 1) {
    console.log(
      `[cartService] addToCart - userId: ${userId}, productId: ${productId}, quantity: ${quantity}`
    );

    try {
      // Check if item already exists in cart
      console.log("[cartService] Checking for existing cart item...");
      const { data: existingItems, error: fetchError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", userId)
        .eq("product_id", productId)
        .limit(1);

      if (fetchError) {
        console.error(
          "[cartService] Error fetching existing cart items:",
          fetchError
        );
        throw fetchError;
      }

      console.log("[cartService] Existing items:", existingItems);
      const existingItem = existingItems?.[0];

      if (existingItem) {
        // Update quantity
        console.log(
          `[cartService] Updating existing item (id: ${
            existingItem.id
          }) quantity from ${existingItem.quantity} to ${
            existingItem.quantity + quantity
          }`
        );

        const { data: updatedItem, error: updateError } = await supabase
          .from("cart_items")
          .update({
            quantity: existingItem.quantity + quantity,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingItem.id)
          .select()
          .single();

        if (updateError) {
          console.error("[cartService] Error updating cart item:", updateError);
          throw updateError;
        }

        console.log(
          "[cartService] Successfully updated cart item:",
          updatedItem
        );

        // Return the full updated cart
        console.log("[cartService] Getting updated cart items...");
        const updatedCart = await this.getCartItems(userId);
        console.log("[cartService] Updated cart:", updatedCart);
        return updatedCart;
      } else {
        // Add new item
        console.log("[cartService] Adding new item to cart");
        const newCartItem = {
          user_id: userId,
          product_id: productId,
          quantity,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        console.log("[cartService] Inserting new cart item:", newCartItem);
        const { data: insertedItem, error: insertError } = await supabase
          .from("cart_items")
          .insert([newCartItem])
          .select()
          .single();

        if (insertError) {
          console.error(
            "[cartService] Error inserting cart item:",
            insertError
          );
          throw insertError;
        }

        console.log(
          "[cartService] Successfully added cart item:",
          insertedItem
        );

        // Return the full updated cart
        console.log("[cartService] Getting updated cart items...");
        const updatedCart = await this.getCartItems(userId);
        console.log("[cartService] Updated cart:", updatedCart);
        return updatedCart;
      }
    } catch (error) {
      console.error("[cartService] Error in addToCart:", error);
      throw error;
    }
  },

  // Update cart item quantity
  async updateCartItem(userId: string, cartItemId: string, quantity: number) {
    try {
      // First verify the cart item exists and belongs to the user
      const { data: cartItem, error: fetchError } = await supabase
        .from("cart_items")
        .select("user_id")
        .eq("id", cartItemId)
        .single();

      if (fetchError) throw fetchError;

      if (cartItem.user_id !== userId) {
        throw new Error("Unauthorized to update this item");
      }

      const { error: updateError } = await supabase
        .from("cart_items")
        .update({
          quantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", cartItemId);

      if (updateError) throw updateError;

      // Return the full updated cart
      return await this.getCartItems(userId);
    } catch (error) {
      console.error("Error in cartService.updateCartItem:", error);
      throw error;
    }
  },

  // Remove item from cart
  async removeFromCart(userId: string, cartItemId: string) {
    try {
      // First get the cart item to verify it exists and belongs to the user
      const { data: cartItem, error: fetchError } = await supabase
        .from("cart_items")
        .select("user_id")
        .eq("id", cartItemId)
        .single();

      if (fetchError) throw fetchError;

      if (cartItem.user_id !== userId) {
        throw new Error("Unauthorized to remove this item");
      }

      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartItemId);

      if (deleteError) throw deleteError;

      // Return the full updated cart
      return await this.getCartItems(userId);
    } catch (error) {
      console.error("Error in cartService.removeFromCart:", error);
      throw error;
    }
  },

  // Clear cart
  async clearCart(userId: string) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;
  },
};
