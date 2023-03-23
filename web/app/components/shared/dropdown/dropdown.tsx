import { useState, FC, memo } from 'react'

import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'

import styles from './dropdowm.module.scss'

interface IProps {
    title: string
    children: React.ReactNode
}

const Dropdown: FC<IProps> = memo(({title, children}) => {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className={styles.dropdown}>
            <div
                className={styles.dropdown__button}
                onClick={() => setIsOpen(prev => !prev)}
                >
                <div className={styles.dropdown__title}>
                    {title}
                </div>
                <div className={styles.dropdown__arrow}>
                    {!isOpen && <IoIosArrowDown />}
                    {isOpen && <IoIosArrowUp />}
                </div>
            </div>
            {isOpen && (
                <div className={styles.dropdown__content}>
                    {children}
                </div>
            )}
        </div>
    )
})

export default Dropdown