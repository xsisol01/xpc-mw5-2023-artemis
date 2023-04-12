import  {useContext, FC, memo } from 'react'

import { RoleContext } from '@/app/providers/roleContextProvider'
import { useGetAllProduct } from '@/app/hooks/product/useGetAllProducts'
import { IProduct } from '@/app/types/product.type'

import { Grid, Typography } from '@mui/material'
import ProductItemPlaceholder from '@/app/components/ui/productItem/ProductItemCreate'
import ProductItemCreate from '@/app/components/ui/productItem/ProductItemCreate'
import ProductItem from '@/app/components/ui/productItem/ProductItem'
import { productsData } from './products.data'

interface IProps {
    products?: IProduct[]
    manufacturer?: string
    isLoading?: boolean
}

const Products: FC<IProps> = memo(({products, manufacturer, isLoading}) => {
    const {isAdmin} = useContext(RoleContext)

    return (
        <>
        {!products?.length && (
            <Typography variant='h4' sx={{textAlign: 'center', mb: 1}}>
                {productsData.empty}
            </Typography>
        )}
        <Grid container spacing={2}>
            
            
            {isAdmin && <ProductItemCreate manufacturer={manufacturer} />}
            {isLoading && <ProductItemPlaceholder />}
            {!isLoading && products?.map(product => <ProductItem key={product.id} {...product} />)}
        </Grid>
        </>
        
    )


})

export default Products