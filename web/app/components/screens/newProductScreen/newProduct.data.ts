import { ICreateProduct } from '@/app/types/product.type';


export const newProductData: ICreateProduct = Object.freeze({
  name: '',
  price: 0,
  description: '',
  manufacturer: '',
  category: '',
  weight: 0,
  stockQuantity: 0,
  imageUrl: '',
})