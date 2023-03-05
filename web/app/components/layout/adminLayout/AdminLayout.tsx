import { HeaderLayout, AdminMenu, AdminContainer} from "@/app/config/globalExport"

import styles from './adminLayout.module.scss'

interface IProps {
    children: React.ReactNode
}

const AdminLayout: React.FC<IProps> = ({children}) => {

    return (
        <HeaderLayout >
            <div className={styles.adminLayout}>
                <div className={styles.adminLayout__menu}>
                    <AdminMenu />
                </div>
                <div  className={styles.adminLayout__content}>
                    <AdminContainer >
                        {children}
                    </AdminContainer>
                </div>
            </div>
        </HeaderLayout>
    )
}

export default AdminLayout