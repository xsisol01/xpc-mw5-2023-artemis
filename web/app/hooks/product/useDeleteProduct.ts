import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ProductService } from "@/app/services/product.service";

export const useDeleteProduct = (id: string) => {
  const router = useRouter();
  const { push } = router;

  const { isLoading, mutateAsync: deleteProduct } = useMutation(
    ["delete product", id],
    (id: string) => ProductService.delete(id),
    {
      onSuccess: () => {
        alert("Product has been deleted");

        push("/");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { isLoading, deleteProduct };
};
