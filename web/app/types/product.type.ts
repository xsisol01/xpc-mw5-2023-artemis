import { IProductReview } from "./review.type";

export interface IProduct {
  id: string;
  averageRating: number;
  reviews: IProductReview[];
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  weight: number;
  stockQuantity: number;
  categoryId: string;
  manufacturerId: string;
}

export interface ICreateProduct {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  manufacturerId: string;
  categoryId: string;
  weight: number;
  stockQuantity: number;
}

export interface IProductField {
  type: string;
  name:
    | "name"
    | "manufacturerId"
    | "categoryId"
    | "price"
    | "weight"
    | "stockQuantity"
    | "description";
  xs: number;
  md: number;
  required: boolean;
  rows: number;
  validation: RegExp;
  placeholder?: string;
}
