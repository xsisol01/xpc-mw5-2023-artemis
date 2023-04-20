import {
  FC,
  memo,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";

import classNames from "classnames";

import styles from "./rating.module.scss";
import { Rating as MURaring } from "@mui/material";

interface IProps {
  rate?: number;
  size?: string;
  readOnly?: boolean;
  disabled?: boolean;
  noRatingGiven?: boolean;
  onChange?: (value: number | null) => void;
}

const Rating: FC<IProps> = memo(
  ({
    rate = 0,
    size,
    readOnly = true,
    disabled = false,
    noRatingGiven = false,
    onChange,
  }) => {
    const [value, setValue] = useState<number | null>(rate);

    function onRate(
      event: SyntheticEvent<Element, Event>,
      newValue: number | null
    ) {
      event.preventDefault();
      event.stopPropagation();

      if (value !== newValue) {
        setValue(newValue);
      }
    }

    useEffect(() => {
      if (onChange) {
        onChange(value);
      }
    }, [value]);

    return (
      <div
        className={classNames({
          [styles.rating__stars]: true,
          [styles.stars__small]: size === "small",
          [styles.stars__full]: size !== "small",
        })}
      >
        <MURaring
          name="rating"
          value={noRatingGiven ? null : rate}
          onChange={onRate}
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    );
  }
);

export default Rating;
