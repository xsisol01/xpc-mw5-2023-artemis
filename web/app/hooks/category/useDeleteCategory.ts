import { notificationType } from "@/app/providers/notificationContextProvider";
import { useContext } from "react";
import { NotificationContext } from "@/app/providers/notificationContextProvider";
import { useRouter } from "next/router";

import { useMutation } from "react-query";

import { CategoryService } from "@/app/services/category.service";
import { routes } from "@/app/data/routes";

export const useDeleteCategory = (id: string) => {
  const { addMessage } = useContext(NotificationContext);
  const router = useRouter();
  const { push } = router;

  const { isLoading, mutateAsync: deleteCategory } = useMutation(
    ["delete category", id],
    (id: string) => CategoryService.delete(id),
    {
      onSuccess: () => {
        addMessage({
          type: notificationType.success,
          text: "Category has been deleted",
        });

        push(routes.category); 
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "Category has not been deleted",
        });
        console.log(error);
      },
    }
  );

  return { isLoading, deleteCategory };
};
