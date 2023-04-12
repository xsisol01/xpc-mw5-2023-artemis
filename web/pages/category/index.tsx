import { NextPage } from "next";
import RouteToFirstItem from "@/app/components/shared/routeToFirstItem/RouteToFirstItem";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { routes } from "@/app/data/routes";

const Categories: NextPage = () => {
  const { categories, isLoading } = useGetAllCategories();
  return (
    <RouteToFirstItem
      items={categories}
      isLoading={isLoading}
      baseUrl={routes.category}
    />
  );
};

export default Categories;
