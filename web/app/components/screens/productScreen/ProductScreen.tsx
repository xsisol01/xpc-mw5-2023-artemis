import {FC, memo, useContext} from 'react'

import { useRouter } from 'next/router'

import { RoleContext } from '@/app/providers/roleContextProvider'

import HeaderLayout from '@/app/components/layout/headerLayout/HeaderLayout'
import { useGetProduct } from '@/app/hooks/product/useGetProduct'
import AdminProductInfo from '../../ui/productPage/AdminProductInfo'
import ProductInfo from '../../ui/productPage/ProductInfo'
import { Container } from '@mui/system'
import { CircularProgress } from '@mui/material'

const ProductScreen: FC = memo(() => {
    const {query, push} = useRouter()
    const {isAdmin} = useContext(RoleContext)

    const {product, isLoading, } = useGetProduct(String(query.pid))

    if (isLoading) {
        return  <CircularProgress />
    }

    if (!product) {
        push("/404")

        return (
            <HeaderLayout>
                <div>Not Found</div>
            </HeaderLayout>
        )
    }

    return (
        <HeaderLayout >
            <Container>
                {isAdmin ? (
                    <AdminProductInfo {...product} />
                ) : (
                    <ProductInfo {...product} />
                )}
            </Container>
        </HeaderLayout>
    )
})

export default ProductScreen