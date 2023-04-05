import { FC, memo, useEffect } from "react"

import Dropdown from "@/app/components/shared/dropdown/dropdown";
import ScrollableList, { IScrollableListProps } from "@/app/components/shared/scrollableList/ScrollableList";
import Slider, { ISliderProps } from "@/app/components/shared/formFields/slider/Slider";
import Preloader from "@/app/components/shared/preloader/Preloader";
import Radio, { IRadioProps } from "@/app/components/shared/formFields/radio/Radio";

import withUrlSearchParams from "@/app/components/shared/hoc/withUrlSearchParams";

import { filterProductData, fieldTypeData, IFilterItem } from "./filterProduct.data";

import styles from './filterProduct.module.scss'
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";

interface TField{
    uid: string
    options?: any
    unit?: string
}

const FilterProduct: FC = memo(() => {

    const {
        categories,
        isLoading: isCategoryLoading,
    } = useGetAllCategories();
    const {
        manufacturers,
        isLoading: isManufacturerLoading
    } = useGetAllManufacturers()

    

    useEffect(() => {
        console.log('categories', categories)
        console.log('manufacturers', manufacturers)

    }, [categories, manufacturers])


    return (
        <aside className={styles.filterProduct}>
            <div className={styles.filterProduct__inner}>

                {
                    filterProductData.map(field => {

                        const Component = getComponent(field.type)
                        const componentType = getComponentType(field.type)
                        const componentOptions = getComponentOptions(field)
                        const componentUnit = getComponentUnit(field)

                        let props: TField = {
                            uid: field.uid,
                            unit: componentUnit

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
            case 'manufacturer':
                return manufacturers ?? []
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

    function getComponentUnit(field: IFilterItem) {
        return field.unit ?? ''
    }
})

export default FilterProduct