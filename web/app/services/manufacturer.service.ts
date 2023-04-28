import axios from "axios";
import https from "https";

import {
  IManufacturer,
  ICreateManufacturer,
} from "@/app/types/manufacturer.type";

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const instance = axios.create({
  baseURL: `${process.env.apiUrl}/Manufacturer`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const ManufacturerService = {
  async getAll() {
    return instance.get<IManufacturer[]>("").then(res => res.data);
  },

  async get(id: string) {
    return instance.get<IManufacturer>(`/byId/${id}`).then(res => res.data);
  },

  async getByName(name: string) {
    return instance.get<IManufacturer>(`/byName/${name}`).then(res => res.data);
  },

  async create(data: ICreateManufacturer) {
    return instance.post("/api/manufacturer", data);
  },

  async update(data: IManufacturer) {
    return instance.put(`/api/manufacturer/${data.id}`, data);
  },

  async delete(id: string) {
    return instance.delete(`/api/manufacturer/${id}`);
  },
};
