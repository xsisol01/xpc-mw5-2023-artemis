import  {useContext, FC, memo } from 'react'

import Preloader from '@/app/components/shared/preloader/Preloader'
import ProductItem from '@/app/components/ui/productItem/ProductItem'

import styles from './products.module.scss'
import { RoleContext } from '@/app/providers/roleContextProvider'
import ProductItemPlaceholder from '../productItem/ProductItemPlaceholeder'
import { IProduct } from '@/app/store/product/product.type'
import { useGetAllProduct } from '@/app/hooks/product/useGetAllProducts'

interface IProps {
    products?: IProduct[]
    producer?: string
}

const Products: FC<IProps> = memo(({products: propsProducts, producer}) => {
    const {isAdmin} = useContext(RoleContext)

    if (propsProducts) {
        return renderProducts(propsProducts)
    }

    const {products: fetchProducts, isLoading} = useGetAllProduct();

    return isLoading || !fetchProducts
        ? <Preloader />
        : renderProducts(fetchProducts)


    function renderProducts(products: IProduct[]) {
        return (
            <div  className={styles.products}>
                <div className={styles.products__items}>
                    {isAdmin && <ProductItemPlaceholder producer={producer} />}
                    {products?.map(product => <ProductItem key={product.id} {...product} isAdmin={isAdmin} />)}
                </div>
            </div>
        )
    }
})

export default Products