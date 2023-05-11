import { FC, memo, useContext } from "react";

import { RoleContext } from "@/app/providers/roleContextProvider";
import { IManufacturer } from "@/app/types/manufacturer.type";

import AdminManufacturerPage from "@/app/components/pages/manufacturerPage/AdminManufacturerPage";
import ManufacturerPage from "@/app/components/pages/manufacturerPage/ManufacturerPage";
import { Box } from "@mui/material";
import Products from "@/app/components/ui/products/Products";

interface IProps {
  manufacturer?: IManufacturer;
}

const ManufacturerScreen: FC<IProps> = memo(({ manufacturer }) => {
  const { isAdmin } = useContext(RoleContext);

  return (
    <>
      {!manufacturer && <ManufacturerPage manufacturer={manufacturer} />}
      {manufacturer && isAdmin && (
        <AdminManufacturerPage manufacturer={manufacturer} />
      )}
      {manufacturer && !isAdmin && (
        <ManufacturerPage manufacturer={manufacturer} />
      )}
      {manufacturer && (
        <Box sx={{ borderTop: "1px solid #ccc", pt: 2, mt: 1 }}>
          <Products />
        </Box>
      )}
    </>
  );
});

ManufacturerScreen.displayName = "ManufacturerScreen";

export default ManufacturerScreen;
