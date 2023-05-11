import { FC, memo, ReactNode } from "react";
import { Controller } from "react-hook-form";

import { Autocomplete, capitalize, TextField } from "@mui/material";

interface IProps {
  options?: any;
  name: string;
  defaultValue?: any;
  control: any;
  endAdornment?: ReactNode;
  variant?: "outlined" | "standard" | "filled";
  sx?: any;
  style?: any;
  rows?: number;
  required?: boolean;
  validation: RegExp;
  placeholder?: string;
}

const FormSelect: FC<IProps> = memo(
  ({
    name,
    options,
    control,
    defaultValue,
    sx,
    rows,
    validation,
    placeholder,
  }) => {
    return (
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{
          pattern: {
            value: RegExp(validation),
            message: "",
          },
        }}
        render={(props) => (
          <Autocomplete
            {...props}
            id={name}
            disablePortal
            getOptionLabel={(option) => capitalize(option.name)}
            isOptionEqualToValue={(option, value) =>
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
                sx={{ width: "100%", ...sx }}
                required={true}
                inputRef={props.field.ref}
                rows={rows}
                multiline={!!rows && rows > 1}
                label={capitalize(placeholder ?? name)}
              />
            )}
          />
        )}
      />
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
