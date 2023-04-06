import { FC, memo, useContext } from "react";

import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";

import { CircularProgress, Grid, List } from "@mui/material";
import { RoleContext } from "@/app/providers/roleContextProvider";
import AddManufacturer from "@/app/components/ui/manufacturerItem/AddManufacturer";
import ManufacturerItem from "@/app/components/ui/manufacturerItem/ManufacturerItem";

const Manufacturers: FC = memo(() => {
  const { isAdmin } = useContext(RoleContext);
  const { manufacturers, isLoading } = useGetAllManufacturers();

  return (
    <List
      component="ul"
      sx={{
        height: "90vh",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        "& ul": { padding: 0 },
      }}
    >
      {isAdmin && <AddManufacturer />}
      {isLoading && <CircularProgress />}
      {manufacturers?.map((manufacturer) => (
        <ManufacturerItem key={manufacturer.id} {...manufacturer} />
      ))}
    </List>
  );
});

export default Manufacturers;
