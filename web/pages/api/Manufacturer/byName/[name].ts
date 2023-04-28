import { IManufacturer } from "@/app/types/manufacturer.type";
import https from "https";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const manufacturerApi = axios.create({
  baseURL: `${process.env.apiUrl}/Manufacturer/byName`,
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
    case "GET":
      return get(req, res);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  const data = await manufacturerApi
    .get<IManufacturer>(`${name}`)
    .then((res) => res.data);

  return res.json(data);
}
