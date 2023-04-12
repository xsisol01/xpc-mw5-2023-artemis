type IReview = {
    id: string
    stars: number
    description: string
    title: string
}

export interface IProduct {
    id: string
    averageRating: number
    reviews: IReview[]
    name: string
    imageUrl: string
    description: string
    price: number
    weight: number
    stockQuantity: number
    categoryId: string
    manufacturerId: string
}

export interface ICreateProduct {
    name: string
    imageUrl: string
    description: string
    price: number 
    manufacturerId: string
    categoryId: string
    weight: number 
    stockQuantity: number
}

export interface IProductField {
    type: string
    name: 'name' | 'manufacturerId' | 'categoryId' | 'price' | 'weight' | 'stockQuantity' | 'description'
    xs: number
    md: number
    required: boolean
    rows: number,
    validation: RegExp
  }