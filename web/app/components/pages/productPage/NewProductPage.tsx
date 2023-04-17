import { FC, memo, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import { newProductData } from "./newProduct.data";
import { productPageData } from "@/app/components/pages/productPage/productPage.data";
import { ICreateProduct, IProductField } from "@/app/types/product.type";
import { capitalizeText } from "@/app/utils/capitalizeText";

import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { useCreateProduct } from "@/app/hooks/product/useCreateProduct";

import { Container, Grid } from "@mui/material";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";
import FormSelect from "@/app/components/shared/formFields/formSelect/FormSelect";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import UploadImage from "@/app/components/shared/button/uploadImage/UploadImage";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import { RoleContext } from "@/app/providers/roleContextProvider";
import ProductForm from "../../shared/form/productForm/ProductForm";

const NewProductScreen: FC = memo(() => {
  const { push } = useRouter();
  const { isAdmin } = useContext(RoleContext);
  const { currentManufacturer } = useContext(ManufacturerContext);
  const { isLoading, createProduct } = useCreateProduct(newProductData);

  if (!isAdmin) {
    push("/");
    return null;
  }

  let defaultValues = newProductData;

  if (currentManufacturer) {
    defaultValues = {
      ...newProductData,
      manufacturerId: currentManufacturer,
    };
  }

  const onSubmit: SubmitHandler<ICreateProduct> = async (
    data: ICreateProduct
  ) => {
    await createProduct(data);
  };

  return (
    <HeaderLayout>
      <Container>
        <ProductForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          isLoading={isLoading}
        />
      </Container>
    </HeaderLayout>
  );
});

export default NewProductScreen;
