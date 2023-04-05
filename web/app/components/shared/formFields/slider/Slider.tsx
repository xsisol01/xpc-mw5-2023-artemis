import { useEffect, FC, memo } from 'react'
import { useForm } from "react-hook-form"

import { isValid } from './slider.validation'


import FormInput from '../FormInput'
import { Grid } from '@mui/material'
import { SliderData } from './slider.data'

export interface ISliderProps {
    uid: string,
    inputType?: string
    unit?: string
    getParam: (name: string) => string
    setParam: (name: string, value: string) => void
}

const Slider: FC<ISliderProps> = memo(({uid, getParam, setParam, unit = ''}) => {
    const minId = `${uid}-${SliderData.min}`
    const maxId = `${uid}-${SliderData.max}`

    const defaultValues = {
        [minId]: getParam(minId) || '',
        [maxId]: getParam(maxId) || ''
    }

    const { getValues, watch, control } = useForm({ defaultValues });

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if(name && value && isValid(getValues(minId), getValues(maxId))) {
                setParam(name, value[name] ?? '')
            }
        } );

        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <form>
            <Grid container spacing={2}>
                {Object.keys(defaultValues).map(k => (
                    <Grid item xs={6} key={k}>
                        <FormInput
                            control={control}
                            name={k}
                            placeholder={k === minId ? SliderData.min : SliderData.max}
                            endAdornment={unit?.length ? <div>{unit}</div> : ''}
                        />
                    </Grid>
                ))}
            </Grid>
        </form>
    )
})

export default Slider