import { ApiProduct, Product, Category } from '../types';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export interface ProductFilters {
  categoryId?: number;
  limit?: number;
  offset?: number;
  title?: string;
  price_min?: number;
  price_max?: number;
}

// Transform API product to our Product interface
const transformApiProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id.toString(),
  title: apiProduct.title,
  price: apiProduct.price,
  image: apiProduct.images[0] || 'https://placehold.co/600x400',
  images: apiProduct.images,
  description: apiProduct.description,
  category: apiProduct.category.name,
  categoryId: apiProduct.category.id,
  categorySlug: apiProduct.category.slug,
  slug: apiProduct.slug,
  created_at: apiProduct.creationAt,
});

export const newProductService = {
  // Get all products with filters
  async getProducts(filters: ProductFilters = {}): Promise<{ data: Product[]; total: number }> {
    const params = new URLSearchParams();
    
    if (filters.categoryId) params.append('categoryId', filters.categoryId.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.offset) params.append('offset', filters.offset.toString());
    if (filters.title) params.append('title', filters.title);
    if (filters.price_min) params.append('price_min', filters.price_min.toString());
    if (filters.price_max) params.append('price_max', filters.price_max.toString());

    const response = await fetch(`${API_BASE_URL}/products?${params}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    
    const data: ApiProduct[] = await response.json();
    const transformedData = data.map(transformApiProduct);
    
    return { data: transformedData, total: transformedData.length };
  },

  // Get products by category
  async getProductsByCategory(categoryId: number, limit = 12, offset = 0): Promise<{ data: Product[]; total: number }> {
    return this.getProducts({ categoryId, limit, offset });
  },

  // Get single product
  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    
    const data: ApiProduct = await response.json();
    return transformApiProduct(data);
  },

  // Get all categories
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    
    return response.json();
  },

  // Get products by category slug
  async getProductsByCategorySlug(slug: string, limit = 12, offset = 0): Promise<{ data: Product[]; total: number }> {
    // First get the category by slug
    const categories = await this.getCategories();
    const category = categories.find(cat => cat.slug === slug);
    
    if (!category) {
      throw new Error('Category not found');
    }
    
    return this.getProductsByCategory(category.id, limit, offset);
  },

  // Search products
  async searchProducts(query: string, limit = 12): Promise<{ data: Product[]; total: number }> {
    return this.getProducts({ title: query, limit });
  },

  // Get featured products (mix from different categories)
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
  }> {
    const [featured, clothes, electronics, furniture, shoes] = await Promise.all([
      this.getProducts({ limit: 8 }),
      this.getProductsByCategorySlug('clothes', 8),
      this.getProductsByCategorySlug('electronics', 8),
      this.getProductsByCategorySlug('furniture', 8),
      this.getProductsByCategorySlug('shoes', 8),
    ]);

    return {
      featured: featured.data,
      clothes: clothes.data,
      electronics: electronics.data,
      furniture: furniture.data,
      shoes: shoes.data,
    };
  }
};