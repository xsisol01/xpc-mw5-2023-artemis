import { ICreateProduct } from "@/app/types/product.type";
import axios from "axios";
import https from "https";

import { IProduct } from "@/app/types/product.type";

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/Commodity`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export const ProductService = {
  async getAll() {
    try {
      return instance.get<IProduct[]>("").then((res) => res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  },

  async get(id: string) {
    try {
      return instance.get<IProduct>(`/byId/${id}`).then((res) => res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  },

  async create(data: ICreateProduct) {
    return axios.post("/api/product", data);
  },

  async update(data: IProduct) {
    return axios.put(`/api/product/${data.id}`, data);
  },

  async delete(id: string) {
    return axios.delete(`/api/product/${id}`);
  },
};
