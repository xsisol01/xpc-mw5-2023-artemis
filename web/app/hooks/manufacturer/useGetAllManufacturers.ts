import { useQuery } from "react-query"
import { ManufacturerService } from '../../services/manufacturer.service';

export const useGetAllManufacturers = () => {
  const {data: manufacturers, isLoading} = useQuery(
    'manufacturer list',
    () => ManufacturerService.getAll(),
    {
      onError: (error) => {
        console.log(error)
      },
      select: ({data}) => data
    }
  )

  return { manufacturers, isLoading }
}