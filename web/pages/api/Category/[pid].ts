import https from "https";
import { IProduct } from "@/app/types/product.type";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const categoryApi = axios.create({
  baseURL: `${process.env.apiUrl}/Category`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return put(req, res);
    case "GET":
      return get(req, res);
    case "DELETE":
      return remove(req, res);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;

  const data = await categoryApi
    .get<IProduct>(`/byId/${pid}`)
    .then((res) => res.data);

  return res.json(data);
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;

  const data = await categoryApi
    .put(`/${pid}`, req.body)
    .then((res) => res.data);

  return res.json(data);
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;

  const data = await categoryApi.delete(`/${pid}`).then((res) => res.data);

  return res.json(data);
}
