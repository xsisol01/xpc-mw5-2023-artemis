import { useState } from 'react'

import classNames from 'classnames'

import { FaSearch } from 'react-icons/fa'

import { searchProductData } from './searchProduct.data'

import style from './searchProduct.module.scss'

interface IProps {
    className: string
}

const SearchProduct: React.FC<IProps> = ({className}) => {
    const [value, setValue] = useState('')

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
}

export default SearchProduct