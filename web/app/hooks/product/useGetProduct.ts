import { IProduct } from '@/app/types/product.type';
import { ProductService } from '../../services/product.service';
import { useQuery } from "react-query"

interface IData {
  product: IProduct | undefined
  isLoading: boolean
}

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

  return { product, isLoading } as IData
}