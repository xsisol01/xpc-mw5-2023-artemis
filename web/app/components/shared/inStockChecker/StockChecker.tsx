
import classNames from "classnames"

import { stockCheckerData } from "./stockChecker.data"

import styles from './stockChecker.module.scss'

type TProps = {
  isInStock: boolean
  className?: string
}

const StockChecker: React.FC<TProps> = ({isInStock, className}) => {

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


}
export default StockChecker