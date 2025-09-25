
import type { PlaceHolderImages } from '@/lib/placeholder-images';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: (typeof PlaceHolderImages)[0] | undefined;
  category: string;
};
