import { Box } from "@mui/material";
import { FC } from "react";
import SubmitButton from "./SubmitButton";

interface IProps {
  disabled: boolean;
}

const RightSubmitButton: FC<IProps> = ({ disabled }) => {
  return (
    <Box
      component="div"
      sx={{ display: "flex", justifyContent: "end", height: 40 }}
    >
      <SubmitButton disabled={disabled} />
    </Box>
  );
};

export default RightSubmitButton;
