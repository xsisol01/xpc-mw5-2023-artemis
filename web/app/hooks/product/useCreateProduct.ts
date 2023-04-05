import { ICreateProduct } from '@/app/types/product.type';

import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from "react-query";

import { RoleContext } from '@/app/providers/roleContextProvider';
import { ProductService } from '@/app/services/product.service';
import { IProduct } from "@/app/types/product.type";


export const useCreateProduct = (data: ICreateProduct) => {
  const {push} = useRouter()
  const {setIsAdmin} = useContext(RoleContext)

  const { isLoading, mutateAsync: createProduct } = useMutation(
    ['create product', data],
    (data: ICreateProduct) => ProductService.create(data),
    {
      onSuccess: () => {
        alert('Product has been created')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  
    return { isLoading, createProduct }
}