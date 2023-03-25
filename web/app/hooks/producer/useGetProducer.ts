import { ProducerService } from '../../services/producer.service';
import { useQuery } from "react-query"

export const useGetProducer = (id: string | undefined) => {
  const {data: producer, isLoading} = useQuery(
    ['producer', id],
    () => ProducerService.get(id || ''),
    {
      onError: (error) => {
        console.log(error)
      },
      select: ({data}) => data,
      enabled: !!id
    }
  )

  return { producer, isLoading }
}