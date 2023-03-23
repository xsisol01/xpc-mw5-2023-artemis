import {FC, memo} from 'react'

import Logo from '@/app/components/shared/logo/Logo'
import SearchProduct, { ISearchProductProps } from '@/app/components/shared/searchProduct/SearchProduct'
import Navbar from '@/app/components/ui/navbar/Navbar'
import withUrlSearchParams from '@/app/components/shared/hoc/withUrlSearchParams'

import styles from './headerLayout.module.scss'

interface IProps {
    children: React.ReactNode,
    contentPage?: string
}

const HeaderLayout: FC<IProps> = memo(({children, contentPage}) => {
    return (
        <div className={styles.headerLayout}>
            <div className={styles.headerLayout__ribbon}>
                <Logo color='white' />
                { contentPage === 'home' && 
                    withUrlSearchParams<ISearchProductProps>(SearchProduct)({
                        uid: 'search',
                        className: styles.headerLayout__searchBar
                    })
                }
                <Navbar />
            </div>
            <div className={styles.headerLayout__content}>
                {children}
            </div>
        </div>
    )
})

export default HeaderLayout