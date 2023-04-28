import { ICreateProduct } from "@/app/types/product.type";
import { useMutation } from "react-query";
import { ProductService } from "@/app/services/product.service";

export const useCreateProduct = (data: ICreateProduct) => {
  const {
    isLoading,
    mutateAsync: createProduct,
    isSuccess,
  } = useMutation(
    ["create product", data],
    (data: ICreateProduct) => ProductService.create(data),
    {
      onSuccess: () => {
        alert("Product has been created");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { isLoading, createProduct, isSuccess };
};
