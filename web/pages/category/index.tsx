import { NextPage } from "next";
import RouteToFirstItem from "@/app/components/shared/routeToFirstItem/RouteToFirstItem";
import { routes } from "@/app/data/routes";
import { CategoryService } from "@/app/services/category.service";
import { ICategory } from "@/app/types/category.type";
import { useContext, useEffect } from "react";
import { CategoryContext } from "@/app/providers/categoryContextProvider";

interface IProps {
  staticCategories: ICategory[];
}

const Categories: NextPage<IProps> = ({ staticCategories }) => {
  const {categories, setCategories} = useContext(CategoryContext)

  useEffect(() => {
    setCategories(staticCategories)
  }, [staticCategories])

  return (
    <RouteToFirstItem items={categories} baseUrl={routes.category} />
  );
};

export default Categories;

export async function getServerSideProps() {
  const staticCategories = await CategoryService.getAll();

  return { props: { staticCategories } };
}
