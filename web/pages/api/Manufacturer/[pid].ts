import https from "https";
import { IProduct } from "@/app/types/product.type";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const manufacturerApi = axios.create({
  baseURL: `${process.env.apiUrl}/Manufacturer`,
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
  try {
    const data = await manufacturerApi
      .get<IProduct>(`/byId/${pid}`)
      .then((res) => res.data);

    return res.json(data);
  } catch (error: any) {
    console.log(error.message);
  }
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;

  try {
    const data = await manufacturerApi
      .put(`/${pid}`, req.body)
      .then((res) => res.data);

    return res.json(data);
  } catch (error: any) {
    console.log(error.message);
  }
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;

  try {
    const data = await manufacturerApi
      .delete(`/${pid}`)
      .then((res) => res.data);

    return res.json(data);
  } catch (error: any) {
    console.log(error.message);
  }
}
