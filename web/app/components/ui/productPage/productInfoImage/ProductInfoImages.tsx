

import { RoleContext } from '@/app/providers/roleContextProvider'
import { IProduct } from '@/app/store/product/product.type'
import React, { useContext, useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'

import {FaPlus} from 'react-icons/fa'

import styles from './productInfoImage.module.scss'

interface IProps {
  image: string
  isAdmin: boolean
  register: UseFormRegister<IProduct>
}

const ProductInfoImage: React.FC<IProps> = ({image, isAdmin, register}) => {

  const [file, setFile] = useState(null)

  useEffect(() => {
    console.log(file)

    uploadFile()
  }, [file])

  const imageStyle = {backgroundImage: `url("${image}")`}

  return (
    <div className={styles.productInfoImage}>
      {!isAdmin && (
        <div
        className={styles.productInfoImage__image}
        style={imageStyle}
        ></div >
      )}
      {isAdmin && (
        <>
          <div className={styles.productInfoImage__placeholder}></div>
          <input
            {...register('image')}
            type='file'
            className={styles.productInfoImage__input}
            accept=".jpg,.png"
            onChange={handleChange}
          />
          
          
          <FaPlus className={styles.productInfoImage__placeholderIcon} />
          <div className={styles.productInfoImage__small} style={imageStyle}></div>

        </>
      )}
    </div>
  )

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {

    setFile(event.target.files[0])
  }

  async function uploadFile() {
    const storageAccount = 'xpcmw5'
    const sasToken = 'sp=r&st=2023-03-21T13:19:21Z&se=2023-06-01T20:19:21Z&spr=https&sv=2021-12-02&sr=c&sig=%2FifXFx7ioxlfxnaEaP8vA0n%2F%2FZFz7ZZ8Ojtafz8kr2o%3D'
    const blobService = new BlobServiceClient(
      //`https://${storageAccount}.blob.core.windows.net/files?${sasToken}`
      'https://xpcmw5.blob.core.windows.net/files?sp=r&st=2023-03-21T13:19:21Z&se=2023-06-01T20:19:21Z&spr=https&sv=2021-12-02&sr=c&sig=%2FifXFx7ioxlfxnaEaP8vA0n%2F%2FZFz7ZZ8Ojtafz8kr2o%3D'
    )

    const containerClient = blobService.getContainerClient('files')

    await containerClient.createIfNotExists({
      access: 'container'
    })

    const blobClient = containerClient.getBlockBlobClient(file.name)

    const options = {blobHTTPHeaders: {blobContentType: file.type}}

    await blobClient.uploadBrowserData(file, options)

  }
}

export default ProductInfoImage