import  {useContext, FC, memo } from 'react'

import { RoleContext } from '@/app/providers/roleContextProvider'
import { useGetAllProduct } from '@/app/hooks/product/useGetAllProducts'
import { IProduct } from '@/app/types/product.type'

import { Grid } from '@mui/material'
import ProductItemPlaceholder from '@/app/components/ui/productItem/ProductItemCreate'
import ProductItemCreate from '@/app/components/ui/productItem/ProductItemCreate'
import ProductItem from '@/app/components/ui/productItem/ProductItem'

interface IProps {
    products?: IProduct[]
    manufacturer?: string
}

const Products: FC<IProps> = memo(({products: propsProducts, manufacturer}) => {
    const {isAdmin} = useContext(RoleContext)
    const {products: fetchProducts, isLoading} = useGetAllProduct();

    function renderProducts(products: IProduct[]) {
        return (
            <Grid container spacing={2}>
                {isAdmin && <ProductItemCreate manufacturer={manufacturer} />}
                {isLoading && <ProductItemPlaceholder />}
                {!isLoading && products?.map(product => <ProductItem key={product.id} {...product} />)}
            </Grid>
        )
    }

    return renderProducts(propsProducts ?? fetchProducts ?? [])
})

export default Products