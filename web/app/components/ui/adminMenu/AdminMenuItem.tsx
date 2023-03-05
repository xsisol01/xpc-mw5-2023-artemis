
import Link from 'next/link'

import {ImPlus} from 'react-icons/im'

import styles from './adminMenuItem.module.scss'

interface IProps {
    text: string
    href: string
}

const AdminMenuItems: React.FC<IProps> = ({text, href}) => {

    return (
        <li className={styles.adminMenuItem}>
            <Link href={href} className={styles.adminMenuItem__link}>
                {text}
            </Link>
            <ImPlus className={styles.adminMenuItem__icon} />
        </li>
    )
}

export default AdminMenuItems