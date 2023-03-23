import {FC, memo} from 'react'

import styles from './headButton.module.scss'

interface IProps {
    children: string
    onClick: () => void
}

const HeadButton: FC<IProps> = memo(({children, onClick}) => {
    return (
        <button onClick={onClick} className={styles.headButton}>
            {children}
        </button>
    )
})


export default HeadButton