import classNames from "classnames";

import { IProduct } from "@/app/store/product/product.type";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { currencyFormatter } from "@/app/utils/currencyFormatter";
import Rating from "@/app/components/shared/rating/Rating";

import {productPageData} from './productPage.data'

import styles from './productInfo.module.scss'
import { count } from "console";

const ProductInfo: React.FC<IProduct> = (
    {title, price, description, category, rating, image, producer, weight, count}
    ) => {

    const isInStock = count > 0

    return (
        <div className={styles.productInfo}>
            <div
            className={styles.productInfo__image}
            style={{backgroundImage: `url("${image}")`}}
            ></div>
            <div className={styles.productInfo__text}>
                <div className={styles.productInfo__title}>
                    {title}
                </div>
                <div  className={styles.productInfo__flex}>
                    <div className={styles.productInfo__producer}>
                        {producer}
                    </div>
                    <div className={styles.productInfo__category}>
                        {category}
                    </div>
                </div>
                <div className={styles.productInfo__price}>
                    {currencyFormatter(price)}
                </div>
                <div className={styles.productInfo__rating}>
                    <Rating {...rating} />
                </div>
                <div  className={styles.productInfo__weight}>
                    {productPageData.weigth}: {weight} kg
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
}

export default ProductInfo