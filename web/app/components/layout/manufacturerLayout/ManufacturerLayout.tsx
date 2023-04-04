import { FC, memo, useState, ReactNode } from "react";

import styles from './ManufacturerLayout.module.scss'
import ManufacturerItem from "@/app/components/ui/manufacturerItem/ManufacturerItem";
import Link from "next/link";
import Preloader from "../../shared/preloader/Preloader";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";

interface IProps{
  children?: ReactNode
}

const ManufacturerLayout: FC<IProps> = memo(({ children }) => {
  
  const { manufacturers, isLoading} = useGetAllManufacturers()

  if (!manufacturers) {
    return <Preloader />
  }

  return (
    <div className={styles.ManufacturerLayout}>
      <ul className={styles.ManufacturerLayout__items}>
        {manufacturers?.map(manufacturer => (
          <li key={manufacturer.id}>
            <Link
              href='/manufacturer/[pid]'
              as={`/manufacturer/${manufacturer.id}`}
            >
              <ManufacturerItem
                id={manufacturer.id}
                name={manufacturer.name}
                imageUrl={manufacturer.imageUrl}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.ManufacturerLayout__content}>
        {children}
      </div>
    </div>
  )
})

export default ManufacturerLayout