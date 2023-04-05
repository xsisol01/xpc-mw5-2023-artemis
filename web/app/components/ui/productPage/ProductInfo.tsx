import {FC, memo} from 'react'

import classNames from "classnames";


import { capitalizeText } from "@/app/utils/capitalizeText";
import { currencyFormatter } from "@/app/utils/currencyFormatter";
import Rating from "@/app/components/shared/rating/Rating";

import {productPageData} from '../../../data/productPage.data'

import styles from './productInfo.module.scss'
import ProductInfoImages from "./productInfoImage/ProductInfoImages";
import { useGetAllManufacturers } from '@/app/hooks/manufacturer/useGetAllManufacturers';
import { useGetAllCategories } from '@/app/hooks/category/useGetAllCategories';
import { IProduct } from '@/app/types/product.type';

const ProductInfo: FC<IProduct> = memo((
    {name, price, description, category, rating, imageUrl, manufacturer, weight, stockQuantity}
    ) => {

    const { manufacturers } = useGetAllManufacturers()
    const { categories } = useGetAllCategories()

    const isInStock = stockQuantity > 0

    return (
        <div className={styles.productInfo}>
            <ProductInfoImages image={imageUrl}/>
            <div className={styles.productInfo__text}>
                <div className={styles.productInfo__title}>
                    {name}
                </div>
                <div  className={styles.productInfo__flex}>
                    <div className={styles.productInfo__manufacturer}>
                        {manufacturers?.find(p => p.id === manufacturer)?.name}
                    </div>
                    <div className={styles.productInfo__category}>
                        {categories?.find(p => p.id === category)?.name}
                    </div>
                </div>
                <div className={styles.productInfo__price}>
                    {currencyFormatter(price)}
                </div>
                <div className={styles.productInfo__rating}>
                    <Rating {...rating} />
                </div>
                <div  className={styles.productInfo__weight}>
                    {weight} kg
                </div>
                <div className={styles.productInfo__description}>
                    {capitalizeText(description)}
                </div>

                <div className={classNames({
                    [styles.productInfo__count]: true,
                    [styles.productInfo__inStock]: isInStock,
                    [styles.productInfo__notInStock]: !isInStock,
                })}>
                    {isInStock
                    ? productPageData.inStock
                    : productPageData.notInStock}
                </div>
            </div>
        </div>
    )
})

export default ProductInfo