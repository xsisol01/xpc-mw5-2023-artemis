import { useEffect, useState, FC, memo } from 'react'

import classNames from 'classnames'

import { FaSearch } from 'react-icons/fa'

import { searchProductData } from './searchProduct.data'

import style from './searchProduct.module.scss'
import { getLoweredLetters } from '@/app/utils/getLoweredLetters'

export interface ISearchProductProps {
    uid: string
    className: string
    getParam?: (name: string) => string
    setParam?: (name: string, value: string) => void
}

const SearchProduct: FC<ISearchProductProps> = memo(({uid, className, getParam, setParam}) => {
    const [value, setValue] = useState<string>()

    useEffect(() => {
        if (!value && !value?.length) {
            const paramFromUrl = getParam && getParam(uid)

            if (paramFromUrl) {
                setValue(paramFromUrl)
            }
        }
    })

    useEffect(() => {
        if (setParam && value) {
            setParam(uid, getLoweredLetters(value))
        }
    }, [value])

    return (
        <div className={classNames({
            [style.searchProduct]: true,
            [className]: true
        })}>
            <input
                className={style.searchProduct__input}
                placeholder={searchProductData.placeholder}
                value={value}
                onInput={inputHandler}
                />
                <div className={style.searchProduct__icon}>
                    <FaSearch />
                </div>
        </div>
    )


    function inputHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value)
    }
})

export default SearchProduct