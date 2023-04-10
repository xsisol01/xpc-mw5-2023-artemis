import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from "react-query";

import { RoleContext } from '@/app/providers/roleContextProvider';
import { ManufacturerService } from '@/app/services/manufacturer.service';
import { ICreateManufacturer } from "@/app/types/manufacturer.type";


export const useCreateManufacturer = (data: ICreateManufacturer) => {
  const {push} = useRouter()
  const {setIsAdmin} = useContext(RoleContext)

  const { isLoading, mutateAsync: createManufacturer, isSuccess } = useMutation(
    ['create manufacturer', data],
    (data: ICreateManufacturer) => ManufacturerService.create(data),
    {
      onSuccess: () => {
        alert('manufacturer has been created')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  
    return { isLoading, createManufacturer, isSuccess }
}