import https from 'https';
import axios from "axios";

const instance = axios.create({
  baseURL: "/api/image",
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=<calculated when request is sent>",
    "Access-Control-Allow-Origin": "*",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const ImageService = {
  async create(data: FormData) {
    return instance.post("", data);
  },
};
