import { FC, memo } from "react";

import styles from './manufacturersContent.module.scss'
import Preloader from "../../shared/preloader/Preloader";
import { useRouter } from "next/router";
import Image from "../../shared/image/Image";
import Products from "../products/Products";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { useGetManufacturer } from "@/app/hooks/manufacturer/useGetManufacturer";


const ManufacturersContent: FC = memo(() => {
  console.log('new content')

  const router = useRouter()
  const {pid} = router.query

  if (!pid) {
    return <Preloader />
  }

  const {manufacturer, isLoading} = useGetManufacturer(pid.toString())

  console.log(manufacturer)
  
  return (
    <div className={styles.manufacturersContent}>
      {isLoading && <Preloader />}
      {manufacturer && (
        <>
          <div className={styles.manufacturersContent__main}>
            <Image
              className={styles.manufacturersContent__image}
              src={manufacturer.imageUrl}
              width={200}
              height={200}
            />
            <div className={styles.manufacturersContent__name}>
              {capitalizeText(manufacturer.name)}
            </div>
            <div className={styles.manufacturersContent__country}>
              {manufacturer.country}
            </div>
            <div className={styles.manufacturersContent__description}>
              {manufacturer.description}
            </div>
          </div>
          <div className={styles.manufacturersContent__products}>
            <Products products={manufacturer.products} manufacturer={manufacturer.id} />
          </div>
        </>
          
      )}
      
    </div>
  )
})

export default ManufacturersContent