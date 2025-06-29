// Product Types
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
  category: string;
  gender: 'men' | 'women';
  type: string;
  discount?: number;
  created_at?: string;
}

// Cart Types
export interface CartItem extends Product {
  quantity: number;
  cart_item_id?: string; // For Supabase cart items
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

export interface RootState {
  AuthReducer: AuthState;
  MenReducer: ProductState;
  cartReducer: CartState;
}

// Component Props Types
export interface CardProps extends Product {
  type: 'men' | 'women';
}

export interface FilterProps {
  type: 'men' | 'women';
}

// API Query Parameters - Updated to match actual usage
export interface QueryParams {
  params: {
    category?: string[];
    _page?: string | null;
    _sort?: string | null;
    _order?: string | null;
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