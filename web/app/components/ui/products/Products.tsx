import  {useState } from 'react'

import { LoadMoreButton, Product, Preloader, useGetProductsQuery } from '@/app/config/globalExport'

import { productsData } from './products.data'

import styles from './products.module.scss'

const Products: React.FC = () => {
    const [productCount, setProductCount] = useState<number>(productsData.loadingProductCount)
    const {data: products, isLoading, error} = useGetProductsQuery(productCount);

    return isLoading 
        ? <Preloader />
        : (
            <div  className={styles.products}>
                <div className={styles.products__items}>
                    {products?.map(product => <Product key={product.id} {...product} />)}
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