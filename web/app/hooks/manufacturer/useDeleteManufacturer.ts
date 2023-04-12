import { ManufacturerService } from '@/app/services/manufacturer.service';
import { useRouter } from 'next/router';

import { useMutation } from "react-query";


export const useDeleteManufacturer = (id: string) => {
  const router = useRouter()
  const {push} = router

  const { isLoading, mutateAsync: deleteManufacturer } = useMutation(
    ['delete manufacturer', id],
    (id: string) => ManufacturerService.delete(id),
    {
      onSuccess: () => {
        alert('Manufacturer has been deleted')
        push('/manufacturer')
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )
  
  return { isLoading, deleteManufacturer }
}