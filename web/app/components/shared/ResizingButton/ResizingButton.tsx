import {FC, memo} from 'react'

import classNames from 'classnames'
import styles from './resizingButton.module.scss'

interface IProps {
    text: string
    onClick?: () => void
    className?: string
    type?: 'button' | 'submit' | 'reset' | undefined
}

const ResizingButton: FC<IProps> = memo(({text, className, onClick, type = 'button'}) => {

    return (
        <button type={type} onClick={onClick} className={classNames({
            [styles.resizingButton]: true,
            [className || '']: true
        })}>
            {text}
        </button>
    )
})

export default ResizingButton