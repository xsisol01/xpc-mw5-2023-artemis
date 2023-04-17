import { FC, memo } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { productPageData } from "@/app/components/pages/productPage/productPage.data";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { Grid } from "@mui/material";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { IProduct, IProductField } from "@/app/types/product.type";
import { useUpdateProduct } from "@/app/hooks/product/useUpdateProduct";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";
import FormSelect from "@/app/components/shared/formFields/formSelect/FormSelect";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import UploadImage from "@/app/components/shared/button/uploadImage/UploadImage";
import ProductForm from "../../shared/form/productForm/ProductForm";

const AdminProductInfo: FC<IProduct> = memo((props) => {
  const { isLoading, updateProduct } = useUpdateProduct(props);

  const onSubmit: SubmitHandler<IProduct> = async (data: IProduct) => {
    await updateProduct(data);
  };

  return (
    <ProductForm
      onSubmit={onSubmit}
      defaultValues={props}
      isLoading={isLoading}
    />
  );
});

export default AdminProductInfo;
