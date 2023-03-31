import {FC, memo, useContext} from 'react'

import { useRouter } from 'next/router'


import HeaderLayout from '@/app/components/layout/headerLayout/HeaderLayout'
import Preloader from '@/app/components/shared/preloader/Preloader'
import ProductPage from '@/app/components/ui/productPage/ProductPage'
import { useGetProduct } from '@/app/hooks/product/useGetProduct'

const ProductScreen: FC = memo(() => {
    const {query, push} = useRouter()

    const {product, isLoading, } = useGetProduct(String(query.pid))

    if (isLoading) {
        return  <Preloader />
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
            <ProductPage {...product} />
        </HeaderLayout>
    )
})

export default ProductScreen