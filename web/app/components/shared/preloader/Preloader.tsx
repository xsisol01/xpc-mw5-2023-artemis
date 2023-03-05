
import Image from 'next/image';
import styles from './preloader.module.scss'

const Preloader: React.FC = () => {

  return (
    <div className={styles.preloader}>
        <Image
          src='/preloader.svg'
          alt='Loading...'
          priority={true}
          width={200}
          height={200}
         />
    </div>
    )

}

export default Preloader