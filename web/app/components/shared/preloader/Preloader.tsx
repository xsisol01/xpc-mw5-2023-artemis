import { Box, CircularProgress } from "@mui/material";
import { FC, memo } from "react";

const Preloader: FC = memo(() => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
    >
      <CircularProgress
        style={{
          width: "60px",
          height: "60px",
        }}
        sx={{
          "& svg": {
            width: "60px",
            height: "60px",
          },
        }}
      />
    </Box>
  );
});

Preloader.displayName = "Preloader";

export default Preloader;
