import { useGetAllProducts } from '@/app/hooks/product/useGetAllProducts';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req', req)
  const {method, url} = req

  switch (method) {
    case "GET":
      return get(req, res)
    case "POST":
      return post(req, res)
  }

}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const data = await axios.get('https://localhost:7242/api/Manufacturer').then(res => [...res.data])
  res.status(200).json([...data])
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const data = await axios.post('https://localhost:7242/api/Manufacturer', req.body)

  console.log('POST', await data)
}