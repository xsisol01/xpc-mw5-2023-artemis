import {FC, memo} from 'react'

import classNames from "classnames"
import Link from "next/link"

import {TiPlus} from 'react-icons/ti'

import styles from './productItem.module.scss'

interface IProps {
  producer?: string
}

const ProductItemPlaceholder: FC<IProps> = memo(({producer}) => {
  
  const href = {
    pathname: '/product/new',
    query: {
      producer
    }
  }

  return (
    <Link href={href} className={classNames({
      [styles.productItem]: true,
      [styles.productItem__placeholder]: true,
    })}>
      <TiPlus className={styles.productItem__placeholderIcon} />
    </Link>
  )
})

export default ProductItemPlaceholder