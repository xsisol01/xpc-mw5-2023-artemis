import { FC, memo, useContext, useEffect, useState } from "react";

import { ScrollableListData } from "./scrollableList.data";
import { getLoweredLetters } from "@/app/utils/getLoweredLetters";
import { isTextEqual } from "@/app/utils/isTextEqual";
import { UrlSearchParamsContext } from "@/app/providers/urlSearchParamsProvider";

import {
  capitalize,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export type IOption = {
  id: string;
  name: string;
};

export interface IScrollableListProps {
  options?: IOption[];
  maxHeight?: number;
  uid: string;
}

const ScrollableList: FC<IScrollableListProps> = memo(({ uid, options }) => {
  const [selected, setSelected] = useState<string>(ScrollableListData.all.id);
  const { getParam, setParam } = useContext(UrlSearchParamsContext);

  useEffect(() => {
    const defaultSelected = getParam(uid);

    if (defaultSelected?.length) {
      setSelected(defaultSelected.toString());
    }
  }, [uid]);

  useEffect(() => {
    const param = getLoweredLetters(selected ?? "");

    setParam(uid, param);
  }, [selected, uid]);

  function getIsSelected(optionId: string) {
    return isTextEqual(selected ?? "", optionId);
  }

  function getOptionText(option: IOption, type: string) {
    return getIsSelected(option.id) && type === "primary"
      ? capitalize(option.name)
      : !getIsSelected(option.id) && type === "secondary"
      ? capitalize(option.name)
      : null;
  }

  return (
    <ul>
      <ListItemButton
        onClick={() => setSelected(ScrollableListData.all.id)}
        sx={{ height: 40 }}
      >
        <ListItem sx={{ p: 0 }}>
          <ListItemText
            secondary={getOptionText(ScrollableListData.all, "secondary")}
            primary={getOptionText(ScrollableListData.all, "primary")}
          />
        </ListItem>
      </ListItemButton>
      {options?.map((item) => (
        <ListItemButton
          key={item.id}
          onClick={() => setSelected(item.id)}
          sx={{ height: 40 }}
        >
          <ListItem sx={{ p: 0 }}>
            <ListItemText
              secondary={getOptionText(item, "secondary")}
              primary={getOptionText(item, "primary")}
            />
          </ListItem>
        </ListItemButton>
      ))}
    </ul>
  );
});

ScrollableList.displayName = "ScrollableList";

export default ScrollableList;
