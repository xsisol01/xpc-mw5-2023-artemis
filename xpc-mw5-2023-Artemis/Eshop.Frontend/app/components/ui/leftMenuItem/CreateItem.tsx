import { FC, memo } from "react";
import Link from "next/link";

import { ListItem, ListItemButton } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

interface IProps {
  linkTo: string;
}

const CreateItem: FC<IProps> = memo(({ linkTo }) => {
  return (
    <ListItem disablePadding component="li">
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
          href={{
            pathname: `${linkTo}/new`,
          }}
          style={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ccc",
            height: "48px",
          }}
        >
          <AddIcon sx={{ color: "#fff", fontSize: "40px" }} />
        </Link>
      </ListItemButton>
    </ListItem>
  );
});

CreateItem.displayName = "CreateItem";

export default CreateItem;
