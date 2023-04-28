import { NextPage } from "next";
import { useRouter } from "next/router";

import { routes } from "@/app/data/routes";

import LeftMenuItemPage from "@/app/components/pages/leftMenuPages/LeftMenuItemPage";
import ManufacturerPage from "@/app/components/pages/manufacturerPage/ManufacturerPage";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { IManufacturer } from "@/app/types/manufacturer.type";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import { useContext, useEffect } from "react";

interface IProps {
  staticManufacturer: IManufacturer;
  staticManufacturers: IManufacturer[];
}

const Manufacturer: NextPage<IProps> = ({
  staticManufacturers,
  staticManufacturer,
}) => {
  const { push } = useRouter();
  const { manufacturers, setManufacturers } = useContext(ManufacturerContext);

  useEffect(() => {
    if (!manufacturers.length) {
      setManufacturers(staticManufacturers);
    }
  }, [staticManufacturers]);

  if (!staticManufacturer || !staticManufacturers) {
    push("/404");
    return null;
  }

  return (
    <LeftMenuItemPage
      leftMenuItems={manufacturers}
      linkTo={routes.manufacturer}
    >
      <ManufacturerPage manufacturer={staticManufacturer} />
    </LeftMenuItemPage>
  );
};

export default Manufacturer;

interface IServerSideProps {
  params: {
    pid: string;
  };
}

export async function getServerSideProps({
  params: { pid },
}: IServerSideProps) {
  const staticManufacturer = await ManufacturerService.get(pid);
  const staticManufacturers = await ManufacturerService.getAll();

  return { props: { staticManufacturer, staticManufacturers } };
}
