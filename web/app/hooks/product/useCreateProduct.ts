import { RoleContext } from '@/app/providers/roleContextProvider';
import { routes } from '@/app/data/routes';
import { useRouter } from 'next/router';
import { notificationType } from '@/app/providers/notificationContextProvider';
import { useContext } from 'react';
import { NotificationContext } from '@/app/providers/notificationContextProvider';
import { ICreateProduct } from "@/app/types/product.type";
import { useMutation } from "react-query";
import { ProductService } from "@/app/services/product.service";

export const useCreateProduct = (data: ICreateProduct) => {
  const {push} = useRouter()
  const {setIsAdmin} = useContext(RoleContext)

  const {addMessage} = useContext(NotificationContext)
  const {
    isLoading,
    mutateAsync: createProduct,
    isSuccess,
  } = useMutation(
    ["create product", data],
    (data: ICreateProduct) => ProductService.create(data),
    {
      onSuccess: ({data}) => {
        addMessage({
          type: notificationType.success,
          text: "Product has been created"
        })

        console.log(data)

        push(`${routes.product}/${data.id}`)
        
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "Product has not been created"
        })
        console.log(error);
      },
    }
  );

  return { isLoading, createProduct, isSuccess };
};
