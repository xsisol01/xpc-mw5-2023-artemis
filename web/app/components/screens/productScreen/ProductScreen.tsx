import { useRouter } from 'next/router'

import { Preloader, ProductPage, HeaderLayout } from '@/app/config/globalExport';

import { useGetProductQuery } from '@/app/config/globalExport';

const ProductScreen: React.FC = () => {

    const router = useRouter()
    const { pid } = router.query

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

}

export default ProductScreen