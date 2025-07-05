// Product Types - Updated for new API structure
export interface ApiProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  actualPrice: number;
  image: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  images?: string[];
  description?: string;
  category: string;
  categoryId?: number;
  categorySlug?: string;
  slug?: string;
  type: string;
  gender: 'men' | 'women' | 'unisex';
  discount?: number;
  created_at?: string;
}

// Cart Types
export interface CartItem extends Product {
  quantity: number;
  cart_item_id?: string; // For Supabase cart items
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  products_data?: Product;
}

// User Types
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  created_at?: string;
}

export interface AuthUser {
  email: string;
  name: string;
  password: string;
}

// Address Types
export interface Address {
  name: string;
  mobile: string;
  pin: string;
  city: string;
  state: string;
  building: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  total?: number;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

// Redux State Types
export interface AuthState {
  createAccountLoading: boolean;
  successCreate: boolean;
  createError: boolean;
  userData: User[];
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  afterLoginUser: AuthUser;
  isAdmin?: boolean;
  user: any; // Supabase user object
  session: any; // Supabase session object
}

export interface ProductState {
  menLoading: boolean;
  menError: boolean;
  womenLoading: boolean;
  womenError: boolean;
  total: number;
  men: Product[];
  women: Product[];
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
}

export interface CartState {
  items: CartItem[];
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  total: number;
}

export interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  AuthReducer: AuthState;
  MenReducer: ProductState;
  cartReducer: CartState;
  wishlistReducer: WishlistState;
}

// Component Props Types
export interface CardProps extends Omit<Product, 'type'> {
  type: string;
}

export interface FilterProps {
  type?: string;
  categories?: Category[];
}

// API Query Parameters
export interface QueryParams {
  params: {
    category?: string[];
    categoryId?: number[];
    _page?: string | null;
    _sort?: string | null;
    _order?: string | null;
    _limit?: number;
  };
}

// Toast Types
export interface ToastOptions {
  title: string;
  description?: string;
  status: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  isClosable?: boolean;
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm extends User {}

export interface PaymentForm {
  cardno: string;
  ExpiringDate: string;
  cvv: string;
}

// Admin Types
export interface AdminProduct extends Omit<Product, 'id'> {
  id?: string;
}