import {FC, memo} from 'react'

import Link from 'next/link'

import classNames from 'classnames'

import Rating from '@/app/components/shared/rating/Rating'
import StockChecker from '@/app/components/shared/inStockChecker/StockChecker'
import DeleteButton from '@/app/components/shared/deleteButton/DeleteButton'

import {FaTimes} from 'react-icons/fa'



import styles from './productItem.module.scss'
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { IProduct } from '@/app/types/product.type'
import { capitalizeText } from '@/app/utils/capitalizeText'

interface IProps {
    isAdmin: boolean
}

const ProductItem: FC<IProduct & IProps> = memo(({id, title, image, price, rating, count, isAdmin}) => {
    const isInStock = (count > 0)

    return (
        <Grid item xs={12} md={3} sm={6}>
            <Card sx={{height: '100%'}}>
                <Link href='/product/[pid]' as={`/product/${id}`} className={styles.productItem}>
                    <CardMedia
                        src={image}
                        alt={title}
                        title={title}
                        sx={{height: 140}}
                        component='img'
                    />
                </Link>
                <CardContent sx={{pb: 0}}>
                    <Typography variant='body1' component='h4'>
                        {capitalizeText(title)}
                    </Typography>

                    <Typography variant='subtitle1' component='h3' sx={{fontWeight: 700}}>
                        {price?.toLocaleString('cs-CZ', {style:"currency", currency:"CZK"})}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Rating {...rating} size='small' />
                </CardActions>

                {isAdmin ? 
                (
                    <DeleteButton
                        id={id}
                        className={styles.productItem__delete}
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