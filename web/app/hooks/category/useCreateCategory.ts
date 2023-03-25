import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from "react-query";

import { RoleContext } from '@/app/providers/roleContextProvider';
import { CategoryService } from '@/app/services/category.service';
import { ICategory } from "@/app/types/category.type";


export const useCreateCategory = (data: ICategory) => {
  const {push} = useRouter()
  const {setIsAdmin} = useContext(RoleContext)

  const { isLoading, mutateAsync } = useMutation(
    ['create category', data],
    () => CategoryService.create(data),
    {
      onSuccess: () => {
        alert('Category has been created')
        setIsAdmin(false)
        push(`/category/${data.id}`)
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  
    return { isLoading, mutateAsync }
}