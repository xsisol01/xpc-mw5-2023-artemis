import { NextPage } from "next";

import CreateCategory from "@/app/components/pages/categoryPage/CreateCategoryPage";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { routes } from "@/app/data/routes";
import NewLeftMenuItem from "@/app/components/pages/leftMenuPages/NewLeftMenuItemPage";

const Category: NextPage = () => {
  const { categories, isLoading } = useGetAllCategories();

  return (
    <NewLeftMenuItem
      items={categories}
      isLoading={isLoading}
      linkTo={routes.category}
    >
      <CreateCategory />
    </NewLeftMenuItem>
  );
};

export default Category;
