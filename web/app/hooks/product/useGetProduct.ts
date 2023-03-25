import { ProductService } from './../../services/product.service';
import { useQuery } from "react-query"


export const useGetProduct = (id: string | undefined) => {
  const {data: product, isLoading} = useQuery(
    ['product', id],
    () => ProductService.get(id || ''),
    {
      onError: (error) => {
        console.log(error)
      },
      select: ({data}) => data,
      enabled: !!id
    }
  )

  return { product, isLoading }
}