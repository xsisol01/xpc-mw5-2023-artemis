import styles from './headButton.module.scss'

interface IProps {
    children: string
    onClick: () => void
}

const HeadButon: React.FC<IProps> = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={styles.headButton}>
            {children}
        </button>
    )
}


export default HeadButon