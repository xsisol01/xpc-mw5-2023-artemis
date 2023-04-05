import  {useContext, FC, memo } from 'react'


import ProductItem from '@/app/components/ui/productItem/ProductItem'

import styles from './products.module.scss'
import { RoleContext } from '@/app/providers/roleContextProvider'
import ProductItemPlaceholder from '../productItem/ProductItemPlaceholeder'
import { useGetAllProduct } from '@/app/hooks/product/useGetAllProducts'
import { CircularProgress, Grid } from '@mui/material'
import { IProduct } from '@/app/types/product.type'

interface IProps {
    products?: IProduct[]
    manufacturer?: string
}

const Products: FC<IProps> = memo(({products: propsProducts, manufacturer}) => {
    const {isAdmin} = useContext(RoleContext)

    if (propsProducts) {
        return renderProducts(propsProducts)
    }

    const {products: fetchProducts, isLoading} = useGetAllProduct();

    return isLoading || !fetchProducts
        ? <CircularProgress />
        : renderProducts(fetchProducts)


    function renderProducts(products: IProduct[]) {
        return (
            <Grid container spacing={2}>
                {isAdmin && <ProductItemPlaceholder manufacturer={manufacturer} />}
                {products?.map(product => <ProductItem key={product.id} {...product} />)}
            </Grid>
        )
    }
})

export default Products