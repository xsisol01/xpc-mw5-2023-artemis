import { IProduct, currencyFormatter, Rating, capitalizeText } from "@/app/config/globalExport";
import { useContext } from "react";

import styles from './productInfo.module.scss'

const ProductInfo: React.FC<IProduct> = ({title, price, description, category, rating, image}) => {

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
                <div className={styles.productInfo__category}>
                    {category}
                </div>
                <div className={styles.productInfo__price}>
                    {currencyFormatter(price)}
                </div>
                <div className={styles.productInfo__rating}>
                    <Rating {...rating} />
                </div>
                <div className={styles.productInfo__description}>
                    {capitalizeText(description)}
                </div>
            </div>
        </div>
    )
}

export default ProductInfo