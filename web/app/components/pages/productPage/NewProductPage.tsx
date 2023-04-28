import { FC, memo, useContext } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import { newProductData } from "./newProduct.data";
import { ICreateProduct } from "@/app/types/product.type";
import { useCreateProduct } from "@/app/hooks/product/useCreateProduct";

import { Container } from "@mui/material";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import { RoleContext } from "@/app/providers/roleContextProvider";
import ProductForm from "@/app/components/shared/form/productForm/ProductForm";

const NewProductScreen: FC = memo(() => {
  const { push } = useRouter();
  const { isAdmin } = useContext(RoleContext);
  const { isLoading, createProduct } = useCreateProduct(newProductData);

  if (!isAdmin) {
    push("/");
    return null;
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
          defaultValues={newProductData}
          isLoading={isLoading}
        />
      </Container>
    </HeaderLayout>
  );
});

NewProductScreen.displayName = "NewProductScreen";

export default NewProductScreen;
