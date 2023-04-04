import {FC, memo} from 'react'

import Header from '@/app/components/ui/header/Header'

import styles from './headerLayout.module.scss'

interface IProps {
    children: React.ReactNode,
    contentPage?: 'home'
}

const HeaderLayout: FC<IProps> = memo(({children, contentPage}) => {
    return (
        <div className={styles.headerLayout}>
            <Header contentPage={contentPage}/>
            <div className={styles.headerLayout__content}>
                {children}
            </div>
        </div>
    )
})

export default HeaderLayout