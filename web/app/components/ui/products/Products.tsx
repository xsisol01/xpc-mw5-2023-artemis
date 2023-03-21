import  {useContext, useState } from 'react'

import { useGetProductsQuery } from '@/app/store/product/product.api'

import Preloader from '@/app/components/shared/preloader/Preloader'
import LoadMoreButton from '@/app/components/ui/loadMoreButton/LoadMoreButton'
import ProductItem from '@/app/components/ui/productItem/ProductItem'

import { productsData } from './products.data'

import styles from './products.module.scss'
import { RoleContext } from '@/app/providers/roleContextProvider'
import ProductItemPlaceholder from '../productItem/ProductItemPlaceholeder'

const Products: React.FC = () => {
    const {isAdmin} = useContext(RoleContext)

    const [productCount, setProductCount] = useState<number>(productsData.loadingProductCount)
    const {data: products, isLoading, error} = useGetProductsQuery(productCount);

    return isLoading 
        ? <Preloader />
        : (
            <div  className={styles.products}>
                <div className={styles.products__items}>
                    {isAdmin && <ProductItemPlaceholder />}
                    {products?.map(product => <ProductItem key={product.id} {...product} />)}
                </div>
                <div className={styles.products__more}>
                    <LoadMoreButton onClick={loadMore} />
                </div>
            </div>
        )

    function loadMore() {
        setProductCount(prev => prev + productsData.loadingProductCount);
    }
}

export default Products