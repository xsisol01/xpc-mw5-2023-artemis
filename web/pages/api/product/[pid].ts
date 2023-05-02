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

  try{
    const data = await commodityApi
    .get<IProduct>(`/byId/${pid}`)
    .then((res) => res.data);

  return res.json(data);
  } catch (e: any) {
    console.log(e.message)
  }
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  const {id, reviews, averageRating, ...requiredData} = req.body

  try {
    const data = await commodityApi
    .put(`/${id}`, requiredData)
    .then((res) => res.data);

    return res.json(data);
  } catch(e: any) {
    console.log(e.message)
  }
}

async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  try {
    const data = await commodityApi
    .delete(`/${pid}`)
    .then((res) => res.data);

    return res.json(data);

  } catch (e: any) {
    console.log(e.message)
  }
}
