import { NextPage } from "next";

import RouteToFirstItem from "@/app/components/shared/routeToFirstItem/RouteToFirstItem";
import { routes } from "@/app/data/routes";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { IManufacturer } from "@/app/types/manufacturer.type";
import { useContext, useEffect } from "react";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import LeftMenuItemPage from "@/app/components/pages/leftMenuPages/LeftMenuItemPage";
import ManufacturerScreen from "@/app/components/screens/manufacturerScreen/ManufacturerScreen";

interface IProps {
  staticManufacturers: IManufacturer[];
}

const AllManufacturers: NextPage<IProps> = ({ staticManufacturers }) => {
  const { manufacturers, setManufacturers } = useContext(ManufacturerContext);

  useEffect(() => {
    setManufacturers(staticManufacturers);
  });

  if (!staticManufacturers.length) {
    return (
      <LeftMenuItemPage leftMenuItems={staticManufacturers} linkTo={routes.manufacturer}>
        <ManufacturerScreen  />
      </LeftMenuItemPage>
    )
  }

  return (
    <RouteToFirstItem items={manufacturers} baseUrl={routes.manufacturer} />
  );
};

export default AllManufacturers;

export async function getServerSideProps() {
  const staticManufacturers = await ManufacturerService.getAll();

  return { props: { staticManufacturers } };
}
