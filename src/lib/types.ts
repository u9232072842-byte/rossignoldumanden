
import type { ImagePlaceholder } from '@/lib/placeholder-images';

export type ProductVariant = {
  size?: string[];
  color?: string[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: ImagePlaceholder[];
  category: string;
  variants?: ProductVariant;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};
