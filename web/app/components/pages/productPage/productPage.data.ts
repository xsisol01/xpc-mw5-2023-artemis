import { IProductField } from "@/app/types/product.type";
import { regex } from "@/app/data/regex";

export const productPageData = Object.freeze({
  weight: "Weight",
  unit: "kg",
  inStock: "In stock",
  notInStock: "Not in stock",
  currency: 'CZK',
  reviews: 'Reviews',
  submit: 'submit',
  fields: [
    {
      name: 'name',
      xs: 12,
      md: 12,
      type: 'text',
      required: true,
      rows: 1,
      validation: regex.all
    },
    {
      name: 'manufacturerId',
      placeholder: 'manufacturer',
      xs: 12,
      md: 6,
      type: 'select',
      required: true,
      rows: 1,
      validation: regex.all
    },
    {
      name: 'categoryId',
      placeholder: 'category',
      xs: 12,
      md: 6,
      type: 'select',
      required: true,
      rows: 1,
      validation: regex.all
    },
    {
      name: 'price',
      xs: 12,
      md: 6,
      type: 'text',
      required: true,
      rows: 1,
      validation: regex.price
    },
    {
      name: 'weight',
      xs: 12,
      md: 6,
      type: 'text',
      required: true,
      rows: 1,
      validation: regex.weight
    },
    {
      name: 'stockQuantity',
      placeholder: 'stock quantity',
      xs: 12,
      md: 6,
      type: 'text',
      required: true,
      rows: 1,
      validation: regex.stockQuantity
    },
    {
      name: 'description',
      xs: 12,
      md: 12,
      type: 'text',
      required: true,
      rows: 10,
      validation: regex.all
    },
  ] as IProductField[]
})

