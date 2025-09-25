
import type { PlaceHolderImages } from '@/lib/placeholder-images';

export type ProductVariant = {
  size?: string[];
  color?: string[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: (typeof PlaceHolderImages)[0] | undefined;
  category: string;
  variants?: ProductVariant;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};
