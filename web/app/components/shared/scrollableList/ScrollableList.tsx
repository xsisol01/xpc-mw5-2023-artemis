

import styles from './scrollableList.module.scss'

interface IOption {
    text: string
}

interface IProps {
    options: IOption[]
    maxHeight: number
}

const ScrollableList: React.FC<IProps> = ({options, maxHeight}) => {
    return (
        <ul style={{maxHeight: `${maxHeight}px`}} className={styles.scrollableList}>
            {options?.map(t => <li key={t.text} className={styles.scrollableList__item}>{t.text}</li>)}
        </ul>
    )
}

export default ScrollableList