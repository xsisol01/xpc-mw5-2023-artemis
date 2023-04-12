import { CircularProgress } from "@mui/material";
import { FC, ReactNode } from "react";
import HeaderLayout from "../headerLayout/HeaderLayout";
import LeftMenuLayout from "./LeftMenuLayout";

interface IProps {
  isLoading: boolean;
  items: any[] | undefined;
  linkTo: string;
  children: ReactNode;
}

const NewLeftMenuItemPage: FC<IProps> = ({
  isLoading,
  items,
  linkTo,
  children,
}) => {
  return (
    <HeaderLayout>
      {isLoading && <CircularProgress />}
      {items && (
        <LeftMenuLayout options={items} linkTo={linkTo}>
          {children}
        </LeftMenuLayout>
      )}
    </HeaderLayout>
  );
};

export default NewLeftMenuItemPage;
