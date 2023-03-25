import { IProduct } from "./product.type"

export interface IProducer {
  id: string
  name: string
  imageUrl: string
  description: string
  country: string
  products: IProduct[]
}
