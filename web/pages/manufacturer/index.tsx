import { NextPage } from "next";

import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import RouteToFirstItem from "@/app/components/shared/routeToFirstItem/RouteToFirstItem";
import { routes } from "@/app/data/routes";

const AllManufacturers: NextPage = () => {
  const { manufacturers, isLoading } = useGetAllManufacturers();

  return (
    <RouteToFirstItem
      items={manufacturers}
      isLoading={isLoading}
      baseUrl={routes.manufacturer}
    />
  );
};

export default AllManufacturers;
