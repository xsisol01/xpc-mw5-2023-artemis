import { FC, ReactNode } from "react";
import { Controller } from "react-hook-form";

import { capitalizeText } from "@/app/utils/capitalizeText";

import { TextField } from "@mui/material";


interface IProps {
  name: string
  defaultValue?: string | number
  control: any
  endAdornment?: ReactNode
  variant?: 'outlined' | 'standard' | 'filled'
  sx?: any
  style?: any
  rows?: number
  required?: boolean
}

const FormInput: FC<IProps> = (
  {name, defaultValue = '', control, endAdornment, variant = 'outlined', sx, style, rows, required = false}
  ) => {

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
          <TextField
              required={required}
              id={name}
              label={capitalizeText(name)}
              variant={variant}
              multiline={!!rows && rows > 1}
              value={value}
              rows={rows}
              onChange={onChange}
              sx={{width: '100%', ...sx}}
              InputProps={{
                  endAdornment,
                  style: { width: "100%", ...style },
              }}
          />
      )}
    />
  )
}

export default FormInput