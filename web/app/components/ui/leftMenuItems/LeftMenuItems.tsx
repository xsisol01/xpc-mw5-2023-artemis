import { FC, memo, useContext } from "react";

import { List } from "@mui/material";
import { RoleContext } from "@/app/providers/roleContextProvider";
import LeftMenuItem from "@/app/components/ui/leftMenuItems/leftMenuItem/LeftMenuItem";
import { ILeftMenuItem } from "./leftMenuItem/leftMenuItem.type";
import CreateItem from "./leftMenuItem/CreateItem";

interface IProps {
  options: ILeftMenuItem[] | undefined;
  linkTo: string;
}

const LeftMenuItems: FC<IProps> = memo(({ options, linkTo }) => {
  const { isAdmin } = useContext(RoleContext);

  return (
    <List
      component="ul"
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        p: 0,
        "&::-webkit-scrollbar": {
          width: "3px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#fff",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "4px",
        },
      }}
    >
      {isAdmin && <CreateItem linkTo={linkTo} />}
      {options?.map((option) => (
        <LeftMenuItem key={option.id} {...option} linkTo={linkTo} />
      ))}
    </List>
  );
});

export default LeftMenuItems;
