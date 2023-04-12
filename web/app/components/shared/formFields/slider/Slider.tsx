import { useEffect, FC, memo } from "react";
import { useForm } from "react-hook-form";

import FormInput from "../formInput/FormInput";
import { Grid } from "@mui/material";
import { SliderData } from "./slider.data";
import { regex } from "@/app/data/regex";

export interface ISliderProps {
  uid: string;
  inputType?: string;
  unit?: string;
  validation?: RegExp;
  getParam?: (name: string) => string;
  setParam?: (name: string, value: string) => void;
}

const Slider: FC<ISliderProps> = memo(
  ({ uid, getParam, setParam, unit = "", validation }) => {
    const minId = `${uid}${SliderData.min}`;
    const maxId = `${uid}${SliderData.max}`;

    if (!getParam || !setParam) {
      return null;
    }

    const defaultValues = {
      [minId]: getParam(minId) || "",
      [maxId]: getParam(maxId) || "",
    };

    const { watch, control } = useForm({ defaultValues });

    useEffect(() => {
      const subscription = watch((value, { name }) => {
        if (name) {
          setParam(name, value[name] ?? "");
        }
      });

      return () => subscription.unsubscribe();
    }, [watch]);

    return (
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6} key={minId}>
            <FormInput
              control={control}
              name={minId}
              placeholder={SliderData.min}
              endAdornment={unit?.length ? <div>{unit}</div> : ""}
              validation={validation ?? regex.all}
            />
          </Grid>
          <Grid item xs={6} key={maxId}>
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
  }
);

export default Slider;
