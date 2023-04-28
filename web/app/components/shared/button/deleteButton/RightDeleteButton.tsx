import { FC, memo, ReactNode } from "react";

import { Box } from "@mui/material";
import DeleteButton from "./DeleteButton";

interface IProps {
  id: string;
  elementType: string;
  children?: ReactNode;
}

const RightDeleteButton: FC<IProps> = memo(({ id, elementType, children }) => {
  return (
    <Box
      component="div"
      sx={{ display: "flex", justifyContent: "end", height: 40, mt: 2 }}
    >
      <DeleteButton id={id} elementType={elementType}>
        {children}
      </DeleteButton>
    </Box>
  );
});

RightDeleteButton.displayName = "RightDeleteButton";

export default RightDeleteButton;
