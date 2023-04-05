import { FC, memo } from "react";
import Link from "next/link";

import { IManufacturer } from "@/app/types/manufacturer.type";

import { capitalize,ListItem, ListItemButton, Typography } from "@mui/material";

const ManufacturerItem: FC<IManufacturer> = memo(({ id, name }) => {

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
          href="/manufacturer/[pid]"
          as={`/manufacturer/${id}`}
        >
          <Typography variant="h6">{capitalize(name)}</Typography>
        </Link>
      </ListItemButton>
    </ListItem>
  );
});

export default ManufacturerItem;
