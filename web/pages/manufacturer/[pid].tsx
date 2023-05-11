import { NextPage } from "next";

import { routes } from "@/app/data/routes";

import LeftMenuItemPage from "@/app/components/pages/leftMenuPages/LeftMenuItemPage";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { IManufacturer } from "@/app/types/manufacturer.type";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import { useContext, useEffect } from "react";
import { IProduct } from "@/app/types/product.type";
import { ProductContext } from "@/app/providers/productContextProvider";
import ManufacturerScreen from "@/app/components/screens/manufacturerScreen/ManufacturerScreen";
import Preloader from "@/app/components/shared/preloader/Preloader";

interface IProps {
  staticManufacturer: IManufacturer;
  staticManufacturers: IManufacturer[];
  staticProducts: IProduct[];
}

const Manufacturer: NextPage<IProps> = ({
  staticManufacturers,
  staticManufacturer,
  staticProducts,
}) => {
  const { manufacturers, setManufacturers } = useContext(ManufacturerContext);
  const { setProducts } = useContext(ProductContext);

  useEffect(() => {
    setProducts(staticProducts);
  }, [staticProducts]);

  useEffect(() => {
    setManufacturers(staticManufacturers);
  }, [staticManufacturers]);

  if (!staticManufacturers || !staticManufacturer) {
    return <Preloader />;
  }

  return (
    <LeftMenuItemPage
      leftMenuItems={manufacturers}
      linkTo={routes.manufacturer}
    >
      <ManufacturerScreen manufacturer={staticManufacturer} />
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
  const staticProducts = await ManufacturerService.getProducts(pid);

  return { props: { staticManufacturer, staticManufacturers, staticProducts } };
}
