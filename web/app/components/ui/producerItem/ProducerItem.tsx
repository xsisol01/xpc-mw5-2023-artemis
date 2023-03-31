import { FC, memo } from "react";

import styles from './producerItem.module.scss'
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

const ProducerItem: FC<IProps> = memo(({ id, name, imageUrl }) => {

  const router = useRouter()
  const { pid } = router.query

  return (
    <Grid item xs={12} md={5}
      
     className={ classNames({
      [styles.producerItem]: true,
      [styles.producerItem__active]: pid === id
    })}>
      <Image
        className={styles.producerItem__image}
        src={imageUrl}
        width={100}
        height={50}
        />
      <div>{capitalizeText(name)}</div>
    </Grid>
  )
})

export default ProducerItem