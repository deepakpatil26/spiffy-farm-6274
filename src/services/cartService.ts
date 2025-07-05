import { supabase } from "../lib/supabase";
import { CartItem } from "../types";

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
    console.log(`[cartService] getCartItems - userId: ${userId}`);

    try {
      console.log("[cartService] Fetching cart items with product details...");

      // First, get the cart items
      const { data: cartItems, error } = await supabase
        .from("cart_items")
        .select("id, product_id, quantity")
        .eq("user_id", userId);

      if (error) {
        console.error("[cartService] Error fetching cart items:", error);
        throw error;
      }

      if (!cartItems || cartItems.length === 0) return [];

      // Get all product IDs from cart items
      const productIds = cartItems.map((item) => item.product_id);

      // Then fetch all products in the cart from products_data table
      const { data: products, error: productsError } = await supabase
        .from("products_data")
        .select("*")
        .in("id", productIds);

      if (productsError) {
        console.error("[cartService] Error fetching products:", productsError);
        throw productsError;
      }

      // Transform the data to match the CartItem interface
      const transformedItems: CartItem[] = [];

      for (const cartItem of cartItems) {
        const product = products?.find((p) => p.id === cartItem.product_id);
        if (!product) {
          console.warn(
            `[cartService] Product not found for cart item:`,
            cartItem
          );
          continue; // Skip items with missing product data
        }

        // Get the first available image
        const imageKeys = [
          "images__001",
          "images__002",
          "images__003",
          "images__004",
          "images__005",
        ];
        const firstImage =
          imageKeys.find((key) => product[key as keyof typeof product]) || "";
        const image = firstImage
          ? (product[firstImage as keyof typeof product] as string)
          : "https://placehold.co/600x400";

        transformedItems.push({
          id: product.id.toString(),
          cart_item_id: cartItem.id,
          title: product.title || "Unknown Product",
          price: product.price || 0,
          actualPrice: product.actualPrice || product.price || 0,
          image: image,
          images: [image],
          description: product.description || "",
          category: product.category || "other",
          slug: product.slug || `product-${product.id}`,
          gender: product.gender || "unisex",
          type: product.type || "regular",
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
    productId: string | number,
    quantity: number = 1
  ): Promise<CartItem[]> {
    console.group("[cartService] addToCart");
    console.log("Input:", { userId, productId, quantity });

    try {
      // Convert productId to number if it's a string
      const productIdNum =
        typeof productId === "string" ? parseInt(productId, 10) : productId;

      if (isNaN(productIdNum)) {
        throw new Error("Invalid product ID");
      }

      // First, verify the product exists
      console.log("Fetching product from products_data...");
      console.log(
        "Product ID type:",
        typeof productIdNum,
        "Value:",
        productIdNum
      );

      // First, try to get all products to see what IDs exist
      const { data: allProducts, error: allProductsError } = await supabase
        .from("products_data")
        .select("id")
        .limit(10);

      console.log(
        "First 10 product IDs in database:",
        allProducts?.map((p) => p.id + " (" + typeof p.id + ")")
      );

      // Now try to get the specific product
      console.log(
        "Querying products_data for ID:",
        productIdNum,
        "Type:",
        typeof productIdNum
      );

      // First try with the ID as a number
      console.log("Querying products_data with:", {
        table: "products_data",
        select: "*",
        where: { id: productIdNum, idType: typeof productIdNum },
      });

      let query = supabase
        .from("products_data")
        .select("*")
        .eq("id", productIdNum);

      const { data: product, error: productError } = await query.maybeSingle();

      console.log("Product query result:", {
        product: product ? { id: product.id, title: product.title } : null,
        error: productError,
      });

      // If not found, try with the ID as a string
      if (!product && !productError) {
        console.log("Product not found with numeric ID, trying string ID...");
        console.log("Trying with string ID:", String(productIdNum));

        const stringQuery = supabase
          .from("products_data")
          .select("*")
          .eq("id", String(productIdNum));

        const { data: stringProduct, error: stringError } =
          await stringQuery.maybeSingle();

        if (stringProduct) {
          console.log("Found product with string ID:", {
            id: stringProduct.id,
            title: stringProduct.title,
            idType: typeof stringProduct.id,
          });
          return this.addToCart(userId, stringProduct.id, quantity);
        }
      }

      if (productError) {
        console.error("[cartService] Error fetching product:", productError);
        console.groupEnd();
        throw new Error(`Error fetching product: ${productError.message}`);
      }

      if (!product) {
        const errorMessage = `Product with ID ${productIdNum} not found in products_data`;
        console.error(`[cartService] ${errorMessage}`);
        console.groupEnd();
        throw new Error(errorMessage);
      }
      console.log("Product found:", { id: product.id, title: product.title });

      // Check if item already exists in cart
      console.log("Checking for existing cart item...");
      let existingItem = null;
      try {
        const { data, error } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", userId)
          .eq("product_id", productIdNum)
          .maybeSingle();

        if (error) {
          console.error(
            "[cartService] Error checking for existing cart item:",
            error
          );
          throw error;
        }

        existingItem = data;
        console.log("Existing cart item:", existingItem);
      } catch (error) {
        console.error("[cartService] Error in cart item lookup:", error);
        console.groupEnd();
        throw error;
      }

      if (existingItem) {
        // Update quantity if item exists
        const newQuantity = (existingItem.quantity || 1) + quantity;
        console.log("Updating existing item. New quantity:", newQuantity);

        const { error: updateError } = await supabase
          .from("cart_items")
          .update({
            quantity: newQuantity,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingItem.id);

        if (updateError) {
          console.error("[cartService] Error updating cart item:", updateError);
          console.groupEnd();
          throw updateError;
        }
      } else {
        // Add new item to cart
        console.log("Adding new item to cart");
        const newCartItem = {
          user_id: userId,
          product_id: productIdNum, // Use the numeric product ID
          quantity: quantity,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        console.log("Inserting cart item:", newCartItem);

        const { data: newItem, error: insertError } = await supabase
          .from("cart_items")
          .insert([newCartItem])
          .select()
          .single();

        if (insertError) {
          console.error(
            "[cartService] Error adding item to cart:",
            insertError
          );
          console.groupEnd();
          throw insertError;
        }

        console.log("[cartService] Added new cart item:", newItem);
      }

      // Return the updated cart
      console.log("Fetching updated cart...");
      const updatedCart = await this.getCartItems(userId);
      console.log("[cartService] Updated cart:", updatedCart);
      console.groupEnd();
      return updatedCart;
    } catch (error) {
      console.error("[cartService] Error in addToCart:", error);
      console.groupEnd();
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
