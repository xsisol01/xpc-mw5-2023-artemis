import Head from "next/head";
import HomeScreen from "@/app/components/screens/homeScreen/HomeScreen";
import { ProductService } from "@/app/services/product.service";
import { IProduct } from "@/app/types/product.type";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { CategoryService } from "@/app/services/category.service";
import { IManufacturer } from "@/app/types/manufacturer.type";
import { ICategory } from "@/app/types/category.type";
import { useContext, useEffect } from "react";
import { ProductContext } from "@/app/providers/productContextProvider";
import { CategoryContext } from "@/app/providers/categoryContextProvider";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";

interface IProps {
  staticProducts: IProduct[];
  staticManufacturers: IManufacturer[];
  staticCategories: ICategory[];
}

export default function Home({
  staticProducts,
  staticManufacturers,
  staticCategories,
}: IProps) {
  const { setProducts } = useContext(ProductContext);
  const { setCategories } = useContext(CategoryContext);
  const { setManufacturers } = useContext(ManufacturerContext);

  useEffect(() => {
    setProducts(staticProducts);
    setCategories(staticCategories);
    setManufacturers(staticManufacturers);
  }, []);

  return (
    <>
      <Head>
        <title>xpc-mw5</title>
        <meta name="description" content="xpc-mw5" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeScreen />
    </>
  );
}

export async function getServerSideProps() {
  const staticProducts = await ProductService.getAll();
  const staticManufacturers = await ManufacturerService.getAll();
  const staticCategories = await CategoryService.getAll();

  return { props: { staticProducts, staticManufacturers, staticCategories } };
}
