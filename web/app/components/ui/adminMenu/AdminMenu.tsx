
import AdminMenuItem from "./AdminMenuItem"

import { adminMenuData } from "./adminMenu.data"

import styles from './adminMenu.module.scss'

const AdminMenu: React.FC = () => {

    return (
        <ul className={styles.adminMenu}>
            {adminMenuData.map(menuItem => (
                <AdminMenuItem key={menuItem.href} href={menuItem.href} text={menuItem.title} />
            ))}
        </ul>
    )
}

export default AdminMenu
