import { useState, useEffect, ChangeEvent, FC, memo } from 'react'
import { useForm } from "react-hook-form"

import { isValid } from './slider.validation'

import styles from './slider.module.scss'

export interface ISliderProps {
    uid: string,
    inputType?: string
    getParam: (name: string) => string
    setParam: (name: string, value: string) => void
}

const Slider: FC<ISliderProps> = memo(({uid, getParam, setParam, inputType = 'number'}) => {
    const [data, setData] = useState({});

    const minId = `${uid}-min`
    const maxId = `${uid}-max`

    const defaultValues = {
        [minId]: getParam(minId),
        [maxId]: getParam(maxId)
    }

    const { register, handleSubmit, getValues } = useForm({ defaultValues });

    useEffect(() => {
        console.log('data', data)
    }, [data])

    return (
        <form
            className={styles.slider}
            onChange={handleSubmit((data) => setData(JSON.stringify(data)))}
            >
            <div className={styles.slider__inner}>

                <div className={styles.slider__item}>
                    <input
                        type={inputType}
                        className={styles.slider__input}
                        {...register(minId)}
                        placeholder='min'
                        onChange={
                            (e: ChangeEvent<HTMLInputElement>) => handleChange(minId, e.target.value)
                        }
                    />
                </div>

                <div className={styles.slider__item}>
                    <input
                        type={inputType}
                        className={styles.slider__input}
                        {...register(maxId)}
                        placeholder='max'
                        onChange={
                            (e: ChangeEvent<HTMLInputElement>) => handleChange(maxId, e.target.value)
                        }
                    />
                </div>

            </div>
        </form>
    )

    function handleChange(name: string, value: string) {
        if(isValid(getValues(minId), getValues(maxId))) {
            setParam(name, value)
        }
    }  
})

export default Slider