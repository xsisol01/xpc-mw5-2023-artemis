import { SearchProduct, Logo, Navbar } from '@/app/config/globalExport'

import styles from './headerLayout.module.scss'

interface IProps {
    children: React.ReactNode,
    contentPage?: string
}

const HeaderLayout: React.FC<IProps> = ({children, contentPage}) => {
    return (
        <div className={styles.headerLayout}>
            <div className={styles.headerLayout__ribbon}>
                <Logo color='white' />
                { contentPage === 'home' && (
                    <SearchProduct
                        className={styles.headerLayout__searchBar}
                        />
                )}
                <Navbar />
            </div>
            <div className={styles.headerLayout__content}>
                {children}
            </div>
        </div>
    )
}





export default HeaderLayout