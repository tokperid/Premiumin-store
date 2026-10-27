export interface ProductVariant {
  id: string;
  name: string;
  duration: string;
  price: number;
  stock: number;
  category: 'sharing' | 'private';
}

export interface Product {
  id: string;
  name: string;
  category: 'streaming' | 'music';
  icon?: string;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'delivered' | 'failed';
  paymentUrl?: string;
  createdAt: Date;
}
