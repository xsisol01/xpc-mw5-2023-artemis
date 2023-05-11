import { FC, useContext, memo } from "react";

import { RoleContext } from "@/app/providers/roleContextProvider";

import CategoryContent from "@/app/components/pages/categoryPage/CategoryContent";
import AdminCategoryContent from "@/app/components/pages/categoryPage/AdminCategoryPage";
import { ICategory } from "@/app/types/category.type";

interface IProps {
  category?: ICategory;
}

const CategoryPage: FC<IProps> = memo(({ category }) => {
  const { isAdmin } = useContext(RoleContext);

  return (
    <>
      {!category && <CategoryContent category={category} />}
      {category && isAdmin &&  <AdminCategoryContent category={category} />}
      {category && !isAdmin &&  <CategoryContent category={category} />}
    </>
  );
});

CategoryPage.displayName = "CategoryPage";

export default CategoryPage;
