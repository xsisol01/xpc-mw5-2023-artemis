import { useMutation } from "react-query";
import { ManufacturerService } from "@/app/services/manufacturer.service";
import { ICreateManufacturer } from "@/app/types/manufacturer.type";

export const useCreateManufacturer = (data: ICreateManufacturer) => {
  const {
    isLoading,
    mutateAsync: createManufacturer,
    isSuccess,
  } = useMutation(
    ["create manufacturer", data],
    (data: ICreateManufacturer) => ManufacturerService.create(data),
    {
      onSuccess: () => {
        alert("manufacturer has been created");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { isLoading, createManufacturer, isSuccess };
};
