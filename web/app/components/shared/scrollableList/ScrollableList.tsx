import {FC, memo} from 'react'

import { capitalizeText } from '@/app/utils/capitalizeText'
import { getLoweredLetters } from '@/app/utils/getLoweredLetters'
import { isTextEqual } from '@/app/utils/isTextEqual'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './scrollableList.module.scss'

const MAX_HEIGHT = 380


export type IOption = {
    id: string
    name: string
}

export interface IScrollableListProps {
    options: IOption[]
    maxHeight?: number
    uid: string
    getParam: (name: string) => string
    setParam: (name: string, value: string) => void
}

const ScrollableList: FC<IScrollableListProps> = memo((
    {uid, options, maxHeight = MAX_HEIGHT, getParam, setParam}
) => {

    const [selected, setSelected] = useState<string>('');

    useEffect(() => {
        const defaultSelected = getParam(uid)

        if (defaultSelected?.length) {
            setSelected(defaultSelected)
        }
    },[])

    useEffect(() => {
        const param = getLoweredLetters(selected ?? '')

        setParam(uid, param)
    }, [selected])

    return (
        <ul style={{maxHeight: `${maxHeight}px`}} className={styles.scrollableList}>
            {options?.map(item => (
                <li key={item.id} className={
                classNames({
                    [styles.scrollableList__item]: true,
                    [styles.scrollableList__active]: isTextEqual(selected ?? '', item.id)
                })}
                onClick={() => setSelected(item.id)}
                >{capitalizeText(item.name)}</li>
            ) )}
        </ul>
    )
})

export default ScrollableList