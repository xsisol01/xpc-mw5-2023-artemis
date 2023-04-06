import axios from 'axios';

import { IManufacturer, ICreateManufacturer } from '@/app/types/manufacturer.type';

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/manufacturers`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const ManufacturerService = {

  async getAll() {
    return instance.get<IManufacturer[]>('')
  },
  
  async get(id: string) {
    return instance.get<IManufacturer>(`/${id}`)
  },

  async create(data: ICreateManufacturer) {
    instance.post('', data)
  },

  async update(data: IManufacturer) {
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