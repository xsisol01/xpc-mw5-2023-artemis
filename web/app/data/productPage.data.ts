import { IProductField } from "@/app/types/product.type";
import { regex } from "./regex";

export const productPageData = Object.freeze({
  weight: "Weight",
  unit: "kg",
  inStock: "In stock",
  notInStock: "Not in stock",
  currency: 'CZK',
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
      name: 'manufacturer',
      xs: 12,
      md: 6,
      type: 'select',
      required: true,
      rows: 1,
      validation: regex.all
    },
    {
      name: 'category',
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

