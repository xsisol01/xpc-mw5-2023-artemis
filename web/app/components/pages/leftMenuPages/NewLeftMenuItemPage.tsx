import { FC, ReactNode, memo } from "react";

import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import LeftMenuLayout from "@/app/components/layout/leftMenuLayout/LeftMenuLayout";

interface IProps {
  items: any[] | undefined;
  linkTo: string;
  children: ReactNode;
}

const NewLeftMenuItemPage: FC<IProps> = memo(({ items, linkTo, children }) => {
  return (
    <HeaderLayout>
      {items && (
        <LeftMenuLayout options={items} linkTo={linkTo}>
          {children}
        </LeftMenuLayout>
      )}
    </HeaderLayout>
  );
});

NewLeftMenuItemPage.displayName = "NewLeftMenuItemPage";

export default NewLeftMenuItemPage;
