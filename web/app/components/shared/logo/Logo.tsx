import { logoData } from './logo.data'

import styles from './logo.module.scss'

interface IProps {
    color: string
}

const Logo: React.FC<IProps> = ({color}) => {

    return (
        <div style={{color}} className={styles.logo}>{logoData.title}</div>
    )
}

export default Logo