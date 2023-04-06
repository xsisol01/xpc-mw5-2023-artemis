import { useMutation } from "react-query";

import { ManufacturerService } from '@/app/services/manufacturer.service';
import { IManufacturer } from "@/app/types/manufacturer.type";


export const useUpdateManufacturer = (data: IManufacturer) => {

  const { isLoading, mutateAsync: updateManufacturer } = useMutation(
    ['update manufacturer', data],
    (data: IManufacturer) => ManufacturerService.update(data),
    {
      onSuccess: () => {
        alert('manufacturer has been updated')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  
  return { isLoading, updateManufacturer }
}