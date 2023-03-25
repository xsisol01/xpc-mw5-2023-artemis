import axios from 'axios';

import { IProduct } from '@/app/types/product.type';

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/products`,
  headers: {
    'Content-Type': 'application-json'
  }
})

export const ProductService = {

  async getAll() {
    return instance.get<IProduct[]>('')
  },
  
  async get(id: string) {
    return instance.get<IProduct>(`/${id}`)
  },

  async create(data: IProduct) {
    instance.put('', data)
  },

  async update(data: IProduct) {
    instance.post(`/${data.id}`, data)
  }
}