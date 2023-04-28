import { useEffect, FC, memo, useContext } from "react";
import { useForm } from "react-hook-form";

import { SliderData } from "./slider.data";
import { regex } from "@/app/data/regex";
import { UrlSearchParamsContext } from "@/app/providers/urlSearchParamsProvider";

import FormInput from "@/app/components/shared/formFields/formInput/FormInput";
import { Grid } from "@mui/material";

export interface ISliderProps {
  uid: string;
  inputType?: string;
  unit?: string;
  validation?: RegExp;
}

const Slider: FC<ISliderProps> = memo(({ uid, unit = "", validation }) => {
  const { getParam, setParam } = useContext(UrlSearchParamsContext);

  const minId = `${uid}${SliderData.min}`;
  const maxId = `${uid}${SliderData.max}`;

  const defaultValues = {
    [minId]: getParam(minId) ?? "",
    [maxId]: getParam(maxId) ?? "",
  };

  const { watch, control } = useForm({ defaultValues });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        setParam(name, value[name]?.toString() ?? "");
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setParam]);

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} key={minId}>
          <FormInput
            control={control}
            name={minId}
            placeholder={SliderData.min}
            endAdornment={unit?.length ? <div>{unit}</div> : ""}
            validation={validation ?? regex.all}
          />
        </Grid>
        <Grid item xs={12} md={6} key={maxId}>
          <FormInput
            control={control}
            name={maxId}
            placeholder={SliderData.max}
            endAdornment={unit?.length ? <div>{unit}</div> : ""}
            validation={validation ?? regex.all}
          />
        </Grid>
      </Grid>
    </form>
  );
});

Slider.displayName = "Slider";

export default Slider;
