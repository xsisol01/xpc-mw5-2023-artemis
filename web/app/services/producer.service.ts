import axios from 'axios';

import { IProducer } from '@/app/types/producer.type';

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/producers`,
  headers: {
    'Content-Type': 'application-json'
  }
})

export const ProducerService = {

  async getAll() {
    return instance.get<IProducer[]>('')
  },
  
  async get(id: string) {
    return instance.get<IProducer>(`/${id}`)
  },

  async create(data: IProducer) {
    instance.put('', data)
  },

  async update(data: IProducer) {
    instance.post(`/${data.id}`, data)
  }
}