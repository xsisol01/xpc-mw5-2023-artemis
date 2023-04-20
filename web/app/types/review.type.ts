export interface IProductReview {
  id: string
  stars: number
  description: string
  title: string
}

export interface ICreateProductReview {
  stars: number
  description: string
  title: string
}