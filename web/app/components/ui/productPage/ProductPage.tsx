import { useContext } from 'react'

import { Container, IProduct, ProductInfo, RoleContext } from '@/app/config/globalExport'

import styles from './productPage.module.scss'
import AdminProductInfo from './AdminProductInfo'

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