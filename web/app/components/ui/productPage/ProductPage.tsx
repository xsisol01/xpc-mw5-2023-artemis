import { useContext, FC, memo } from 'react'

import { RoleContext } from '@/app/providers/roleContextProvider'

import Container from '@/app/components/layout/container/Container'
import AdminProductInfo from './AdminProductInfo'
import ProductInfo from './ProductInfo'
import { IProduct } from '@/app/types/product.type'

const ProductPage: FC<IProduct> = memo((props) => {
    const {isAdmin} = useContext(RoleContext)

    return (
        <Container>
            {isAdmin ? (
                <AdminProductInfo {...props} />
            ) : (
                <ProductInfo {...props} />
            )}
        </Container>
    )
})

export default ProductPage