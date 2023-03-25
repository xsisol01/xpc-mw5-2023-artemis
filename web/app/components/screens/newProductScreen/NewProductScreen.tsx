import {FC, memo} from 'react'

import AdminProductInfo from "@/app/components/ui/productPage/AdminProductInfo"
import { newProductData } from "./newProduct.data"
import HeaderLayout from '../../layout/headerLayout/HeaderLayout'
import Container from '../../layout/container/Container'

const NewProductScreen: FC = memo(() => {

  return (
    <HeaderLayout>
      <Container>
        <AdminProductInfo {...newProductData} />
      </Container>
    </HeaderLayout>
  ) 
})

export default NewProductScreen