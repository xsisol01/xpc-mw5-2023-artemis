

import { capitalizeText } from '@/app/utils/capitalizeText'
import { getLoweredLetters } from '@/app/utils/getLoweredLetters'
import { isTextEqual } from '@/app/utils/isTextEqual'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './scrollableList.module.scss'

const MAX_HEIGHT = 380

export interface IScrollableListProps {
    options: string[]
    maxHeight?: number
    uid: string
    getParam: (name: string) => string
    setParam: (name: string, value: string) => void
}

const ScrollableList: React.FC<IScrollableListProps> =(
    {uid, options, maxHeight = MAX_HEIGHT, getParam, setParam}
) => {

    const [selected, setSelected] = useState('');

    useEffect(() => {
        const defaultSelected = getParam(uid)

        if (defaultSelected) {
            setSelected(defaultSelected)
        }
    },[])

    useEffect(() => {
        const param = getLoweredLetters(selected)

        console.log('param', param)

        setParam(uid, param)
    }, [selected])

    return (
        <ul style={{maxHeight: `${maxHeight}px`}} className={styles.scrollableList}>
            {options?.map(item => (
                <li key={item} className={
                classNames({
                    [styles.scrollableList__item]: true,
                    [styles.scrollableList__active]: isTextEqual(selected, item)
                })}
                onClick={() => setSelected(item)}
                >{capitalizeText(item)}</li>
            ) )}
        </ul>
    )
}

export default ScrollableList