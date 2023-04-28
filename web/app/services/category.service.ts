import axios from "axios";

import { ICategory, ICreateCategory } from "@/app/types/category.type";

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/Category`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const CategoryService = {
  async getAll() {
    return instance.get<ICategory[]>("").then(res => res.data);
  },

  async get(id: string) {
    return instance.get<ICategory>(`/byId/${id}`).then(res => res.data);
  },

  async getByName(id: string) {
    return instance.get<ICategory>(`/byName/${id}`).then(res => res.data);
  },

  async create(data: ICreateCategory) {
    return instance.post("/api/category", data);
  },

  async update(data: ICategory) {
    return instance.put(`/api/category/${data.id}`, data);
  },

  async delete(id: string) {
    return instance.delete(`/api/category/${id}`);
  },
};
