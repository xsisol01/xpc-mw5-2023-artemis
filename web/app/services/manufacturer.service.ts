import axios from "axios";
import https from "https";

import {
  IManufacturer,
  ICreateManufacturer,
} from "@/app/types/manufacturer.type";



const instance = axios.create({
  baseURL: `${process.env.apiUrl}/Manufacturer`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export const ManufacturerService = {
  async getAll() {
    try {
      return instance.get<IManufacturer[]>("").then(res => res.data);
    } catch (error: any) {
      console.log(error.message)
    }
  },

  async get(id: string) {
    try {
      return instance.get<IManufacturer>(`/byId/${id}`).then(res => res.data);
    } catch (error: any) {
      console.log(error.message)
    }
  },

  async getByName(name: string) {
    try {
      return instance.get<IManufacturer>(`/byName/${name}`).then(res => res.data);
    } catch (error: any) {
      console.log(error.message)
    }
  },

  async create(data: ICreateManufacturer) {
    return axios.post("/api/manufacturer", data);
  },

  async update(data: IManufacturer) {
    return axios.put(`/api/manufacturer/${data.id}`, data);
  },

  async delete(id: string) {
    return axios.delete(`/api/manufacturer/${id}`);
  },
};
