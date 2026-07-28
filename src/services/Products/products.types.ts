export interface Products {
  products: Product[];
}

export interface Product {
  id: string;
  title: string;
  category: string;
  brand: string;
  seller: string;
  delivery: string;
  installment: string;
  tags: string[];
  inStock: boolean;
  createdAt: string;
  description: string;
  dimensions: Dimensions;
  variants: Variant[];
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Variant {
  variantId: string;
  productId: string;
  color: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  images: string[];
}
