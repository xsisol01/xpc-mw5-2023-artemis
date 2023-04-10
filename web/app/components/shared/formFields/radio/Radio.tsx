import { capitalizeText } from "@/app/utils/capitalizeText";
import {
  RadioGroup,
  Radio as RadioField,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { FC, memo } from "react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./radio.module.scss";

type IOption = {
  text: string;
  value: string;
};

export interface IRadioProps {
  options: IOption[];
  uid: string;
  setParam?: (name: string, value: string) => void;
  getParam?: (name: string) => string;
}

const Radio: FC<IRadioProps> = memo(({ options, uid, setParam, getParam }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (getParam) {
      const paramValue = getParam(uid);

      if (paramValue) {
        setSelected(paramValue);
      }
    }
  }, []);

  useEffect(() => {
    if (setParam) {
      setParam(uid, selected);
    }
  }, [selected]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={selected}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<RadioField />}
            label={option.text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
});

export default Radio;
