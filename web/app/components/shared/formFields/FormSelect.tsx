import { capitalizeText } from "@/app/utils/capitalizeText";
import { Autocomplete, TextField } from "@mui/material";
import { FC, ReactNode } from "react";
import { Controller } from "react-hook-form";

interface IProps {
  options: any
  name: string
  defaultValue?: any
  control: any
  endAdornment?: ReactNode
  variant?: 'outlined' | 'standard' | 'filled'
  sx?: any
  style?: any
  rows?: number
  required?: boolean
}

const FormSelect: FC<IProps> = (
  {
    name,
    options,
    control,
    defaultValue,
    sx,
    rows
  }) => {

    console.log('defaultValue', defaultValue)

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
      }) =>  {

        console.log('value   ', value)


        return (
          <Autocomplete
              id={name}
              disablePortal
              getOptionLabel={option => capitalizeText(option.name)}
              isOptionEqualToValue={
                (option, value) => 
                  option.name.toLowerCase() === value.name.toLowerCase()
              }
              defaultValue={value.name}
              value={value.name}
              onChange={onChange}
              filterSelectedOptions={false}
              options={options}
              renderInput={(params) =>
                {
                  console.log('params', params)
                  return (
                    <TextField
                      {...params}
                      sx={{width: '100%', ...sx}}
                      required={true}
                      rows={rows}
                      multiline={!!rows && rows > 1}
                      label={capitalizeText(name)}
                      InputProps={{
                        ...params.InputProps,
                        value: value.name,
                        onChange
                      }}
                    />
                  )
                } 
                  
              }
          />
      )
      }
      }
  />
  )
}

export default FormSelect