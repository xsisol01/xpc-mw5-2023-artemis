import { FC, memo } from "react";

import { IProducer } from "@/app/store/product/producer.type";

import styles from './producersContent.module.scss'
import { useGetProducerQuery } from "@/app/store/product/product.api";
import Preloader from "../../shared/preloader/Preloader";
import { useRouter } from "next/router";
import Image from "../../shared/image/Image";
import Products from "../products/Products";
import { capitalizeText } from "@/app/utils/capitalizeText";


const ProducersContent: FC = memo(() => {
  console.log('new content')

  const router = useRouter()
  const {pid} = router.query

  if (!pid) {
    return <Preloader />
  }

  const {data: producer, isLoading} = useGetProducerQuery(pid.toString())

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
            <Products products={producer.products} />
          </div>
        </>
          
      )}
      
    </div>
  )
})

export default ProducersContent