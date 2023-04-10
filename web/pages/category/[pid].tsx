import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import LeftMenuLayout from "@/app/components/layout/leftMenuLayout/LeftMenuLayout";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetCategory } from "@/app/hooks/category/useGetCategory";
import { CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";

import CategoryContent from "@/app/components/ui/categoryContent/CategoryContent";
import AdminCategoryContent from "@/app/components/ui/categoryContent/AdminCategoryContent";
import { useContext } from "react";
import { RoleContext } from "@/app/providers/roleContextProvider";

const Category: NextPage = () => {
  const { isAdmin } = useContext(RoleContext);
  const { query } = useRouter();
  const { pid } = query;

  if (!pid) {
    return <CircularProgress />;
  }

  const { category, isLoading } = useGetCategory(pid.toString());
  const { categories, isLoading: isCategoriesLoading } = useGetAllCategories();

  return (
    <HeaderLayout>
      {isCategoriesLoading && <CircularProgress />}
      {categories && (
        <LeftMenuLayout options={categories} linkTo="category">
          {isLoading && <CircularProgress />}
          {category && isAdmin && <AdminCategoryContent {...category} />}
          {category && !isAdmin && <CategoryContent {...category} />}
        </LeftMenuLayout>
      )}
    </HeaderLayout>
  );
};

export default Category;
