import {FC, memo} from 'react'

import AdminProductInfo from "@/app/components/ui/productPage/AdminProductInfo"
import { newProductData } from "./newProduct.data"

const NewProductScreen: FC = memo(() => {

  return <AdminProductInfo {...newProductData} />
})

export default NewProductScreen