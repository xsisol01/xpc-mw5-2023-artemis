import { CategoryService } from "@/app/services/category.service";
import { useQuery } from "react-query";

export const useGetCategory = (id: string | undefined) => {
  const { data: category, isLoading } = useQuery(
    ["category", id],
    () => CategoryService.get(id || ""),
    {
      onError: (error) => {
        console.log(error);
      },
      select: (data) => data,
      enabled: !!id,
    }
  );

  return { category, isLoading };
};
