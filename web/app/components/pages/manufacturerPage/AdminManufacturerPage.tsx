import { FC, memo } from "react";

import { manufacturerPageData } from "./manufacturerPage.data";
import {
  ICreateManufacturer,
  IManufacturer,
} from "@/app/types/manufacturer.type";

import { useUpdateManufacturer } from "@/app/hooks/manufacturer/useUpdateManufacturer";
import RightDeleteButton from "@/app/components/shared/button/deleteButton/RightDeleteButton";
import ManufacturerForm from "@/app/components/shared/form/manufacturerForm/ManufacturerForm";

interface IProps {
  manufacturer?: IManufacturer;
}

const AdminManufacturerPage: FC<IProps> = memo(({ manufacturer }) => {
  const { isLoading, updateManufacturer } = useUpdateManufacturer(
    manufacturerPageData.defaultValues
  );

  const onSubmit = async (data: ICreateManufacturer) => {
    await updateManufacturer({
      ...(manufacturer ?? manufacturerPageData.defaultValues),
      ...data,
    });
  };

  return (
    <>
      <ManufacturerForm
        defaultValues={manufacturer ?? manufacturerPageData.defaultValues}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <RightDeleteButton
        id={manufacturer?.id ?? manufacturerPageData.defaultValues.id}
        elementType="manufacturer"
      />
    </>
  );
});

AdminManufacturerPage.displayName = "AdminManufacturerPage";

export default AdminManufacturerPage;
