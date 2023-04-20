import { ICategory } from '@/app/types/category.type';
import https from "https";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const reviewApi = axios.create({
  baseURL: `${process.env.apiUrl}/Review/byCommodityId`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case "GET": 
      return get(req, res)
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;

  const data = await reviewApi
    .get<ICategory>(`${pid}`)
    .then((res) => res.data);

  return res.json(data);
}
