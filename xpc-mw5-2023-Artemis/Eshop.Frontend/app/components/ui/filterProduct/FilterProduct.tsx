import { FC, memo, useContext } from "react";

import { filterProductData } from "./filterProduct.data";

import Dropdown from "@/app/components/shared/dropdown/Dropdown";
import ScrollableList from "@/app/components/shared/scrollableList/ScrollableList";
import Slider from "@/app/components/shared/formFields/slider/Slider";
import Radio from "@/app/components/shared/formFields/radio/Radio";

import styles from "./filterProduct.module.scss";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import { CategoryContext } from "@/app/providers/categoryContextProvider";

const FilterProduct: FC = memo(() => {
  const { manufacturers } = useContext(ManufacturerContext);
  const { categories } = useContext(CategoryContext);

  const { defaultValues } = filterProductData;

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

FilterProduct.displayName = "FilterProduct";

export default FilterProduct;
