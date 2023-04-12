import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from "react-query";

import { RoleContext } from '@/app/providers/roleContextProvider';
import { ProductService } from '@/app/services/product.service';
import { IProduct } from "@/app/types/product.type";


export const useDeleteProduct = (id: string) => {
  const router = useRouter()
  const {push} = router

  const { isLoading, mutateAsync: deleteProduct } = useMutation(
    ['delete product', id],
    (id: string) => ProductService.delete(id),
    {
      onSuccess: () => {
        alert('Product has been deleted')

        push('/')
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )
  
  return { isLoading, deleteProduct }
}