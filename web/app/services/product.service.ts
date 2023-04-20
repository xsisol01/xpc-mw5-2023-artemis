import { ICreateProduct } from "@/app/types/product.type";
import axios from 'axios';
import https from 'https';

import { IProduct } from "@/app/types/product.type";

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

const instance = axios.create({
  baseURL: '/api/product',
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  }
});


export const ProductService = {
  async getAll() {
    const result = instance.get<IProduct[]>('')
    console.log('ProductService.getAll', await result)
    
    return result
  },

  async get(id: string) {

    const result = instance.get<IProduct[]>(`/${id}`);
    console.log('ProductService.get', await result)
    
    return result
  },

  async getByName(name: string) {
    const result = instance.get<IProduct>(`/byName/${name}`);
    console.log('ProductService.getByName', await result)
    
    return result
  },

  async create(data: ICreateProduct) {
    const result = instance.post("", data);
    console.log('ProductService.create', await result)
    
    return result
  },

  async update(data: IProduct) {
    
    const result = instance.put(`/${data.id}`, data);
    console.log('ProductService.update', await result)
    
    return result
  },

  async delete(id: string) {
    const result = instance.delete(`${id}`);

    console.log('ProductService.delete', await result)
    
    return result
  },
};
