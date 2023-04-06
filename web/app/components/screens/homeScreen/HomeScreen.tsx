import { FC, memo, useContext } from "react";

import { CircularProgress, Container, Grid } from "@mui/material";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import FilterProduct from "@/app/components/ui/filterProduct/FilterProduct";
import Products from "@/app/components/ui/products/Products";

import { useGetAllProduct } from "@/app/hooks/product/useGetAllProducts";
import { globalStyles } from "@/app/assets/styles/global.styles";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";

const HomeScreen: FC = memo(() => {
  const { products, isLoading } = useGetAllProduct();

  const {setCurrentManufacturer} = useContext(ManufacturerContext)

  setCurrentManufacturer('')

  return (
      <HeaderLayout contentPage="home">
        <Container sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid
                item
                xs={3}
                sx={globalStyles.fullScroll}
            >
                <FilterProduct />
            </Grid>
            <Grid
                item
                xs={9}
                sx={globalStyles.fullScroll}
            >
                {isLoading && <CircularProgress />}
                <Products products={products} isLoading={isLoading} />
            </Grid>
          </Grid>
        </Container>
      </HeaderLayout>
  );
});

export default HomeScreen;
