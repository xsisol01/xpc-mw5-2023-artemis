import { regex } from "./../../../data/regex";
import { IScrollableListProps } from "@/app/components/shared/scrollableList/ScrollableList";
import { ISliderProps } from "@/app/components/shared/formFields/slider/Slider";
import { IRadioProps } from "@/app/components/shared/formFields/radio/Radio";

export const fieldTypeData = Object.freeze({
  list: "list",
  slider: "slider",
  radio: "radio",
});

export interface IFilterItem {
  title: string;
  uid: string;
  type: string;
  options?: any;
  unit?: string;
  validation?: RegExp;
}

export const filterProductData = Object.freeze({
  defaultValues: {
    category: {
      title: "Category",
      uid: "category",
      type: fieldTypeData.list,
      options: [],
    },
    price: {
      title: "Price",
      uid: "price",
      type: fieldTypeData.slider,
      unit: "CZK",
      validation: regex.price,
    },
    manufacturer: {
      title: "Manufacturer",
      uid: "manufacturer",
      type: fieldTypeData.list,
      options: [],
    },
    weight: {
      title: "Weight",
      uid: "weight",
      type: fieldTypeData.slider,
      unit: "kg",
      validation: regex.weight,
    },
    rating: {
      title: "Rating",
      uid: "rating",
      type: fieldTypeData.slider,
      validation: regex.all,
    },
    inStock: {
      title: "In Stock",
      uid: "instock",
      type: fieldTypeData.radio,
      options: [
        { text: "Yes", value: "true" },
        { text: "No", value: "false" },
      ],
    },
  },
});
