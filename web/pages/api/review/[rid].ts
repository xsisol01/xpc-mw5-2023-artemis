import https from 'https';
import { IProduct } from '@/app/types/product.type';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


const reviewApi = axios.create({
  baseURL: `${process.env.apiUrl}/Review`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  }
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT": 
      return put(req, res)
    case "GET": 
      return get(req, res)
    case "DELETE": 
      return remove(req, res)
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { rid } = req.query;

  const data = await reviewApi
    .get<IProduct>(`/byId/${rid}`)
    .then((res) => res.data);

  return res.json(data);
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  const {rid} = req.query

  const data = await reviewApi.put(
    `/${rid}`,
    req.body
    ).then(res => res.data)

  return res.json(data)
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const {rid} = req.query

  const data = await reviewApi.delete(
    `/${rid}`
    ).then(res => res.data)

  return res.json(data)
}