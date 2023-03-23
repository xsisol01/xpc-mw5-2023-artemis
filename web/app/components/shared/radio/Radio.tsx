import {FC, memo} from 'react'

import { useEffect, useState } from 'react'

import styles from './radio.module.scss'

type IOption = {
  text: string
  value: string
}

export interface IRadioProps {
  options: IOption[]
  uid: string
  setParam: (name: string, value: string) => void
  getParam: (name: string) => string
}

const Radio: FC<IRadioProps> = memo(({options, uid, setParam, getParam}) => {
  const [selected, setSelected] = useState('')

  useEffect(() => {
    const paramValue = getParam(uid)

    if (paramValue) {
      setSelected(paramValue)
    }
  }, [])

  useEffect(() => {
    setParam(uid, selected)
  }, [selected])

  return (
    <div className={styles.radio}>
      {options.map(option => (
        <div key={option.value} className={styles.radio__option}>
          <input
            className={styles.radio__input}
            name={uid}
            value={option.value}
            type='radio'
            id={option.value}
            onChange={() => setSelected(option.value)}
            checked={option.value === selected}
            />
          <label className={styles.radio__label} htmlFor={option.value}>{option.text}</label>
        </div>
      ))}
    </div>
  )
})

export default Radio