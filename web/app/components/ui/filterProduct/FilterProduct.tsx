import { useGetCategoriesQuery } from "@/app/store/product/product.api";
import { useState } from "react"

import Dropdown from "@/app/components/shared/dropdown/dropdown";
import ScrollableList from "@/app/components/shared/scrollableList/ScrollableList";
import Slider from "@/app/components/shared/slider/Slider";


import styles from './filterProduct.module.scss'

const FilterProduct: React.FC = () => {

    const [category, setCategory] = useState()

    const {data, isLoading, error} = useGetCategoriesQuery(1);

    return (
        <aside className={styles.filterProduct}>
            <div className={styles.filterProduct__inner}>
                <Dropdown title='Category'>
                    <ScrollableList maxHeight={300} options={data?.map(t => ({text: t})) as any}/>
                </Dropdown>


                <Dropdown title='Price'>
                    <>
                        <Slider uid='price' />
                    </>
                </Dropdown>


                <Dropdown title='Weight'>
                    <>
                        <Slider uid='weight' />
                    </>
                </Dropdown>
          
                

                <Dropdown title='Brand'>
                    <>
                        <div>Brand</div>
                    </>
                </Dropdown>


                <Dropdown title='Rating'>
                    <>
                        <Slider uid='rating' />
                    </>
                </Dropdown>

                <Dropdown title='In Stock'>
                    <>
                        <div>inStock</div>
                    </>
                </Dropdown>
            </div>
        </aside>
    )
}

export default FilterProduct