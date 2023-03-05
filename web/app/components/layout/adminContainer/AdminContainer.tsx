

import styles from './adminContainer.module.scss'

interface IProps {
    children: React.ReactNode
}

const AdminContainer: React.FC<IProps> = ({children}) => {


    return (
        <div className={styles.adminContainer}>
            {children}
        </div>
    )
}

export default AdminContainer