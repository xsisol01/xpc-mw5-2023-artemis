import {FC, memo} from 'react'

import { capitalizeText } from '@/app/utils/capitalizeText'
import { getLoweredLetters } from '@/app/utils/getLoweredLetters'
import { isTextEqual } from '@/app/utils/isTextEqual'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './scrollableList.module.scss'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'

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

    function getIsSelected(optionId: string) {
        return isTextEqual(selected ?? '', optionId)
    }

    function getOptionText(option: IOption, type: string) {
        return getIsSelected(option.id) && type === 'primary'
            ? capitalizeText(option.name)
            : !getIsSelected(option.id) && type === 'secondary'
            ? capitalizeText(option.name)
            : null
    }

    return (
        <ul>
            {options?.map(item => (
                <ListItemButton
                    key={item.id}
                    onClick={() => setSelected(item.id)}
                    sx={{ height: 40 }}
                >
                    <ListItem>
                        <ListItemText
                            secondary={getOptionText(item, 'secondary')}
                            primary={getOptionText(item, 'primary')}
                        />
                    </ListItem>
                </ListItemButton>
            ) )}
        </ul>
    )
})

export default ScrollableList