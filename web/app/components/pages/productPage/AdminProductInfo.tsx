import { FC, memo } from "react";

import { SubmitHandler } from "react-hook-form";


import { IProduct } from "@/app/types/product.type";
import { useUpdateProduct } from "@/app/hooks/product/useUpdateProduct";
import ProductForm from "../../shared/form/productForm/ProductForm";

const AdminProductInfo: FC<IProduct> = memo((props) => {
  const { isLoading, updateProduct } = useUpdateProduct(props);

  const onSubmit: SubmitHandler<IProduct> = async (data: IProduct) => {
    const updatedProduct: IProduct = {
      ...data,
      averageRating: Number(data.averageRating),
      price: Number(data.price),
      weight: Number(data.weight),
      stockQuantity: Number(data.stockQuantity),
    };

    await updateProduct(updatedProduct);
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
