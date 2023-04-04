export const productPageData = Object.freeze({
  weight: "Weight",
  unit: "kg",
  inStock: "In stock",
  notInStock: "Not in stock",
  currency: 'CZK',
  submit: 'submit',
  pricePattern: '[0-9]+(\\.[0-9][0-9]?)?',
  weightPattern: '[0-9]+(\\.[0-9]?)?',
  countPattern: '[0-9]?',
  fields: [
    {
      name: 'title',
      xs: 12,
      md: 12,
      type: 'text',
      required: true,
      rows: 1
    },
    {
      name: 'producer',
      xs: 12,
      md: 6,
      type: 'select',
      required: true,
      rows: 1
    },
    {
      name: 'category',
      xs: 12,
      md: 6,
      type: 'select',
      required: true,
      rows: 1
    },
    {
      name: 'price',
      xs: 12,
      md: 6,
      type: 'text',
      required: true,
      rows: 1
    },
    {
      name: 'weight',
      xs: 12,
      md: 6,
      type: 'text',
      required: true,
      rows: 1
    },
    {
      name: 'count',
      xs: 12,
      md: 6,
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
    },
  ] as IProductField[]
})

export interface IProductField {
  type: string
  name: 'title' | 'producer' | 'category' | 'price' | 'weight' | 'count' | 'description'
  xs: number
  md: number
  required: boolean
  rows: number
}