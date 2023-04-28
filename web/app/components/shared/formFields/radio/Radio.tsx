import { useEffect, useState, FC, memo, useContext } from "react";

import { UrlSearchParamsContext } from "@/app/providers/urlSearchParamsProvider";
import { radioData } from "./radio.data";

import {
  RadioGroup,
  Radio as RadioField,
  FormControlLabel,
  FormControl,
} from "@mui/material";

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

const Radio: FC<IRadioProps> = memo(({ options, uid }) => {
  const { setParam, getParam } = useContext(UrlSearchParamsContext);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const paramValue = getParam(uid);

    if (paramValue) {
      setSelected(paramValue.toString());
    }
  }, [getParam, uid]);

  useEffect(() => {
    setParam(uid, selected);
  }, [selected, setParam, uid]);

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
        <FormControlLabel
          key={radioData.all.value}
          value={radioData.all.value}
          control={<RadioField />}
          label={radioData.all.text}
        />
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<RadioField />}
            label={option.text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
});

Radio.displayName = "Radio";

export default Radio;
