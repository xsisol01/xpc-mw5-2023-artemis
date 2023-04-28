import { FC, memo, ReactNode } from "react";

import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import LeftMenuLayout from "@/app/components/layout/leftMenuLayout/LeftMenuLayout";

interface IProps {
  leftMenuItems: any[] | undefined;
  linkTo: string;
  children: ReactNode;
}

const LeftMenuItemPage: FC<IProps> = memo(
  ({ leftMenuItems, linkTo, children }) => {
    return (
      <HeaderLayout>
        <LeftMenuLayout options={leftMenuItems} linkTo={linkTo}>
          {children}
        </LeftMenuLayout>
      </HeaderLayout>
    );
  }
);

LeftMenuItemPage.displayName = "LeftMenuItemPage";

export default LeftMenuItemPage;
