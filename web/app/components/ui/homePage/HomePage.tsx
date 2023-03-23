import {FC, memo} from 'react'

import { IProduct } from '@/app/store/product/product.type'
import HeaderLayout from '@/app/components/layout/headerLayout/HeaderLayout'
import FilterProduct from '@/app/components/ui/filterProduct/FilterProduct'
import Products from '@/app/components/ui/products/Products'

import styles from './homePage.module.scss'

interface IProps {
    products: IProduct[] | undefined,
    isLoading: boolean
}

const HomePage: FC<IProps> = memo(() => {
    return (
        <div className={styles.homePage}>
            <HeaderLayout contentPage='home'>
                <div className={styles.homePage__content}>
                    <FilterProduct />
                    <Products />
                </div>
            </HeaderLayout>
        </div>
    )
})

export default HomePage