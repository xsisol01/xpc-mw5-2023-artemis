import { FC, memo, useEffect } from "react";

import Dropdown from "@/app/components/shared/dropdown/Dropdown";
import ScrollableList, {
  IScrollableListProps,
} from "@/app/components/shared/scrollableList/ScrollableList";
import Slider, {
  ISliderProps,
} from "@/app/components/shared/formFields/slider/Slider";
import Radio, {
  IRadioProps,
} from "@/app/components/shared/formFields/radio/Radio";

import withUrlSearchParams from "@/app/components/shared/hoc/withUrlSearchParams";

import {
  filterProductData,
  fieldTypeData,
  IFilterItem,
} from "./filterProduct.data";

import styles from "./filterProduct.module.scss";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";

const FilterProduct: FC = memo(() => {
  const { categories, isLoading: isCategoryLoading } = useGetAllCategories();
  const { manufacturers, isLoading: isManufacturerLoading } =
    useGetAllManufacturers();

  const { defaultValues } = filterProductData;

  useEffect(() => {
    console.log("categories", categories);
    console.log("manufacturers", manufacturers);
  }, [categories, manufacturers]);

  return (
    <aside className={styles.filterProduct}>
      <div className={styles.filterProduct__inner}>

        <Dropdown title={defaultValues.category.title} key={defaultValues.category.uid}>
          {withUrlSearchParams<IScrollableListProps>(ScrollableList)({
            ...defaultValues.category,
            options: categories
            })}
        </Dropdown>

        <Dropdown title={defaultValues.price.title} key={defaultValues.price.uid}>
          {withUrlSearchParams<ISliderProps>(Slider)({ ...defaultValues.price })}
        </Dropdown>

        <Dropdown title={defaultValues.manufacturer.title} key={defaultValues.manufacturer.uid}>
          {withUrlSearchParams<IScrollableListProps>(ScrollableList)({
            ...defaultValues.manufacturer,
            options: manufacturers
            })}
        </Dropdown>

        <Dropdown title={defaultValues.weight.title} key={defaultValues.weight.uid}>
          {withUrlSearchParams<ISliderProps>(Slider)({ ...defaultValues.weight })}
        </Dropdown>

        <Dropdown title={defaultValues.rating.title} key={defaultValues.rating.uid}>
          {withUrlSearchParams<ISliderProps>(Slider)({ ...defaultValues.rating })}
        </Dropdown>

        <Dropdown title={defaultValues.inStock.title} key={defaultValues.inStock.uid}>
          {withUrlSearchParams<IRadioProps>(Radio)({ ...defaultValues.inStock })}
        </Dropdown>

      </div>
    </aside>
  );
});

export default FilterProduct;
