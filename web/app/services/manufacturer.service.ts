import axios from 'axios';
import https from 'https'

import { IManufacturer, ICreateManufacturer } from '@/app/types/manufacturer.type';

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

const instance = axios.create({
  baseURL: '/api/manufacturer',
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
})

export const ManufacturerService = {
  async getAll() {
    return instance.get<IManufacturer[]>('')
  },
  
  async get(id: string) {
    return instance.get<IManufacturer>(`/${id}`)
  },

  async getByName(name: string) {
    return instance.get<IManufacturer>(`/byName/${name}`)
  },

  async create(data: ICreateManufacturer) {
    return instance.post('', data)
  },

  async update(data: IManufacturer) {
    return instance.put(`/${data.id}`, data)
  },
  
  async delete(id: string) {
    return instance.delete(`/${id}`)
  }
}