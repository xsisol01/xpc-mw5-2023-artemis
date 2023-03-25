import {FC, memo, useContext} from 'react'

import { RoleContext } from '@/app/providers/roleContextProvider'
import HeadLink from '../headButton/HeadLink'
import HeadButton from '../headButton/HeadButton'

import { navbarData } from './navbar.data'

import styles from './navbar.module.scss'

const Navbar: FC = memo(() => {
    const {isAdmin, setIsAdmin} = useContext(RoleContext)

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar__list}>
                {navbarData.navLink.map(t => (
                    <li key={t.link} className={styles.navbar__item}>
                        <HeadLink link={t.link}>
                            {t.name}
                        </HeadLink>
                    </li>
                ))}
                <li className={styles.navbar__item}>
                    <HeadButton onClick={() => setIsAdmin(!isAdmin)}>
                        {navbarData.adminButton}
                    </HeadButton>
                </li>
            </ul>
        </nav>
    )
})

export default Navbar