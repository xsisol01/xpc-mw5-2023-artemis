import https from 'https';
import axios from "axios";
import { IProductReview } from "../types/review.type";

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

export const ReviewService = {
  async create(data: IProductReview) {
    return axios.post("/api/review", data);
  },

  async delete(id: string) {
    return instance.delete(`/api/review/${id}`);
  },
};
