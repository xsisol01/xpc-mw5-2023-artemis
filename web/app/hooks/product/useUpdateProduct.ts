import { useMutation } from "react-query";

import { ProductService } from "@/app/services/product.service";
import { IProduct } from "@/app/types/product.type";

export const useUpdateProduct = (data: IProduct) => {
  const { isLoading, mutateAsync: updateProduct } = useMutation(
    ["update product", data],
    (data: IProduct) => ProductService.update(data),
    {
      onSuccess: () => {
        alert("Product has been updated");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { isLoading, updateProduct };
};
