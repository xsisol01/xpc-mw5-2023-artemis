import { FC, memo } from "react";

import styles from './manufacturerItem.module.scss'
import Image from "@/app/components/shared/image/Image";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Grid } from "@mui/material";


interface IProps {
  id: string
  name: string
  imageUrl: string
}

const ManufacturerItem: FC<IProps> = memo(({ id, name, imageUrl }) => {

  const router = useRouter()
  const { pid } = router.query

  return (
    <Grid item xs={12} md={5}
      
     className={ classNames({
      [styles.manufacturerItem]: true,
      [styles.manufacturerItem__active]: pid === id
    })}>
      <Image
        className={styles.manufacturerItem__image}
        src={imageUrl}
        width={100}
        height={50}
        />
      <div>{capitalizeText(name)}</div>
    </Grid>
  )
})

export default ManufacturerItem