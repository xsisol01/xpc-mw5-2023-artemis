import { FC, ReactNode } from "react";
import { Controller, FieldValues, Validate } from "react-hook-form";

import { capitalizeText } from "@/app/utils/capitalizeText";

import { TextField } from "@mui/material";
import { regex } from "@/app/data/regex";


interface IProps {
  name: string
  defaultValue?: string | number
  placeholder?: string
  control: any
  endAdornment?: ReactNode
  variant?: 'outlined' | 'standard' | 'filled'
  sx?: any
  style?: any
  rows?: number
  required?: boolean
  validation?: RegExp
}

const FormInput: FC<IProps> = ({
  name,
  defaultValue = '',
  control,
  endAdornment,
  variant = 'outlined',
  sx,
  style,
  rows,
  required = false,
  placeholder,
  validation = regex.all
  }
  ) => {

  const isValid = (value: string) => {
    return validation.test(value)
  }

  const getValidValue = (value: string) => {
    if (value[value.length - 1] === '.') {
      return value
    }

    const execObj = validation?.exec(value)
    return execObj ? execObj[0] : ''
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required,
        pattern: {
          value: validation,
          message: ''
        }
      }}
      render={({ field: { onChange, value } }) => (
          <TextField
              required={required}
              id={name}
              label={capitalizeText(placeholder ?? name)}
              variant={variant}
              multiline={!!rows && rows > 1}
              value={value === 0 ? '' : getValidValue(value)}
              rows={rows}
              onChange={onChange}
              sx={{width: '100%', ...sx}}
              InputProps={{
                  endAdornment,
                  style: { width: "100%", ...style },
              }}
              error={!isValid}
          />
      )}
    />
  )
}

export default FormInput