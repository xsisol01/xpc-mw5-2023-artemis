import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from "react-query";

import { RoleContext } from '@/app/providers/roleContextProvider';
import { ProductService } from '@/app/services/product.service';
import { IProduct } from "@/app/types/product.type";


export const useUpdateProduct = (data: IProduct) => {
  const {push} = useRouter()
  const { setIsAdmin} = useContext(RoleContext)

  const { isLoading, mutateAsync } = useMutation(
    ['update product', data],
    () => ProductService.update(data),
    {
      onSuccess: () => {
        alert('Product has been created')

        setIsAdmin(false)
        
        push(`/product/${data.id}`)
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  
  return { isLoading, mutateAsync }
}