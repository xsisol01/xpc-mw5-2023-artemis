import { IProduct } from "./product.type"

export interface IManufacturer{
  id: string
  name: string
  imageUrl: string
  description: string
  country: string
  products: IProduct[]
}

export interface IManufacturerField {
  name: 'name' | 'country' | 'description'
  xs: number
  md: number
  type: 'text' | 'select'
  required: boolean
  rows: number
}

export interface ICreateManufacturer {
  name: string
  imageUrl: string
  description: string
  country: string
}