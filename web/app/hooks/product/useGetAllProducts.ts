import { useQuery } from "react-query"
import { ProductService } from '../../services/product.service';

export const useGetAllProduct = () => {
  const {data: products, isLoading} = useQuery(
    'product list',
    () => ProductService.getAll(),
    {
      onError: (error) => {
        console.log(error)
      },
      select: ({data}) => data
    }
  )

  return { products, isLoading }
}