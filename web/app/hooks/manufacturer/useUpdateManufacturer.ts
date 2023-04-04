import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from "react-query";

import { RoleContext } from '@/app/providers/roleContextProvider';
import { ManufacturerService } from '@/app/services/manufacturer.service';
import { IManufacturer } from "@/app/types/manufacturer.type";


export const useUpdateManufacturer = (data: IManufacturer) => {
  const {push} = useRouter()
  const { setIsAdmin} = useContext(RoleContext)

  const { isLoading, mutateAsync } = useMutation(
    ['update manufacturer', data],
    () => ManufacturerService.update(data),
    {
      onSuccess: () => {
        alert('manufacturer has been created')

        setIsAdmin(false)
        
        push(`/manufacturer/${data.id}`)
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  
  return { isLoading, mutateAsync }
}