import { routes } from '@/app/data/routes';
import { useRouter } from 'next/router';
import { notificationType } from '@/app/providers/notificationContextProvider';
import { useContext } from 'react';
import { NotificationContext } from '@/app/providers/notificationContextProvider';
import { useMutation } from "react-query";

import { ManufacturerService } from "@/app/services/manufacturer.service";
import { IManufacturer } from "@/app/types/manufacturer.type";

export const useUpdateManufacturer = (data: IManufacturer) => {
  const {push} = useRouter()
  const {addMessage} = useContext(NotificationContext)

  const { isLoading, mutateAsync: updateManufacturer } = useMutation(
    ["update manufacturer", data],
    (data: IManufacturer) => ManufacturerService.update(data),
    {
      onSuccess: ({config}) => {
        addMessage({
          type: notificationType.success,
          text: "manufacturer has been updated"
        })

        const parsedData = JSON.parse(config.data)

        push(`${routes.manufacturer}/${parsedData.id}`)
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "manufacturer has not been updated"
        })
        console.log(error);
      },
    }
  );

  return { isLoading, updateManufacturer };
};
