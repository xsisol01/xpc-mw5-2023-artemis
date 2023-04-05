import { ICreateProduct } from '@/app/types/product.type';


export const newProductData: ICreateProduct = Object.freeze({
  name: '',
  price: null,
  description: '',
  manufacturer: '',
  category: '',
  weight: null,
  stockQuantity: null,
  imageUrl: '',
})