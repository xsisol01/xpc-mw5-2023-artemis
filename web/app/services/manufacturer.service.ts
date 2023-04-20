import axios from 'axios';
import https from 'https'

import { IManufacturer, ICreateManufacturer } from '@/app/types/manufacturer.type';

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
})

export const ManufacturerService = {

  async getAll() {
    return instance.get<IManufacturer[]>('/api/Manufacturer')
  },
  
  async get(id: string) {
    return instance.get<IManufacturer>(`/api/Manufacturer/${id}`)
  },

  async create(data: ICreateManufacturer) {
    instance.post('/api/Manufacturer', data)
  },

  async update(data: IManufacturer) {
    try{
      instance.put(`/api/Manufacturer/${data.id}`, {...data})
    } catch (error: any) {
      console.error(error.message)
    }
  },

  async delete(id: string) {
    instance.delete(`/api/Manufacturer/${id}`)
  }
}