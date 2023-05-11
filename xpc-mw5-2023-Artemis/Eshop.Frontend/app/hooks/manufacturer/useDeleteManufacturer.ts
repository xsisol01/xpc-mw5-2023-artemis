import { routes } from "@/app/data/routes";
import { notificationType } from "@/app/providers/notificationContextProvider";
import { useContext } from "react";
import { NotificationContext } from "@/app/providers/notificationContextProvider";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { useRouter } from "next/router";

import { useMutation } from "react-query";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";

export const useDeleteManufacturer = (id: string) => {
  const { addMessage } = useContext(NotificationContext);
  const { setManufacturers } = useContext(ManufacturerContext);
  const router = useRouter();
  const { push } = router;

  const { isLoading, mutateAsync: deleteManufacturer } = useMutation(
    ["delete manufacturer", id],
    (id: string) => ManufacturerService.delete(id),
    {
      onSuccess: ({ config, data }) => {
        addMessage({
          type: notificationType.success,
          text: "Manufacturer has been deleted",
        });

        const urlArr = config.url?.split("/") ?? [];
        const idIndex = urlArr?.length - 1;
        const deletedId = urlArr[idIndex];

        if (deletedId) {
          setManufacturers((prev) => prev.filter((t) => t.id !== deletedId));
        }

        setTimeout(() => {
          push(routes.manufacturer);
        }, 1000);
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
