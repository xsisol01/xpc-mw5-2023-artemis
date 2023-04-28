import {FC, memo} from 'react'

import classNames from "classnames"

import { stockCheckerData } from "./stockChecker.data"

import styles from './stockChecker.module.scss'

type TProps = {
  isInStock: boolean
  className?: string
}

const StockChecker: FC<TProps> = memo(({isInStock, className}) => {

  return (
    <div className={classNames({
      [styles.stockChecker]: true,
      [styles.stockChecker__inStock]: isInStock,
      [styles.stockChecker__notInStock]: !isInStock,
      [className ?? '']: true
    })}>
      {isInStock ? stockCheckerData.inStock : stockCheckerData.notInStock}
    </div>
  )
})

StockChecker.displayName = 'StockChecker'

export default StockChecker