import https from "https";
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
    case "GET":
      return get(req, res);
    case "POST":
      return post(req, res);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const data = await categoryApi.get("").then((res) => res.data);
  res.json([...data]);
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const data = await categoryApi.post("", req.body).then((res) => res.data);
  return res.status(200).json(data);
}
