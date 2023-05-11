import { routes } from "@/app/data/routes";
import { notificationType } from "@/app/providers/notificationContextProvider";
import { NotificationContext } from "@/app/providers/notificationContextProvider";
import { RoleContext } from "@/app/providers/roleContextProvider";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { ProductService } from "@/app/services/product.service";
import { IProduct } from "@/app/types/product.type";

export const useUpdateProduct = (data: IProduct) => {
  const { addMessage } = useContext(NotificationContext);
  const { push } = useRouter();
  const { setIsAdmin } = useContext(RoleContext);

  const { isLoading, mutateAsync: updateProduct } = useMutation(
    ["update product", data],
    (data: IProduct) => ProductService.update(data),
    {
      onSuccess: ({ config }) => {
        addMessage({
          type: notificationType.success,
          text: "Product has been updated",
        });

        const { data } = config;
        const parsedData = JSON.parse(data);

        push(`${routes.product}/${parsedData.id}`);
        setIsAdmin(false);
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "Product has not been updated",
        });
        console.log(error);
      },
    }
  );

  return { isLoading, updateProduct };
};
