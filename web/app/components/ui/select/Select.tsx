import {useState, useEffect} from 'react';

import styles from './select.module.scss'


interface IOption {
    text: string
}

interface IProps {
    title: string
    options: Array<IOption> | undefined
}

const Select: React.FC<IProps> = ({title, options}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState('')

    useEffect(() => {
        if (selected.length) {
            console.log('select: fetch data with ', selected)
        }
    }, [selected])

    useEffect(() => {
        getUrlSearchParams()
    }, [])

    function getUrlSearchParams() {
        const url = new URL(window.location.href);
        const query = new URLSearchParams(url.search);
        const loweredParam = title.toLowerCase();
        const isParamExist = query.has(loweredParam);

        if (isParamExist ) {
            const param = query.get(loweredParam)
            setSelected(param ?? '');
        }
    }
    

    return(
        
        <select  className={styles.select__scroll}>
            {options?.map(option => (
                <option
                    key={option.text}
                    className={styles.select__option}
                    onClick={selectOption}
                >
                    {option.text}
                </option>
            ))}
        </select>
            
    )

    function selectOption(event) {
        setSelected(event.target.value)
    }
}

export default Select