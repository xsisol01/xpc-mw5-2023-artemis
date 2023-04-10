import { FC, memo } from "react";
import Link from "next/link";

import { capitalize,CircularProgress,ListItem, ListItemButton, Typography } from "@mui/material";
import { ILeftMenuItem } from "./leftMenuItem.type";

interface IProps {
  linkTo: string
}

const LeftMenuItem: FC<ILeftMenuItem & IProps> = memo(({ id, name, linkTo }) => {

  if (!id || !name) return <CircularProgress />

  return (
    <ListItem disablePadding component="li" key={id}>
      <ListItemButton
        sx={{
          p: 0,
          my: 1,
          "& a": {
            width: "100%",
            height: "100%",
            padding: 1,
          },
        }}
      >
        <Link
          href={`/${linkTo}/[pid]`}
          as={`/${linkTo}/${id}`}
        >
          <Typography variant="h6">{capitalize(name)}</Typography>
        </Link>
      </ListItemButton>
    </ListItem>
  );
});

export default LeftMenuItem;
