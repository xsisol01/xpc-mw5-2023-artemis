import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "./product.type";

const initialState: IProduct[] = []


export const cartSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        
    }
})