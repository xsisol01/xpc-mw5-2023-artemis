import { useQuery } from "react-query"
import { CategoryService } from '@/app/services/category.service';

export const useGetAllCategories = () => {
  const {data: categories, isLoading} = useQuery(
    'category list',
    () => CategoryService.getAll(),
    {
      onError: (error) => {
        console.log(error)
      },
      select: ({data}) => data
    }
  )

  return { categories, isLoading }
}