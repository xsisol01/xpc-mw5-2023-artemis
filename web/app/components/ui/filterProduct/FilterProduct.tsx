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
        <Dropdown title={defaultValues.category.title}>
          <ScrollableList {...defaultValues.category} options={categories} />
        </Dropdown>

        <Dropdown title={defaultValues.price.title}>
          <Slider {...defaultValues.price} />
        </Dropdown>

        <Dropdown title={defaultValues.manufacturer.title}>
          <ScrollableList
            {...defaultValues.manufacturer}
            options={manufacturers}
          />
        </Dropdown>

        <Dropdown title={defaultValues.weight.title}>
          <Slider {...defaultValues.weight} />
        </Dropdown>

        <Dropdown title={defaultValues.rating.title}>
          <Slider {...defaultValues.rating} />
        </Dropdown>

        <Dropdown title={defaultValues.inStock.title}>
          <Radio {...defaultValues.inStock} />
        </Dropdown>
      </div>
    </aside>
  );
});

export default FilterProduct;
