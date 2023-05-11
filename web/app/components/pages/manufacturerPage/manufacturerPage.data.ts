import {
  IManufacturer,
  IManufacturerField,
} from "@/app/types/manufacturer.type";
import { regex } from "@/app/data/regex";

export const manufacturerPageData = Object.freeze({
  defaultValues: {
    id: "",
    name: "",
    imageUrl: "",
    description: "",
    country: "",
    commodityIds: [] as string[],
  } as IManufacturer,
  fields: [
    {
      name: "name",
      xs: 12,
      md: 12,
      type: "text",
      required: true,
      rows: 1,
      validation: regex.all,
    },
    {
      name: "country",
      xs: 12,
      md: 12,
      type: "text",
      required: true,
      rows: 1,
      validation: regex.all,
    },
    {
      name: "description",
      xs: 12,
      md: 12,
      type: "text",
      required: true,
      rows: 10,
      validation: regex.all,
    },
  ] as IManufacturerField[],
});
