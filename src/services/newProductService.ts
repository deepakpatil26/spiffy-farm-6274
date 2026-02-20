import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';

// Transform Supabase product to our Product interface
const transformSupabaseProduct = (item: any): Product => ({
  id: item.id.toString(),
  title: item.title,
  price: item.price,
  actualPrice: item.price,
  image:
    item.images && Array.isArray(item.images) && item.images.length > 0
      ? item.images[0]
      : item.image || item.category__image || 'https://placehold.co/600x400',
  images:
    item.images && Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : item.category__image
        ? [item.category__image]
        : [],
  description: item.description,
  category: item.category__name || item.category,
  categoryId: item.category__id,
  categorySlug: item.category__slug,
  slug: item.slug,
  type: item.type || 'regular',
  gender: item.gender || 'unisex',
  created_at: item.creationAt || item.created_at,
});

export interface ProductFilters {
  categoryId?: number;
  limit?: number;
  offset?: number;
  title?: string;
  categorySlug?: string;
  price_min?: number;
  price_max?: number;
}

export const newProductService = {
  // Get all products with filters
  async getProducts(
    filters: ProductFilters = {},
  ): Promise<{ data: Product[]; total: number }> {
    let query = supabase.from('products_data').select('*', { count: 'exact' });

    if (filters.categoryId)
      query = query.eq('category__id', filters.categoryId);
    if (filters.categorySlug)
      query = query.eq('category__slug', filters.categorySlug);
    if (filters.title) query = query.ilike('title', `%${filters.title}%`);
    if (filters.price_min) query = query.gte('price', filters.price_min);
    if (filters.price_max) query = query.lte('price', filters.price_max);

    if (filters.offset !== undefined && filters.limit !== undefined) {
      query = query.range(filters.offset, filters.offset + filters.limit - 1);
    } else if (filters.limit) {
      query = query.limit(filters.limit);
    }

    // Default sort by creationAt descending (newest first)
    query = query.order('creationAt', { ascending: false });

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      data: (data || []).map(transformSupabaseProduct),
      total: count || 0,
    };
  },

  // Get products by category
  async getProductsByCategory(
    categoryId: number,
    limit = 12,
    offset = 0,
  ): Promise<{ data: Product[]; total: number }> {
    return this.getProducts({ categoryId, limit, offset });
  },

  // Get single product
  async getProduct(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products_data')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return transformSupabaseProduct(data);
  },

  // Get all categories (Derived from products_data since it's denormalized)
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('products_data')
      .select('category__id, category__name, category__slug, category__image')
      .not('category__id', 'is', null);

    if (error) throw error;

    // Filter unique categories
    const uniqueCategories = Array.from(
      new Map(data.map((item) => [item.category__id, item])).values(),
    );

    return uniqueCategories.map((item) => ({
      id: item.category__id,
      name: item.category__name,
      slug: item.category__slug,
      image: item.category__image,
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  },

  // Get products by category slug
  async getProductsByCategorySlug(
    slug: string,
    limit = 12,
    offset = 0,
  ): Promise<{ data: Product[]; total: number }> {
    return this.getProducts({ categorySlug: slug, limit, offset });
  },

  // Search products
  async searchProducts(
    query: string,
    limit = 12,
  ): Promise<{ data: Product[]; total: number }> {
    return this.getProducts({ title: query, limit });
  },

  // Get featured products
  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    const { data } = await this.getProducts({ limit });
    return data;
  },

  // Get products for homepage sections
  async getProductsForHomepage(): Promise<{
    featured: Product[];
    clothes: Product[];
    electronics: Product[];
    furniture: Product[];
    shoes: Product[];
    miscellaneous: Product[];
  }> {
    const [featured, clothes, electronics, furniture, shoes, miscellaneous] =
      await Promise.all([
        this.getProducts({ limit: 8 }),
        this.getProductsByCategorySlug('clothes', 8),
        this.getProductsByCategorySlug('electronics', 8),
        this.getProductsByCategorySlug('furniture', 8),
        this.getProductsByCategorySlug('shoes', 8),
        this.getProductsByCategorySlug('miscellaneous', 8),
      ]);

    return {
      featured: featured.data,
      clothes: clothes.data,
      electronics: electronics.data,
      furniture: furniture.data,
      shoes: shoes.data,
      miscellaneous: miscellaneous.data,
    };
  },

  // Add product (admin)
  async addProduct(product: Partial<Product>) {
    // Transform frontend product to backend schema
    const backendProduct = {
      title: product.title,
      price: product.price,
      // Removed 'image' column as it is not in the schema.
      // Images are stored in 'images' array or images_001 etc.

      images: [
        product.image,
        product.img1,
        product.img2,
        product.img3,
        product.img4,
      ].filter(Boolean),
      description: product.description || product.title,

      // Mapping frontend 'category' string to backend fields
      category__name: product.category,
      category__slug:
        product.category?.toLowerCase().replace(/ /g, '-') || 'general',
      // Generating a random ID or using a default.
      // Ideally we should lookup existing categories, but for now we provide a valid number.
      category__id: Math.floor(Math.random() * 1000) + 10,
      category__image: product.image || 'https://placehold.co/600x400',

      gender: product.gender,

      slug: product.title?.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),

      // Matches the schema provided by user: id, title, slug, price, description, category__*, images, creationAt, ...
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('products_data')
      .insert([backendProduct])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update product (admin)
  async updateProduct(id: string, updates: Partial<Product>) {
    // Map updates to backend schema
    const backendUpdates: any = { ...updates };

    // Remove fields that don't exist in the DB schema
    delete backendUpdates.id;
    delete backendUpdates.created_at;
    // creationAt and updatedAt are valid columns based on user input, so we might want to update updatedAt
    // But we should NOT delete them if we want to update them?
    // Wait, logic says "delete backendUpdates.creationAt" likely to avoid changing creation time.
    delete backendUpdates.creationAt;

    // updatedAt should be updated to now.
    backendUpdates.updatedAt = new Date().toISOString();

    delete backendUpdates.type;
    delete backendUpdates.discount;
    delete backendUpdates.image; // Image column does not exist

    // Map category if it changed
    if (backendUpdates.category) {
      backendUpdates.category__name = backendUpdates.category;
      // Only update slug/id if we really want to, but simplest is just name match
      delete backendUpdates.category;
    }

    const { data, error } = await supabase
      .from('products_data')
      .update(backendUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete product (admin)
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products_data')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
