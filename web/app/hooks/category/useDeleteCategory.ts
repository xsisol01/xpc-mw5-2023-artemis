import { notificationType } from "@/app/providers/notificationContextProvider";
import { useContext } from "react";
import { NotificationContext } from "@/app/providers/notificationContextProvider";
import { useRouter } from "next/router";

import { useMutation } from "react-query";

import { CategoryService } from "@/app/services/category.service";
import { routes } from "@/app/data/routes";
import { CategoryContext } from "@/app/providers/categoryContextProvider";

export const useDeleteCategory = (id: string) => {
  const { addMessage } = useContext(NotificationContext);
  const { setCategories } = useContext(CategoryContext);
  const router = useRouter();
  const { push } = router;

  const { isLoading, mutateAsync: deleteCategory } = useMutation(
    ["delete category", id],
    (id: string) => CategoryService.delete(id),
    {
      onSuccess: ({ config, data }) => {
        addMessage({
          type: notificationType.success,
          text: "Category has been deleted",
        });

        const urlArr = config.url?.split("/") ?? [];
        const idIndex = urlArr?.length - 1;
        const deletedId = urlArr[idIndex];

        if (deletedId) {
          setCategories((prev) => prev.filter((t) => t.id !== deletedId));
        }

        setTimeout(() => {
          push(routes.category);
        }, 1000);
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
