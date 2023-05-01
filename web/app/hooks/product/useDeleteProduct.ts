import { notificationType } from '@/app/providers/notificationContextProvider';
import { useContext } from 'react';
import { NotificationContext } from '@/app/providers/notificationContextProvider';
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ProductService } from "@/app/services/product.service";

export const useDeleteProduct = (id: string) => {
  const {addMessage} = useContext(NotificationContext)
  const router = useRouter();
  const { push } = router;

  const { isLoading, mutateAsync: deleteProduct } = useMutation(
    ["delete product", id],
    (id: string) => ProductService.delete(id),
    {
      onSuccess: () => {
        addMessage({
          type: notificationType.success,
          text: "Product has been deleted"
        })

        push("/");
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "Product has not been deleted"
        })
        console.log(error);
      },
    }
  );

  return { isLoading, deleteProduct };
};
