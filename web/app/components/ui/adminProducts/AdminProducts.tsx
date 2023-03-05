import {SearchProduct} from "@/app/config/globalExport"

import styles from './adminProducts.module.scss'

const AdminProducts: React.FC = () => {

    return (
        <div className={styles.adminProducts}>
            <div className={styles.adminProducts__searchContainer}>
                <SearchProduct className={styles.adminProducts__searchBar}/>
            </div>
        </div>
    )
}

export default AdminProducts