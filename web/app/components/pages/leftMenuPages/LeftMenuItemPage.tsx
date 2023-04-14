import { CircularProgress } from "@mui/material";
import { FC, ReactNode } from "react";
import HeaderLayout from "../../layout/headerLayout/HeaderLayout";

import LeftMenuLayout from "../../layout/leftMenuLayout/LeftMenuLayout";

interface IProps {
  leftMenuItems: any[] | undefined;
  linkTo: string;
  children: ReactNode;
}

const LeftMenuItemPage: FC<IProps> = ({
  leftMenuItems,
  linkTo,
  children,
}) => {
  return (
    <HeaderLayout>
      <LeftMenuLayout options={leftMenuItems} linkTo={linkTo}>
        {children}
      </LeftMenuLayout>
    </HeaderLayout>
  );
};

export default LeftMenuItemPage;
