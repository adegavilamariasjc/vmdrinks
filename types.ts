
export interface Product {
  id: string;
  name: string;
  price: number;
  costPrice: number; 
  stock: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  isPopular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  notes?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
export type PaymentMethod = 'PIX' | 'CREDIT' | 'DEBIT' | 'CASH';

export interface Order {
  id: string;
  customerId: string; // Linked to User.id
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  method: PaymentMethod;
  address: string;
  timestamp: number;
  discount?: number; // Valor do desconto aplicado
  appliedCoupon?: string; // Código do cupom usado
  type?: 'DELIVERY' | 'PDV';
  cashReceived?: number;
  change?: number;
  sentToKitchen?: boolean; // New flag for KDS logic
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent?: number;
  discountValue?: number;
  description: string;
  isActive: boolean; // Global switch
}

export interface User {
  id: string;
  name: string;
  phone: string; // Unique identifier for login in this demo
  password?: string; // Added password field
  role: 'GUEST' | 'CLIENT' | 'ADMIN' | 'KITCHEN' | 'DELIVERY' | 'PDV';
  addresses: any[];
  usedCoupons: string[]; // Array of Coupon Codes that this user has already used/burned
  ordersCount: number;
}

export enum ScreenName {
  AUTH = 'AUTH', 
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS', 
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  PAYMENT_PIX = 'PAYMENT_PIX',
  TRACKING = 'TRACKING',
  ADMIN = 'ADMIN',
  KITCHEN = 'KITCHEN',
  DELIVERY = 'DELIVERY',
  PDV = 'PDV',
  PROFILE = 'PROFILE',
  COUPONS = 'COUPONS'
}

export interface Category {
  id: string;
  name: string;
  icon: any; 
}