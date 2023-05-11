import { FC, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  capitalize,
  CircularProgress,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { ILeftMenuItem } from "./leftMenuItem.type";

interface IProps {
  linkTo: string;
}

const LeftMenuItem: FC<ILeftMenuItem & IProps> = memo(
  ({ id, name, linkTo }) => {
    const router = useRouter();
    const { query } = router;

    if (!id || !name) return <CircularProgress />;

    const isActive = () => {
      return router.isReady && query.pid === id;
    };

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
            href={{
              pathname: `${linkTo}/[pid]`,
              query: { pid: id },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: isActive() ? 700 : 400,
              }}
            >
              {capitalize(name)}
            </Typography>
          </Link>
        </ListItemButton>
      </ListItem>
    );
  }
);

LeftMenuItem.displayName = "LeftMenuItem";

export default LeftMenuItem;
