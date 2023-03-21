import classNames from "classnames"
import Link from "next/link"

import {TiPlus} from 'react-icons/ti'

import styles from './productItem.module.scss'

const ProductItemPlaceholder = () => {
  
  return (
    <Link href="product/new" className={classNames({
      [styles.productItem]: true,
      [styles.productItem__placeholder]: true,
    })}>
      <TiPlus className={styles.productItem__placeholderIcon} />
    </Link>
  )
}

export default ProductItemPlaceholder