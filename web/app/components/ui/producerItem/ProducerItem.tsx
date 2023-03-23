import { FC, memo } from "react";

import { IProducer } from "@/app/store/product/producer.type";

import styles from './producerItem.module.scss'
import Image from "@/app/components/shared/image/Image";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { useRouter } from "next/router";
import classNames from "classnames";


interface IProps {
  id: string
  name: string
  imageUrl: string
}

const ProducerItem: FC<IProps> = memo(({ id, name, imageUrl }) => {

  const router = useRouter()
  const { pid } = router.query

  return (
    <div className={ classNames({
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
    </div>
  )
})

export default ProducerItem