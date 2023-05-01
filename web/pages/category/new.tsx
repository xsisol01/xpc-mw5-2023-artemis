import { NextPage } from "next";

import CreateCategory from "@/app/components/pages/categoryPage/CreateCategoryPage";
import { routes } from "@/app/data/routes";
import NewLeftMenuItem from "@/app/components/pages/leftMenuPages/NewLeftMenuItemPage";
import { CategoryService } from "@/app/services/category.service";
import { ICategory } from "@/app/types/category.type";
import { memo, useContext, useEffect } from "react";
import { CategoryContext } from "@/app/providers/categoryContextProvider";

interface IProps {
  staticCategories: ICategory[];
}

const Category: NextPage<IProps> = memo(({ staticCategories }) => {
  const { categories, setCategories } = useContext(CategoryContext);

  useEffect(() => {
    setCategories(staticCategories);
  }, [staticCategories]);

  return (
    <NewLeftMenuItem items={categories} linkTo={routes.category}>
      <CreateCategory />
    </NewLeftMenuItem>
  );
});

Category.displayName = "Category";

export default Category;

export async function getServerSideProps() {
  const staticCategories = await CategoryService.getAll();

  return { props: { staticCategories } };
}
