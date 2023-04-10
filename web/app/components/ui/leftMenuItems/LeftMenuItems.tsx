import { FC, memo, useContext } from "react";

import {  List } from "@mui/material";
import { RoleContext } from "@/app/providers/roleContextProvider";
import LeftMenuItem from "@/app/components/ui/leftMenuItem/LeftMenuItem";
import { ILeftMenuItem } from "../leftMenuItem/leftMenuItem.type";
import CreateItem from "../leftMenuItem/CreateItem";

interface IProps {
  options: ILeftMenuItem[]
  linkTo: string
}

const LeftMenuItems: FC<IProps> = memo(({options, linkTo}) => {
  const { isAdmin } = useContext(RoleContext);

  return (
    <List
      component="ul"
      sx={{
        height: "90vh",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        "& ul": { padding: 0 },
      }}
    >
      {isAdmin && <CreateItem linkTo={linkTo} />}
      {options.map((manufacturer) => (
        <LeftMenuItem key={manufacturer.id} {...manufacturer} linkTo={linkTo} />
      ))}
    </List>
  );
});

export default LeftMenuItems;
