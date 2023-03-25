import {FC, memo} from 'react'

import Link from 'next/link'

import classNames from 'classnames'

import { IProduct } from '@/app/store/product/product.type'
import Rating from '@/app/components/shared/rating/Rating'
import StockChecker from '@/app/components/shared/inStockChecker/StockChecker'
import DeleteButton from '@/app/components/shared/deleteButton/DeleteButton'

import {FaTimes} from 'react-icons/fa'



import styles from './productItem.module.scss'
import Image from '../../shared/image/Image'

interface IProps {
    isAdmin: boolean
}

const ProductItem: FC<IProduct & IProps> = memo(({id, title, image, price, rating, count, isAdmin}) => {
    const isInStock = (count > 0)

    return (
        <Link href='/product/[pid]' as={`/product/${id}`} className={styles.productItem}>
            <Image  
                className={styles.productItem__image}
                size='cover'
                src={image}
            />
            <div className={classNames({
                [styles.productItem__info]: true,
                [styles.info]: true
            })}>
                <div className={styles.productItem__title}>
                    {title}
                </div>
                <div className={styles.info__additional}>
                    <div className={styles.productItem__price}>
                        {price.toLocaleString('cs-CZ', {style:"currency", currency:"CZK"})}
                    </div>
                    <div className={classNames({
                        [styles.productItem__rating]: true,
                        [styles.rating]: true
                    })}>
                        <Rating rate={rating.rate} size='small' />
                    </div>
                </div>
            </div>

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

        </Link>
        
    )
})

export default ProductItem