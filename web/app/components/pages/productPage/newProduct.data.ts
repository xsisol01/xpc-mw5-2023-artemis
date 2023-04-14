import { ICreateProduct } from '@/app/types/product.type';


export const newProductData: ICreateProduct = Object.freeze({
  name: '',
  price: 0,
  description: '',
  manufacturerId: '',
  categoryId: '',
  weight: 0,
  stockQuantity: 0,
  imageUrl: '',
  reviews: []
})