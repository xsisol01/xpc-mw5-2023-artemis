type IRating = {
    rate: number
    description: string
}

export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    producer: string,
    category: string
    weight: number
    count: number
    image: string
    rating: IRating
}
