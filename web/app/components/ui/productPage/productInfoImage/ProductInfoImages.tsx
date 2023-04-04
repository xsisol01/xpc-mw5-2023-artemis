import {FC, memo, useContext, useEffect, useState } from 'react'

import { RoleContext } from '@/app/providers/roleContextProvider'
import { UseFormRegister } from 'react-hook-form'

import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'

import {FaPlus} from 'react-icons/fa'

import styles from './productInfoImage.module.scss'
import Image from '@/app/components/shared/image/Image'
import { IProduct } from '@/app/types/product.type'

interface IProps {
  image: string
  register?: (fieldName: string) => UseFormRegister<IProduct>
}

const ProductInfoImage: FC<IProps> = memo(({image, register}) => {
  const [file, setFile] = useState<File>()
  const {isAdmin} = useContext(RoleContext)

  let registerFunc = (fieldName: string) => ({} as UseFormRegister<IProduct>)

  if (register) {
    registerFunc = register
  }

  useEffect(() => {
    console.log(file)

    //uploadFile()
  }, [file])

  return (
    <div className={styles.productInfoImage}>
      {!isAdmin && (
        <Image
          className={styles.productInfoImage__image}
          src={image}
        />
      )}
      {isAdmin && (
        <>
          <div className={styles.productInfoImage__placeholder}></div>
          <input
            {...registerFunc('image')}
            type='file'
            className={styles.productInfoImage__input}
            accept=".jpg,.png"
            onChange={handleChange}
          />
          
          <FaPlus className={styles.productInfoImage__placeholderIcon} />

          {image.length > 0 && (
            <Image
              className={styles.productInfoImage__small}
              src={image}
            />
          )}
        </>
      )}
    </div>
  )

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {

    const { files } = event.target

    if (files) {
      setFile(files[0])
    }
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

    if (file) {
      const blobClient = containerClient.getBlockBlobClient(file.name)

      const options = {blobHTTPHeaders: {blobContentType: file.type}}
  
      await blobClient.uploadBrowserData(file, options)
    }
  }
})

export default ProductInfoImage