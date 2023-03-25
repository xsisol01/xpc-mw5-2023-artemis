import { useQuery } from "react-query"
import { ProducerService } from '../../services/producer.service';

export const useGetAllProducers = () => {
  const {data: producers, isLoading} = useQuery(
    'producer list',
    () => ProducerService.getAll(),
    {
      onError: (error) => {
        console.log(error)
      },
      select: ({data}) => data
    }
  )

  return { producers, isLoading }
}