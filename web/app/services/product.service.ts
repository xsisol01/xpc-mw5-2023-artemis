import { ICreateProduct } from '@/app/types/product.type';
import axios from 'axios';

import { IProduct } from '@/app/types/product.type';

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/products`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const ProductService = {

  async getAll() {
    return instance.get<IProduct[]>('')
  },
  
  async get(id: string) {
    return instance.get<IProduct>(`/${id}`)
  },

  async create(data: ICreateProduct) {
    instance.post('', data)
  },

  async update(data: IProduct) {
    try{
      instance.put(`/${data.id}`, {...data})
    } catch (error: any) {
      console.error(error.message)
    }
  },

  async delete(id: string) {
    instance.delete(`/${id}`)
  }
}