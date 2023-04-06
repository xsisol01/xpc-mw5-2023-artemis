import { IProduct } from '@/app/types/product.type';
import { IManufacturer, IManufacturerField } from '@/app/types/manufacturer.type';

export const manufacturerContentData = Object.freeze({
  defaultValues: {
    id: '',
    name: '',
    imageUrl: '',
    description: '',
    country: '',
    products: [] as IProduct[]
  } as IManufacturer,
  fields: [
    {
      name: 'name',
      xs: 12,
      md: 12,
      type: 'text',
      required: true,
      rows: 1
    },
    {
      name: 'country',
      xs: 12,
      md: 12,
      type: 'text',
      required: true,
      rows: 1
    },
    {
      name: 'description',
      xs: 12,
      md: 12,
      type: 'text',
      required: true,
      rows: 10
    }

  ] as IManufacturerField[]
  
})