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
import { RoleContext } from "@/app/providers/roleContextProvider";
import { Rating as MURaring } from "@mui/material";

interface IProps {
  rate: number;
  size?: string;
}

const Rating: FC<IProps> = memo(({ rate, size }) => {
  const [value, setValue] = useState<number | null>(0);
  const { isAdmin } = useContext(RoleContext);

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
    if (value !== 0) {
      console.log(value);
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
        value={rate}
        onChange={onRate}
        readOnly={isAdmin}
      />
    </div>
  );
});

export default Rating;
