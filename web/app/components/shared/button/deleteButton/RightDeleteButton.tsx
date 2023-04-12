import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import DeleteButton from "./DeleteButton";

interface IProps {
  id: string
  elementType: string
  children?: ReactNode
}

const RightDeleteButton: FC<IProps> = ({ id, elementType, children }) => {
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
};

export default RightDeleteButton;
