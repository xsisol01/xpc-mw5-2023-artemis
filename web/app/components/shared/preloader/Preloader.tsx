import {FC, memo} from 'react'

import Image from 'next/image';
import styles from './preloader.module.scss'

const Preloader: FC = memo(() => {

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
})

export default Preloader