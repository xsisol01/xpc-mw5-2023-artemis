type IRating = {
    rate: number
    description: string
}

export interface IProduct {
    id: number
    name: string
    imageUrl: string
    description: string
    price: number
    manufacturer: string
    category: string
    weight: number
    stockQuantity: number
    rating: IRating
}


export interface ICreateProduct {
    name: string
    imageUrl: string
    description: string
    price: number 
    manufacturer: string
    category: string
    weight: number 
    stockQuantity: number
}

export interface IProductField {
    type: string
    name: 'name' | 'manufacturer' | 'category' | 'price' | 'weight' | 'stockQuantity' | 'description'
    xs: number
    md: number
    required: boolean
    rows: number
  }