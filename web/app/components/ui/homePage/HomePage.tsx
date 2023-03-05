
import {FilterProduct, Products, IProduct, HeaderLayout} from '@/app/config/globalExport'

import styles from './homePage.module.scss'

interface IProps {
    products: IProduct[] | undefined,
    isLoading: boolean
}

const HomePage: React.FC<IProps> = () => {
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
}

export default HomePage