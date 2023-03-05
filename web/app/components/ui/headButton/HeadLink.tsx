import Link from "next/link"

import styles from './headButton.module.scss'

interface IProps {
    children: string
    link: string
}

const HeadLink: React.FC<IProps> = ({children, link}) => {
    return (
        <Link href={link} className={styles.headButton}>
            {children}
        </Link>
    )
}


export default HeadLink