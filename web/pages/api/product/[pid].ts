import https from "https";
import { IProduct } from "@/app/types/product.type";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const commodityApi = axios.create({
  baseURL: `${process.env.apiUrl}/Commodity`,
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
      return deleteProduct(req, res);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;

  const data = await commodityApi
    .get<IProduct>(`/byId/${pid}`)
    .then((res) => res.data);

  return res.json(data);
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;

  const data = await axios
    .put(`https://localhost:7242/api/Commodity/${pid}`, req.body)
    .then((res) => res.data);

  return res.json(data);
}

async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;

  const data = await axios
    .delete(`https://localhost:7242/api/Commodity/${pid}`)
    .then((res) => res.data);

  return res.json(data);
}
