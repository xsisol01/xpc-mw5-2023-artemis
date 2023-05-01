import https from "https";

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
    case "GET":
      return get(req, res);
    case "POST":
      return post(req, res);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { ids } = req.query;

  try {
    const data = await commodityApi
      .get("byListOfId", {
        params: {
          ids,
        },
      })
      .then((res) => res.data);
    res.json([...data]);
  } catch (error: any) {
    console.log(error.message);
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await commodityApi.post("", req.body).then((res) => res.data);
    return res.json(data);
  } catch (e: any) {
    console.log(e.message);
  }
}
