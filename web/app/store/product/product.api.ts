import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IProduct } from './product.type'

export const productApi = createApi({
    reducerPath: 'api/products',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
    endpoints: build => ({
        getProducts: build.query<IProduct[], number>({
            query: (limit = 12) => `products?limit=${limit}`
        }),
        getProduct: build.query<IProduct, number>({
            query: (productId: number) => `products/${productId}`
        }),
        getCategories: build.query<String[], number>({
            query: () => `products/categories`
        }),
    })
})

export const { useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery } = productApi