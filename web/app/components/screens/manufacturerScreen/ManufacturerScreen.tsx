import { FC, memo } from "react";
import ManufacturerLayout from "@/app/components/layout/manufacturerLayout/ManufacturerLayout";

import styles from './manufacturersContent.module.scss'
import { useRouter } from "next/router";
import Image from "@/app/components/shared/image/Image";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { useGetManufacturer } from "@/app/hooks/manufacturer/useGetManufacturer";
import Products from "@/app/components/ui/products/Products";
import { CircularProgress } from "@mui/material";

const ManufacturerScreen: FC = memo(() => {

  const router = useRouter()
  const {pid} = router.query

  if (!pid) {
    return <CircularProgress />
  }

  const {manufacturer, isLoading} = useGetManufacturer(pid.toString())

  return (
    <ManufacturerLayout>
      <div className={styles.manufacturersContent}>
      {isLoading && <CircularProgress />}
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
    </ManufacturerLayout>
  )
})

export default ManufacturerScreen