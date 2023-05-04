import { FC, memo } from "react";

import { submitButtonData } from "./submitButton.data";

import { Box, Button } from "@mui/material";

interface IProps {
  disabled: boolean;
}

const SubmitButton: FC<IProps> = memo(({ disabled }) => {
  return (
    <Box>
      <Button
        variant="contained"
        disabled={disabled}
        type="submit"
        color="success"
        sx={{
          backgroundColor: "#fff",
          color: "#388e3c",
          border: "1px solid #388e3c",
          "&:hover": {
            color: "#fff",
          },
        }}
      >
        {submitButtonData.submit}
      </Button>
    </Box>
  );
});

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
