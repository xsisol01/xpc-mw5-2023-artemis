import axios from 'axios';

import { IManufacturer } from '@/app/types/manufacturer.type';

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/manufacturers`,
  headers: {
    'Content-Type': 'application-json'
  }
})

export const ManufacturerService = {

  async getAll() {
    return instance.get<IManufacturer[]>('')
  },
  
  async get(id: string) {
    return instance.get<IManufacturer>(`/${id}`)
  },

  async create(data: IManufacturer) {
    instance.put('', data)
  },

  async update(data: IManufacturer) {
    instance.post(`/${data.id}`, data)
  },

  async delete(id: string) {
    instance.delete(`/${id}`)
  }
}