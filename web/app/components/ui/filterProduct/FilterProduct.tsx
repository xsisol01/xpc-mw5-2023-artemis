import { useState } from "react"

import { FilterDropdown, Slider, useGetCategoriesQuery, ScrollableList } from "@/app/config/globalExport"

import styles from './filterProduct.module.scss'

const FilterProduct: React.FC = () => {

    const [category, setCategory] = useState()

    const {data, isLoading, error} = useGetCategoriesQuery(1);

    return (
        <aside className={styles.filterProduct}>
            <div className={styles.filterProduct__inner}>
                <FilterDropdown title='Category'>
                    <ScrollableList maxHeight={300} options={data?.map(t => ({text: t}))}/>
                </FilterDropdown>


                <FilterDropdown title='Price'>
                    <>
                        <Slider uid='price' />
                    </>
                </FilterDropdown>


                <FilterDropdown title='Weight'>
                    <>
                        <Slider uid='weight' />
                    </>
                </FilterDropdown>
          
                

                <FilterDropdown title='Brand'>
                    <>
                        <div>Brand</div>
                    </>
                </FilterDropdown>


                <FilterDropdown title='Rating'>
                    <>
                        <Slider uid='rating' />
                    </>
                </FilterDropdown>

                <FilterDropdown title='In Stock'>
                    <>
                        <div>inStock</div>
                    </>
                </FilterDropdown>
            </div>
        </aside>
    )
}

export default FilterProduct