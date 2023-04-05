import {FC, memo, useContext} from 'react'


import Switch from '@/app/components/shared/button/switch/Switch'

import { navbarData } from './navbar.data'

import styles from './navbar.module.scss'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { capitalizeText } from '@/app/utils/capitalizeText'
import { Box } from '@mui/system'
import AdminButton from '../../shared/button/adminButton/AdminButton'


const Navbar: FC = memo(() => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar__list}>
                {navbarData.navLink.map(t => (
                    <li key={t.link}>
                        <Link href={t.link}>
                            <Typography variant='h6'>
                                {capitalizeText(t.name)}
                            </Typography>
                        </Link>
                    </li>
                ))}
                <li>
                    <AdminButton />
                </li>
            </ul>
        </nav>
    )
})

export default Navbar