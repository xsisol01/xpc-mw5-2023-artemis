import { ProductContext } from './../../providers/productContextProvider';
import { routes } from '@/app/data/routes';
import { notificationType } from '@/app/providers/notificationContextProvider';
import { useContext } from 'react';
import { NotificationContext } from '@/app/providers/notificationContextProvider';
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ProductService } from "@/app/services/product.service";

export const useDeleteProduct = (id: string) => {
  const {addMessage} = useContext(NotificationContext)
  const {setProducts} = useContext(ProductContext)
  const {push} = useRouter();

  const { isLoading, mutateAsync: deleteProduct } = useMutation(
    ["delete product", id],
    (id: string) => ProductService.delete(id),
    {
      onSuccess: () => {
        addMessage({
          type: notificationType.success,
          text: "Product has been deleted"
        })

        setProducts(prev => prev.filter(product => product.id !== id))

        push(routes.home);
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
