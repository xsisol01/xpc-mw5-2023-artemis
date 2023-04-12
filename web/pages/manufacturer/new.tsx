import { NextPage } from "next";

import CreateManufacturerPage from "@/app/components/pages/manufacturerPage/CreateManufacturerPage";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { routes } from "@/app/data/routes";
import NewLeftMenuItem from "@/app/components/layout/leftMenuLayout/NewLeftMenuItemPage";

const Manufacturer: NextPage = () => {
  const { manufacturers, isLoading } = useGetAllManufacturers();

  return (
    <NewLeftMenuItem
      items={manufacturers}
      isLoading={isLoading}
      linkTo={routes.manufacturer}
    >
      <CreateManufacturerPage />
    </NewLeftMenuItem>
  );
};

export default Manufacturer;
