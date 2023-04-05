import { useGetManufacturer } from "@/app/hooks/manufacturer/useGetManufacturer";
import { Avatar, Box, CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import Products from "../products/Products";


const ManufacturerContent: FC = () => {
  const {query} = useRouter()
  const {pid} = query
  if (!pid) return <CircularProgress />

  const {manufacturer, isLoading} = useGetManufacturer(pid.toString())

  if (isLoading) {
    return <CircularProgress />
  }

  console.log(manufacturer)

  return manufacturer ? (
    <div>
      <Grid container sx={{mb: 2}}>
        <Grid item xs={12} md={5}>
          <img
            src={manufacturer.imageUrl}
            alt='Company logo'
            loading="lazy"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          pid: {pid}
        </Grid>
      </Grid>

      {manufacturer.products.length ? (
        <Box sx={{borderTop: '1px solid #ccc', pt: 2}}>
          <Products products={manufacturer.products} manufacturer={manufacturer.id} />
        </Box>
      ) : null}
      
      
    </div>
  ) : null
}

export default ManufacturerContent