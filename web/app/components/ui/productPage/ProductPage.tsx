import { useContext } from 'react'

import { RoleContext } from '@/app/providers/roleContextProvider'

import { IProduct } from '@/app/store/product/product.type'

import Container from '@/app/components/layout/container/Container'
import AdminProductInfo from './AdminProductInfo'
import ProductInfo from './ProductInfo'

const ProductPage: React.FC<IProduct> = (props) => {
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
}

export default ProductPage