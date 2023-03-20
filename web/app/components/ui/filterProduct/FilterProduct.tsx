import { useGetCategoriesQuery, useGetProducersQuery } from "@/app/store/product/product.api";
import { useState } from "react"

import Dropdown from "@/app/components/shared/dropdown/dropdown";
import ScrollableList, { IScrollableListProps } from "@/app/components/shared/scrollableList/ScrollableList";
import Slider, { ISliderProps } from "@/app/components/shared/slider/Slider";
import Preloader from "@/app/components/shared/preloader/Preloader";
import Radio, { IRadioProps } from "@/app/components/shared/radio/Radio";

import withUrlSearchParams from "@/app/components/shared/hoc/withUrlSearchParams";

import { filterProductData, fieldTypeData, IFilterItem } from "./filterProduct.data";

import styles from './filterProduct.module.scss'


interface TField{
    uid: string
    options?: any
}

const FilterProduct: React.FC = () => {

    const {
        data: categories,
        isLoading: isCategoryLoading,
        error: categoriesError
    } = useGetCategoriesQuery(1);
    const {
        data: producers,
        isLoading: isProducerLoading,
        error: producersError
    } = useGetProducersQuery(1)

    console.log('categories', categories)

    return (
        <aside className={styles.filterProduct}>
            <div className={styles.filterProduct__inner}>
                {
                    filterProductData.map(field => {

                        const Component = getComponent(field.type)
                        const componentType = getComponentType(field.type)
                        const componentOptions = getComponentOptions(field)

                        let props: TField = {
                            uid: field.uid
                        }

                        if( componentOptions.length ){
                            props = {
                                ...props,
                                options: [...componentOptions]
                            }
                        }

                        return (
                            <Dropdown title={field.title} key={field.uid}>
                                {
                                    withUrlSearchParams<typeof componentType>(Component)({...props})
                                }
                            </Dropdown>
                        )
                    })
                }
            </div>
        </aside>
    )

    function getComponentOptions(field: IFilterItem) {

        if (field.options?.length) {
            return field.options
        }

        switch (field.uid) {
            case 'category':
                return categories ?? []
            case 'producer':
                return producers ?? []
            default:
                return []
        }
    }

    function getComponentType(fieldType: string) {
        switch (fieldType) {
            case fieldTypeData.list:
                return IScrollableListProps
            case fieldTypeData.radio:
                return IRadioProps
            case fieldTypeData.slider:
                return ISliderProps
            default:
                return null
        }
    }

    function getComponent(fieldType: string) {
        switch (fieldType) {
            case fieldTypeData.list:
                return ScrollableList
            case fieldTypeData.radio:
                return Radio
            case fieldTypeData.slider:
                return Slider
            default:
                return () => null
        }
    }
}

export default FilterProduct