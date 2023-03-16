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
        getCategories: build.query<string[], number>({
            query: () => `categories`
        }),
        getProducers: build.query<string[], number>({
            query: () => `producers`
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    useGetProducersQuery
} = productApi