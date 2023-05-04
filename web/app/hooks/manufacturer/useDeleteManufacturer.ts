import { routes } from "@/app/data/routes";
import { notificationType } from "@/app/providers/notificationContextProvider";
import { useContext } from "react";
import { NotificationContext } from "@/app/providers/notificationContextProvider";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { useRouter } from "next/router";

import { useMutation } from "react-query";

export const useDeleteManufacturer = (id: string) => {
  const { addMessage } = useContext(NotificationContext);
  const router = useRouter();
  const { push } = router;

  const { isLoading, mutateAsync: deleteManufacturer } = useMutation(
    ["delete manufacturer", id],
    (id: string) => ManufacturerService.delete(id),
    {
      onSuccess: () => {
        addMessage({
          type: notificationType.success,
          text: "Manufacturer has been deleted",
        });

        push(routes.manufacturer);
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "Manufacturer has not been deleted",
        });
        console.log(error);
      },
    }
  );

  return { isLoading, deleteManufacturer };
};
