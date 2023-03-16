import { useContext } from 'react'



import styles from './productPage.module.scss'
import AdminProductInfo from './AdminProductInfo'
import { IProduct } from '@/app/store/product/product.type'
import { RoleContext } from '@/app/providers/roleContextProvider'
import Container from '../../layout/container/Container'
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