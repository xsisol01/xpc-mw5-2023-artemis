import {FC, memo} from 'react'

import styles from './container.module.scss'

interface IProps {
    children: React.ReactNode
}

const Container: FC<IProps> = memo(({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
})

export default Container