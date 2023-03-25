import { FC, memo } from "react";

import styles from './producersContent.module.scss'
import Preloader from "../../shared/preloader/Preloader";
import { useRouter } from "next/router";
import Image from "../../shared/image/Image";
import Products from "../products/Products";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { useGetProducer } from "@/app/hooks/producer/useGetProducer";


const ProducersContent: FC = memo(() => {
  console.log('new content')

  const router = useRouter()
  const {pid} = router.query

  if (!pid) {
    return <Preloader />
  }

  const {producer, isLoading} = useGetProducer(pid.toString())

  console.log(producer)
  
  return (
    <div className={styles.producersContent}>
      {isLoading && <Preloader />}
      {producer && (
        <>
          <div className={styles.producersContent__main}>
            <Image
              className={styles.producersContent__image}
              src={producer.imageUrl}
              width={200}
              height={200}
            />
            <div className={styles.producersContent__name}>
              {capitalizeText(producer.name)}
            </div>
            <div className={styles.producersContent__country}>
              {producer.country}
            </div>
            <div className={styles.producersContent__description}>
              {producer.description}
            </div>
          </div>
          <div className={styles.producersContent__products}>
            <Products products={producer.products} producer={producer.id} />
          </div>
        </>
          
      )}
      
    </div>
  )
})

export default ProducersContent