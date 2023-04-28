import { FC, memo } from "react";

import { Box } from "@mui/material";
import SubmitButton from "./SubmitButton";

interface IProps {
  disabled: boolean;
}

const RightSubmitButton: FC<IProps> = memo(({ disabled }) => {
  return (
    <Box
      component="div"
      sx={{ display: "flex", justifyContent: "end", height: 40, mt: 2 }}
    >
      <SubmitButton disabled={disabled} />
    </Box>
  );
});

RightSubmitButton.displayName = "RightSubmitButton";

export default RightSubmitButton;
