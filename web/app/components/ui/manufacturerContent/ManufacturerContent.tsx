import { FC, memo } from "react";

import { IManufacturer } from "@/app/types/manufacturer.type";

import { Box, capitalize, Grid, Typography } from "@mui/material";
import Products from "@/app/components/ui/products/Products";


const ManufacturerContent: FC<IManufacturer> = memo(({
  name, imageUrl, country, description, products, id
}) => {


  return (
    <div>
      <Grid container sx={{mb: 2}}>
        <Grid item xs={12} md={5}>
          <img
            src={imageUrl}
            alt='Company logo'
            loading="lazy"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h4" component='h1'>
            {capitalize(name)}
          </Typography >
          <Typography variant="h6" component='h3'>
            {country}
          </Typography>
          <Typography variant="body1" component='p'>
            {description}
          </Typography>
        </Grid>
      </Grid>

      {products.length ? (
        <Box sx={{borderTop: '1px solid #ccc', pt: 2}}>
          <Products products={products} manufacturer={id} />
        </Box>
      ) : null}
    </div>
  )
})

export default ManufacturerContent