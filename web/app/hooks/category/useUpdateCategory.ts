import { useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { RoleContext } from "@/app/providers/roleContextProvider";
import { CategoryService } from "@/app/services/category.service";
import { ICategory } from "@/app/types/category.type";

export const useUpdateCategory = (data: ICategory) => {
  const { isLoading, mutateAsync: updateCategory } = useMutation(
    ["update category", data],
    (data: ICategory) => CategoryService.update(data),
    {
      onSuccess: () => {
        alert("Category has been updated");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { isLoading, updateCategory };
};
