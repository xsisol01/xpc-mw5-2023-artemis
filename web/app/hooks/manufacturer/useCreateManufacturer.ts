import { useRouter } from 'next/router';
import { notificationType } from '@/app/providers/notificationContextProvider';
import { useContext } from 'react';
import { NotificationContext } from '@/app/providers/notificationContextProvider';
import { useMutation } from "react-query";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { ICreateManufacturer } from "@/app/types/manufacturer.type";

export const useCreateManufacturer = (data: ICreateManufacturer) => {
  const {push} = useRouter()
  const {addMessage} = useContext(NotificationContext)
  const {
    isLoading,
    mutateAsync: createManufacturer,
    isSuccess,
  } = useMutation(
    ["create manufacturer", data],
    (data: ICreateManufacturer) => ManufacturerService.create(data),
    {
      onSuccess: ({data}) => {
        addMessage({
          type: notificationType.success,
          text: "Manufacturer has been created"
        })
        push('/manufacturer/new')
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "manufacturer has not been created"
        })
        console.log(error);
      },
    }
  );

  return { isLoading, createManufacturer, isSuccess };
};
