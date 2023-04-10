import { IScrollableListProps } from '@/app/components/shared/scrollableList/ScrollableList';
import { ISliderProps } from '@/app/components/shared/formFields/slider/Slider';
import { IRadioProps } from '@/app/components/shared/formFields/radio/Radio';

export const fieldTypeData = Object.freeze({
  list: 'list',
  slider: 'slider',
  radio: 'radio'
})


export interface IFilterItem  {
  title: string
  uid: string
  type: string
  options?: any
  unit?: string
}

export type TProductFilterField = IRadioProps | ISliderProps | IScrollableListProps

export const filterProductData = Object.freeze([
    {
      title: 'Category',
      uid: 'category',
      type: fieldTypeData.list,
      options: []
    },
    {
      title: 'Price',
      uid: 'price',
      type: fieldTypeData.slider,
      unit: 'CZK'
    },
    {
      title: 'Manufacturer',
      uid: 'manufacturer',
      type: fieldTypeData.list,
      options: []
    },
    {
      title: 'Weight',
      uid: 'weight',
      type: fieldTypeData.slider,
      unit: 'kg'
    },
    {
      title: 'Rating',
      uid: 'rating',
      type: fieldTypeData.slider
    },
    {
      title: 'In Stock',
      uid: 'instock',
      type: fieldTypeData.radio,
      options: [
        {text: 'Yes', value: 'true'},
        {text: 'No', value: 'false'}
      ]
    }
  ])