import { FC, memo } from "react";

import { headerData } from "./header.data";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/material";
import Navbar from "@/app/components/ui/navbar/Navbar";

const Header: FC = memo(() => {
  return (
    <AppBar>
      <Toolbar sx={{ backgroundColor: "black" }}>
        <Typography noWrap={true} variant="h5" sx={{ mr: 2, fontWeight: 700 }}>
          {headerData.title.toUpperCase()}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Navbar />
        </Box>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = "Header";

export default Header;
