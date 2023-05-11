import { FC, memo } from "react";

import { adminButtonData } from "./adminButton.data";

import { Typography, Box } from "@mui/material";
import Switch from "@/app/components/shared/button/switch/Switch";

const AdminButton: FC = memo(() => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #fff",
        borderRadius: 1,
        pl: 1,
      }}
    >
      <Typography variant="h6">{adminButtonData.admin}</Typography>
      <Switch />
    </Box>
  );
});

AdminButton.displayName = "AdminButton";

export default AdminButton;
