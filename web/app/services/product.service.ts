import { ICreateProduct } from "@/app/types/product.type";
import axios from "axios";
import https from "https";

import { IProduct } from "@/app/types/product.type";

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/Commodity`,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export const ProductService = {
  async getAll() {
    return instance.get<IProduct[]>("").then((res) => res.data);
  },

  async get(id: string) {
    return instance.get<IProduct>(`/byId/${id}`).then((res) => res.data);
  },

  async getByName(name: string) {
    return instance.get<IProduct>(`/byName/${name}`).then((res) => res.data);
  },

  async create(data: ICreateProduct) {
    const result = axios.post("/api/product", data);
    console.log("ProductService.create", await result);

    return result;
  },

  async update(data: IProduct) {
    const result = instance.put(`/api/product/${data.id}`, data);
    console.log("ProductService.update", await result);

    return result;
  },

  async delete(id: string) {
    const result = instance.delete(`/api/product/${id}`);

    console.log("ProductService.delete", await result);

    return result;
  },
};
