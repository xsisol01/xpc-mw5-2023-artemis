import { FC } from "react";
import { submitButtonData } from "./submitButton.data";

import { Button } from "@mui/material";

interface IProps {
  disabled: boolean
}

const SubmitButton: FC<IProps> = ({disabled}) => {

  return (
      <Button
          variant="contained"
          disabled={disabled}
          type="submit"
          color="success"
          sx={{
              backgroundColor: 'green'
          }}
      >
          {submitButtonData.submit}
      </Button>
  )
}

export default SubmitButton