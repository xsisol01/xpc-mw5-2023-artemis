import https from "https";

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const imageApi = axios.create({
  baseURL: `${process.env.CLOUD_API}`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=<calculated when request is sent>",
    "Access-Control-Allow-Origin": "*",
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return post(req, res);
    default:
      return;
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  console.log(
    "api/image ---------------------------------------------------------------------------",
    req.body
  );
  const data = await imageApi.post("", req.body);
  res.json(data);
}
