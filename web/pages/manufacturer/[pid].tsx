import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { useGetManufacturer } from "@/app/hooks/manufacturer/useGetManufacturer";
import { routes } from "@/app/data/routes";

import LeftMenuItemPage from "@/app/components/layout/leftMenuLayout/LeftMenuItemPage";
import AdminManufacturerContent from "@/app/components/pages/manufacturerPage/AdminManufacturerPage";
import ManufacturerContent from "@/app/components/pages/manufacturerPage/ManufacturerPage";
import { RoleContext } from "@/app/providers/roleContextProvider";
import { CircularProgress } from "@mui/material";

const Manufacturer: NextPage = () => {
  const { isAdmin } = useContext(RoleContext);
  const { query } = useRouter();
  const { pid } = query;

  if (!pid) {
    return <CircularProgress />;
  }

  const { manufacturer, isLoading } = useGetManufacturer(pid.toString());
  const { manufacturers } = useGetAllManufacturers();

  return (
    <LeftMenuItemPage
      leftMenuItems={manufacturers}
      linkTo={routes.manufacturer}
    >
      {isLoading && <CircularProgress />}
      {manufacturer &&
        (isAdmin ? (
          <AdminManufacturerContent {...manufacturer} />
        ) : (
          <ManufacturerContent {...manufacturer} />
        ))}
    </LeftMenuItemPage>
  );
};

export default Manufacturer;
