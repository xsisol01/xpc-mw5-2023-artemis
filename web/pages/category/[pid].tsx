import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetCategory } from "@/app/hooks/category/useGetCategory";

import { CircularProgress } from "@mui/material";
import CategoryContent from "@/app/components/pages/categoryPage/CategoryContent";
import AdminCategoryContent from "@/app/components/pages/categoryPage/AdminCategoryPage";
import { RoleContext } from "@/app/providers/roleContextProvider";
import { routes } from "@/app/data/routes";
import LeftMenuItemPage from "@/app/components/pages/leftMenuPages/LeftMenuItemPage";

const Category: NextPage = () => {
  const { isAdmin } = useContext(RoleContext);
  const { query } = useRouter();
  const { pid } = query;

  if (!pid) {
    return <CircularProgress />;
  }

  const { category, isLoading } = useGetCategory(pid.toString());
  const { categories } = useGetAllCategories();

  return (
    <LeftMenuItemPage leftMenuItems={categories} linkTo={routes.category}>
      {isLoading && <CircularProgress />}
      {category &&
        (isAdmin ? (
          <AdminCategoryContent {...category} />
        ) : (
          <CategoryContent {...category} />
        ))}
    </LeftMenuItemPage>
  );
};

export default Category;
