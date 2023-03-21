import { ICreateProduct } from '@/app/store/product/product.type';

export const newProductData: ICreateProduct = Object.freeze({
  title: '',
  price: 0,
  description: '',
  producer: '',
  category: '',
  weight: 0,
  count: 0,
  image: '',
})