import { NextPage } from "next";

import CreateManufacturerPage from "@/app/components/pages/manufacturerPage/CreateManufacturerPage";
import { routes } from "@/app/data/routes";
import NewLeftMenuItem from "@/app/components/pages/leftMenuPages/NewLeftMenuItemPage";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { IManufacturer } from "@/app/types/manufacturer.type";
import { useContext, useEffect } from "react";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";

interface IProps {
  staticManufacturers: IManufacturer[];
}

const Manufacturer: NextPage<IProps> = ({ staticManufacturers }) => {
  const { manufacturers, setManufacturers } = useContext(ManufacturerContext);

  useEffect(() => {
    setManufacturers(staticManufacturers);
  }, []);

  return (
    <NewLeftMenuItem items={manufacturers} linkTo={routes.manufacturer}>
      <CreateManufacturerPage />
    </NewLeftMenuItem>
  );
};

export default Manufacturer;

export async function getServerSideProps() {
  const staticManufacturers = await ManufacturerService.getAll();

  return { props: { staticManufacturers } };
}
