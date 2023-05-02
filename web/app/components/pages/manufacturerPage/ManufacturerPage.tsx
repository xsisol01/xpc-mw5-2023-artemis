import { FC, memo, useContext } from "react";

import {
  capitalize,
  Grid,
  Typography,
} from "@mui/material";
import Image from "@/app/components/ui/image/Image";
import { RoleContext } from "@/app/providers/roleContextProvider";
import AdminManufacturerContent from "@/app/components/pages/manufacturerPage/AdminManufacturerPage";
import { IManufacturer } from "@/app/types/manufacturer.type";

const ManufacturerPage: FC<IManufacturer> = memo((props) => {
  const { isAdmin } = useContext(RoleContext);

  const manufacturer = props

  return (
    <>
      {manufacturer &&
        (isAdmin ? (
          <AdminManufacturerContent {...manufacturer} />
        ) : (
          <Grid container sx={{ mb: 2 }} spacing={2}>
            <Grid item xs={12} md={6}>
              <Image
                src={manufacturer.imageUrl}
                alt="Company logo"
                width={500}
                height={500}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1">
                {capitalize(manufacturer.name)}
              </Typography>
              <Typography variant="h6" component="h3">
                {manufacturer.country}
              </Typography>
              <Typography variant="body1" component="p">
                {manufacturer.description}
              </Typography>
            </Grid>
          </Grid>
        ))}
    </>
  );
});

ManufacturerPage.displayName = "ManufacturerPage";

export default ManufacturerPage;
