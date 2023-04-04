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

    const getOpObj = (option: any) => {
      if (!option.id) option = options.find((op: any) => op.id === option);
      return option;
    };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
          <Autocomplete
              {...props}
              id={name}
              disablePortal
              getOptionLabel={option => capitalizeText(option.name)}
              isOptionEqualToValue={
                (option, value) => 
                  value !== 0 && option.id === value.id
              }
              defaultValue={defaultValue}
              onChange={(_, data) => props.field.onChange(data.id)}
              filterSelectedOptions={false}
              options={options}
              renderInput={(params) => (
                    <TextField
                      {...params}
                      {...props.field}
                      sx={{width: '100%', ...sx}}
                      required={true}
                      inputRef={props.field.ref}
                      rows={rows}
                      multiline={!!rows && rows > 1}
                      label={capitalizeText(name)}
                    />
                  )
              }
          />
        )
      }
  />
  )
}

export default FormSelect