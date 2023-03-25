import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from "react-query";

import { RoleContext } from '@/app/providers/roleContextProvider';
import { ProducerService } from '@/app/services/producer.service';
import { IProducer } from "@/app/types/producer.type";


export const useUpdateProducer = (data: IProducer) => {
  const {push} = useRouter()
  const { setIsAdmin} = useContext(RoleContext)

  const { isLoading, mutateAsync } = useMutation(
    ['update producer', data],
    () => ProducerService.update(data),
    {
      onSuccess: () => {
        alert('Producer has been created')

        setIsAdmin(false)
        
        push(`/producer/${data.id}`)
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  
  return { isLoading, mutateAsync }
}