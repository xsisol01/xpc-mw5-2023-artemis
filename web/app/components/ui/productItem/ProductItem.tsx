import Link from 'next/link'

import classNames from 'classnames'

import { IProduct } from '@/app/store/product/product.type'
import Rating from '@/app/components/shared/rating/Rating'

import styles from './productItem.module.scss'
import StockChecker from '../../shared/inStockChecker/StockChecker'

const ProductItem: React.FC<IProduct> = ({id, title, image, price, rating, count}) => {

    const isInStock = (count > 0)

    return (
        <Link href='/product/[pid]' as={`/product/${id}`} className={styles.productItem}>
            <div style={{backgroundImage: `url("${image}")`}} className={styles.productItem__image}></div>
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

            <StockChecker isInStock={isInStock} className={styles.productItem__stockChecker} />
        </Link>
        
    )
}

export default ProductItem