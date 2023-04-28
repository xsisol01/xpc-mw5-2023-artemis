import { ICreateCategory } from "../../types/category.type";

import { useMutation } from "react-query";

import { CategoryService } from "@/app/services/category.service";

export const useCreateCategory = (data: ICreateCategory) => {
  const {
    isLoading,
    mutateAsync: createCategory,
    isSuccess,
  } = useMutation(
    ["create category", data],
    (data: ICreateCategory) => CategoryService.create(data),
    {
      onSuccess: () => {
        alert("Category has been created");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { isLoading, createCategory, isSuccess };
};
