import { FC, memo} from "react";

import { manufacturerPageData } from "./manufacturerPage.data";
import {
  ICreateManufacturer,
  IManufacturer,
} from "@/app/types/manufacturer.type";

import { Box } from "@mui/material";
import { useUpdateManufacturer } from "@/app/hooks/manufacturer/useUpdateManufacturer";
import Products from "@/app/components/ui/products/Products";
import RightDeleteButton from "@/app/components/shared/button/deleteButton/RightDeleteButton";
import ManufacturerForm from "../../shared/form/manufacturerForm/ManufacturerForm";

const AdminManufacturerPage: FC<IManufacturer> = memo((props) => {
  const { isLoading, updateManufacturer } = useUpdateManufacturer(
    manufacturerPageData.defaultValues
  );

  const onSubmit = async (
    data: ICreateManufacturer
  ) => {
    await updateManufacturer({ ...props, ...data });
  };

  return (
    <>
      <ManufacturerForm
        defaultValues={props}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <RightDeleteButton id={props.id} elementType="manufacturer" />
    </>
  );
});

AdminManufacturerPage.displayName = "AdminManufacturerPage";

export default AdminManufacturerPage;
