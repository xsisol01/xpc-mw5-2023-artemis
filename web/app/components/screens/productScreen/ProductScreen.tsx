import {FC, memo} from 'react'

import { useGetProductQuery } from '@/app/store/product/product.api'
import { useRouter } from 'next/router'
import HeaderLayout from '@/app/components/layout/headerLayout/HeaderLayout'
import Preloader from '@/app/components/shared/preloader/Preloader'
import ProductPage from '@/app/components/ui/productPage/ProductPage'

const ProductScreen: FC = memo(() => {

    const router = useRouter()
    const { pid } = router.query

    if (!pid) return <Preloader />

    const {data, isLoading, error} = useGetProductQuery(Number(pid))

    if (isLoading) {
        return  <Preloader />
    }

    if (!data) {
        router.push("/404")

        return null
    }

    return (
        <HeaderLayout>
            <ProductPage {...data} />
        </HeaderLayout>
    )
})

export default ProductScreen