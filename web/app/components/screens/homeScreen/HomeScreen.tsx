import {FilterProduct, Products, HeaderLayout, Container} from '@/app/config/globalExport'

import styles from './homeScreen.module.scss'

const HomeScreen: React.FC = () => {
    return (
        <div className={styles.homeScreen}>
            <HeaderLayout contentPage='home'>
                <Container>
                    <div className={styles.homeScreen__content}>
                        <FilterProduct />
                        <Products />
                    </div>
                </Container>
            </HeaderLayout>
        </div>
    )
}

export default HomeScreen