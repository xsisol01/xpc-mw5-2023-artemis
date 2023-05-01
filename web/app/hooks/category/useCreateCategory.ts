import { routes } from '@/app/data/routes';
import { useRouter } from 'next/router';
import { notificationType } from '@/app/providers/notificationContextProvider';
import { NotificationContext } from '@/app/providers/notificationContextProvider';
import { useContext } from 'react';
import { ICreateCategory } from "../../types/category.type";

import { useMutation } from "react-query";

import { CategoryService } from "@/app/services/category.service";

export const useCreateCategory = (data: ICreateCategory) => {
  const {push} = useRouter()
  const {addMessage} = useContext(NotificationContext)

  const {
    isLoading,
    mutateAsync: createCategory,
    isSuccess,
  } = useMutation(
    ["create category", data],
    (data: ICreateCategory) => CategoryService.create(data),
    {
      onSuccess: () => {
        addMessage({
          type: notificationType.success,
          text: "Category has been created"
        })

        push(`${routes.category}/new`)
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "Category has not been created"
        })
        console.log(error);
      },
    }
  );

  return { isLoading, createCategory, isSuccess };
};
