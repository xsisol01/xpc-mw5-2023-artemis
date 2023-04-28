import axios from "axios";

const instance = axios.create({
  baseURL: "/api/image",
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=<calculated when request is sent>",
    "Access-Control-Allow-Origin": "*",
  },
});

export const ImageService = {
  async create(data: FormData) {
    return instance.post("", data);
  },
};
