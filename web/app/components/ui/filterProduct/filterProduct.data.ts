
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
}

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
      type: fieldTypeData.slider
    },
    {
      title: 'Producer',
      uid: 'producer',
      type: fieldTypeData.list,
      options: []
    },
    {
      title: 'Weight',
      uid: 'weight',
      type: fieldTypeData.slider
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