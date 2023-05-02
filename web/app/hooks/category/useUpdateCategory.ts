import { updateItemInArrayById } from './../../utils/updateItemInArrayById';
import { CategoryContext } from '@/app/providers/categoryContextProvider';
import { useRouter } from 'next/router';
import { notificationType } from '@/app/providers/notificationContextProvider';
import { NotificationContext } from '@/app/providers/notificationContextProvider';
import { useContext } from "react";
import { useMutation } from "react-query";

import { CategoryService } from "@/app/services/category.service";
import { ICategory } from "@/app/types/category.type";
import { routes } from '@/app/data/routes';

export const useUpdateCategory = (data: ICategory) => {
  const {push, reload} = useRouter()
  const {addMessage} = useContext(NotificationContext)

  const { isLoading, mutateAsync: updateCategory } = useMutation(
    ["update category", data],
    (data: ICategory) => CategoryService.update(data),
    {
      onSuccess: ({config, data}) => {
        addMessage({
          type: notificationType.success,
          text: "Category has been updated"
        })

        const parsedData = JSON.parse(config.data)

        push(`${routes.category}/${parsedData.id}`)
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "Category has not been updated"
        })
        console.log(error);
      },
    }
  );

  return { isLoading, updateCategory };
};
