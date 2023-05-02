import { NextPage } from "next";
import { useRouter } from "next/router";

import { routes } from "@/app/data/routes";

import LeftMenuItemPage from "@/app/components/pages/leftMenuPages/LeftMenuItemPage";
import ManufacturerPage from "@/app/components/pages/manufacturerPage/ManufacturerPage";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { IManufacturer } from "@/app/types/manufacturer.type";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import { useContext, useEffect } from "react";
import { ProductService } from "@/app/services/product.service";
import { IProduct } from "@/app/types/product.type";
import { ProductContext } from "@/app/providers/productContextProvider";
import ManufacturerScreen from "@/app/components/screens/manufacturerScreen/ManufacturerScreen";

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
  const { push } = useRouter();
  const { manufacturers, setManufacturers } = useContext(ManufacturerContext);
  const { setProducts } = useContext(ProductContext);

  useEffect(() => {
    setProducts(staticProducts);
  }, [staticProducts]);

  useEffect(() => {
    setManufacturers(staticManufacturers);
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
      <ManufacturerScreen {...staticManufacturer} />
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

  let staticProducts: IProduct[] | undefined= [];

  if (staticManufacturer && staticManufacturer.commodityIds.length) {
    staticProducts = await ProductService.getByIds(
      staticManufacturer.commodityIds
    );
  }

  return { props: { staticManufacturer, staticManufacturers, staticProducts } };
}
