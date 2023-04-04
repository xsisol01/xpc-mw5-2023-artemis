import { ManufacturerService } from '@/app/services/manufacturer.service';
import { useQuery } from "react-query"

export const useGetManufacturer = (id: string | undefined) => {
  const {data: manufacturer, isLoading} = useQuery(
    ['manufacturer', id],
    () => ManufacturerService.get(id || ''),
    {
      onError: (error) => {
        console.log(error)
      },
      select: ({data}) => data,
      enabled: !!id
    }
  )

  return { manufacturer, isLoading }
}