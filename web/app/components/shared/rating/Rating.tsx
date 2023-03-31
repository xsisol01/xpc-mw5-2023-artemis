import {FC, memo, SyntheticEvent, useContext, useEffect, useState} from 'react'

import classNames from 'classnames'

import { AiFillStar } from 'react-icons/ai'

import styles from './rating.module.scss'
import { RoleContext } from '@/app/providers/roleContextProvider'
import { Rating as MURaring } from '@mui/material'

interface IProps {
    rate: number,
    description?: string,
    size?: string
}

const Rating: FC<IProps> = memo(({rate, description, size}) => {
    const [value, setValue] = useState<number | null>(null)
    const {isAdmin} = useContext(RoleContext)

    function onRate(event: SyntheticEvent<Element, Event>, newValue: number | null) {
        event.preventDefault()
        event.stopPropagation()

        if (value !== newValue) {
            setValue(newValue);
        }
    }

    useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <div className={styles.rating}>
            <div className={styles.rating__rate}>
                <div className={classNames({
                    [styles.rating__stars]: true,
                    [styles.stars__small]: size === 'small',
                    [styles.stars__full]: size !== 'small'
                })}>
                    <MURaring
                        name="rating"
                        value={rate}
                        onChange={onRate}
                        readOnly={isAdmin}
                    />
                </div>
                {size !== 'small' && (
                    <div className={styles.rating__value}>
                        ({rate})
                    </div>
                )}
            </div>
            {description && size !== 'small' && (
                <div className={styles.rating__description}>
                    {description}
                </div>
            )}
        </div>
    )


    
})

export default Rating