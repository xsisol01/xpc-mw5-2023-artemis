import axios from 'axios';
import https from 'https'

import { ICategory, ICreateCategory } from '@/app/types/category.type';

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false
})


const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
})

export const CategoryService = {

  async getAll() {
    return instance.get<ICategory[]>('/api/Category')
  },
  
  async get(id: string) {
    return instance.get<ICategory>(`/api/Category/${id}`)
  },

  async create(data: ICreateCategory) {
    instance.post('/api/Category', data)
  },

  async update(data: ICategory) {
    instance.put(`/api/Category/${data.id}`, data)
  },

  async delete(id: string) {
    instance.delete(`/api/Category/${id}`)
  }
}