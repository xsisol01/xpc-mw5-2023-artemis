import {FC, memo, useContext} from 'react'

import Link from 'next/link'

import Rating from '@/app/components/shared/rating/Rating'
import StockChecker from '@/app/components/shared/inStockChecker/StockChecker'
import DeleteButton from '@/app/components/shared/button/deleteButton/DeleteButton'

import {FaTimes} from 'react-icons/fa'

import styles from './productItem.module.scss'
import { Card, CardActions, CardContent, CardMedia, Grid, Skeleton, Typography } from '@mui/material'
import { IProduct } from '@/app/types/product.type'
import { capitalizeText } from '@/app/utils/capitalizeText'
import { RoleContext } from '@/app/providers/roleContextProvider'
import ImagePlaceholder from '../../shared/placeholder/ImagePlaceholder'


const ProductItem: FC<IProduct> = memo(({id, name, imageUrl, price, averageRating, stockQuantity}) => {
    const {isAdmin} = useContext(RoleContext)
    const isInStock = (stockQuantity > 0)

    return (
        <Grid item xs={12} md={3} sm={6}>
            <Card sx={{height: '100%', position: 'relative'}}>
                <Link href='/product/[pid]' as={`/product/${id}`} className={styles.productItem}>
                    {imageUrl.length
                        ? (
                            <CardMedia
                                src={imageUrl}
                                alt={name}
                                title={name}
                                sx={{height: 140}}
                                component='img'
                            />
                        ) : (
                            <ImagePlaceholder
                                alt={name}
                                height={140}
                            />
                        )
                    }
                </Link>
                <CardContent sx={{pb: 0}}>
                    <Typography variant='body1' component='h4'>
                        {capitalizeText(name)}
                    </Typography>

                    <Typography variant='subtitle1' component='h3' sx={{fontWeight: 700}}>
                        {price?.toLocaleString('cs-CZ', {style:"currency", currency:"CZK"})}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Rating rate={averageRating} size='small' />
                </CardActions>

                {isAdmin ? 
                (
                    <DeleteButton
                        id={id}
                        style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px'
                        }}
                        elementType='product'
                    >
                        <FaTimes className={styles.productItem__deleteIcon} />
                    </DeleteButton>
                ) : (
                    <StockChecker isInStock={isInStock} className={styles.productItem__stockChecker} />
                )}
            </Card>
        </Grid>
        
        
    )
})

export default ProductItem