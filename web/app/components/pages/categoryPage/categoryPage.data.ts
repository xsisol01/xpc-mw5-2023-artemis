import { regex } from '../../../data/regex';
export const categoryPageData = Object.freeze({
  defaultValues: {
    id: '',
    name: ''
  },
  fields: [
    {
      name: 'name',
      xs: 12,
      md: 12,
      type: 'text',
      required: true,
      rows: 1,
      validation: regex.all
    }
  ]
})