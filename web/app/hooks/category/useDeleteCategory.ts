import { useRouter } from "next/router";

import { useMutation } from "react-query";

import { CategoryService } from "@/app/services/category.service";

export const useDeleteCategory = (id: string) => {
  const router = useRouter();
  const { push } = router;

  const { isLoading, mutateAsync: deleteCategory } = useMutation(
    ["delete category", id],
    (id: string) => CategoryService.delete(id),
    {
      onSuccess: () => {
        alert("Category has been deleted");
        push("/category");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { isLoading, deleteCategory };
};
