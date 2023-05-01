import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import ProductScreen from "@/app/components/screens/productScreen/ProductScreen";
import { CategoryContext } from "@/app/providers/categoryContextProvider";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import { CategoryService } from "@/app/services/category.service";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { ProductService } from "@/app/services/product.service";
import { ICategory } from "@/app/types/category.type";
import { IManufacturer } from "@/app/types/manufacturer.type";
import { IProduct } from "@/app/types/product.type";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

interface IProps {
  staticProduct: IProduct;
  staticCategories: ICategory[];
  staticManufacturers: IManufacturer[];
}

const Product: NextPage<IProps> = ({
  staticProduct,
  staticCategories,
  staticManufacturers,
}) => {
  const { push } = useRouter();

  const { setCategories } = useContext(CategoryContext);
  const { setManufacturers } = useContext(ManufacturerContext);

  useEffect(() => {
    setCategories(staticCategories);
    setManufacturers(staticManufacturers);
  }, [staticCategories, staticManufacturers]);

  if (!staticProduct) {
    push("/404");
  }

  return (
    <HeaderLayout>
      <ProductScreen product={staticProduct} />
    </HeaderLayout>
  );
};

export default Product;

interface IServerSideProps {
  params: {
    pid: string;
  };
}

export async function getServerSideProps({
  params: { pid },
}: IServerSideProps) {
  const staticProduct = await ProductService.get(pid);
  const staticManufacturers = await ManufacturerService.getAll();
  const staticCategories = await CategoryService.getAll();

  return { props: { staticProduct, staticManufacturers, staticCategories } };
}
