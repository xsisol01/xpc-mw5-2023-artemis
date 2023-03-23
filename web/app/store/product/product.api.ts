import { IProducer } from '@/app/store/product/producer.type';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IProduct } from './product.type'

export const productApi = createApi({
    reducerPath: 'api/products',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
    endpoints: build => ({
        getProducts: build.query<IProduct[], number>({
            query: (limit = 12) => `products?limit=${limit}`
        }),
        getProduct: build.query<IProduct, number>({
            query: (productId: number) => `products/${productId}`
        }),
        getCategories: build.query<string[], null>({
            query: () => `categories`
        }),
        getProducers: build.query<IProducer[], null>({
            query: () => `producers`
        }),
        getProducer: build.query<IProducer, string>({
            query: (producerId: string) => `producers/${producerId}`
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    useGetProducersQuery,
    useGetProducerQuery
} = productApi