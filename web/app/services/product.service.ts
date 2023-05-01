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
    return instance.get<IProduct[]>("").then((res) => res.data);
  },

  async get(id: string) {
    return instance.get<IProduct>(`/byId/${id}`).then((res) => res.data);
  },

  async getByName(name: string) {
    return instance.get<IProduct>(`/byName/${name}`).then((res) => res.data);
  },

  async getByIds(ids: string[]) {
    const idsString = ids.join('&ids=')
    return instance.get<IProduct[]>(`/byListOfId?ids=${idsString}`).then((res) => res.data);
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
