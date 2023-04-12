import { FC, memo } from "react";
import Link from "next/link";

import { capitalize,CircularProgress,ListItem, ListItemButton, Typography } from "@mui/material";
import { ILeftMenuItem } from "./leftMenuItem.type";
import { useRouter } from "next/router";

interface IProps {
  linkTo: string
}

const LeftMenuItem: FC<ILeftMenuItem & IProps> = memo(({ id, name, linkTo }) => {

  if (!id || !name) return <CircularProgress />

  const router = useRouter()
  const {query} = router

  const isActive = () => {
    return router.isReady && query.pid === id
  }

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
          href={`${linkTo}/[pid]`}
          as={`${linkTo}/${id}`}
        >
          <Typography
          variant="h6"
          sx={{
            fontWeight: isActive() ? 700 : 400
          }}
          >
            {capitalize(name)}
          </Typography>
        </Link>
      </ListItemButton>
    </ListItem>
  );
});

export default LeftMenuItem;
