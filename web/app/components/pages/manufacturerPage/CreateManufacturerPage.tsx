import { FC, memo } from "react";
import { SubmitHandler } from "react-hook-form";

import { ICreateManufacturer } from "@/app/types/manufacturer.type";

import { useCreateManufacturer } from "@/app/hooks/manufacturer/useCreateManufacturer";

import { manufacturerPageData } from "@/app/components/pages/manufacturerPage/manufacturerPage.data";
import ManufacturerForm from "../../shared/form/manufacturerForm/ManufacturerForm";

const CreateManufacturerScreen: FC = memo(() => {
  const { defaultValues } = manufacturerPageData;

  const { isLoading, createManufacturer } =
    useCreateManufacturer(defaultValues);

  const onSubmit: SubmitHandler<ICreateManufacturer> = async (
    data: ICreateManufacturer
  ) => {
    await createManufacturer(data);
  };

  return (
    <ManufacturerForm
      defaultValues={manufacturerPageData.defaultValues}
      onSubmit={onSubmit}
      shouldReset={true}
      isLoading={isLoading}
    />
  );
});

CreateManufacturerScreen.displayName = "CreateManufacturerScreen";

export default CreateManufacturerScreen;
