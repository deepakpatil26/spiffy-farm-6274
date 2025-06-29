import { supabase } from '../lib/supabase'

export const cartService = {
  // Get cart items for user
  async getCartItems(userId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        created_at,
        updated_at,
        products (
          id,
          title,
          price,
          actualPrice,
          image,
          img1,
          img2,
          img3,
          img4,
          category,
          gender,
          type,
          discount
        )
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    
    // Transform the data to match CartItem interface
    return (data || []).map(item => ({
      ...item.products,
      quantity: item.quantity,
      cart_item_id: item.id
    }))
  },

  // Add item to cart
  async addToCart(userId: string, productId: string, quantity: number = 1) {
    // Check if item already exists in cart
    const { data: existingItems } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .limit(1)
    
    const existingItem = existingItems?.[0]
    
    if (existingItem) {
      // Update quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } else {
      // Add new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert([{ user_id: userId, product_id: productId, quantity }])
        .select()
        .single()
      
      if (error) throw error
      return data
    }
  },

  // Update cart item quantity
  async updateCartItem(cartItemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Remove item from cart
  async removeFromCart(cartItemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)
    
    if (error) throw error
  },

  // Clear cart
  async clearCart(userId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
    
    if (error) throw error
  }
}