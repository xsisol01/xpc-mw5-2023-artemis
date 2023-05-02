import https from 'https';
import axios from "axios";

import { ICategory, ICreateCategory } from "@/app/types/category.type";

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/Category`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  })
});

export const CategoryService = {
  async getAll() {
    try {
      return instance.get<ICategory[]>("").then(res => res.data);
    } catch (error: any) {
      console.log(error.message)
    }
  },

  async get(id: string) {
    try {
      return instance.get<ICategory>(`/byId/${id}`).then(res => res.data);
    } catch (error: any) {
      console.log(error.message)
    }
  },

  async getByName(id: string) {
    try {
      return instance.get<ICategory>(`/byName/${id}`).then(res => res.data);
    } catch (error: any) {
      console.log(error.message)
    }
  },

  async create(data: ICreateCategory) {
    return axios.post("/api/category", data);
  },

  async update(data: ICategory) {
    return axios.put(`/api/category/${data.id}`, data);
  },

  async delete(id: string) {
    return axios.delete(`/api/category/${id}`);
  },
};
