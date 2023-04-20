import { FC, memo, useContext } from "react";

import { CircularProgress, Container, Grid } from "@mui/material";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import FilterProduct from "@/app/components/ui/filterProduct/FilterProduct";
import Products from "@/app/components/ui/products/Products";

import { useGetAllProducts } from "@/app/hooks/product/useGetAllProducts";
import { globalStyles } from "@/app/assets/styles/global.styles";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import SearchProduct from "../../ui/searchProduct/SearchProduct";

const HomeScreen: FC = memo(() => {
  const { products, isLoading } = useGetAllProducts();
  const { setCurrentManufacturer } = useContext(ManufacturerContext);

  setCurrentManufacturer("");

  return (
    <HeaderLayout contentPage="home">
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3} sx={globalStyles.fullScroll}>
            <FilterProduct />
          </Grid>
          <Grid item xs={9} sx={globalStyles.fullScroll}>
            <SearchProduct />
            {isLoading && <CircularProgress />}
            {!isLoading && (
              <Products products={products} isLoading={isLoading} />
            )}
          </Grid>
        </Grid>
      </Container>
    </HeaderLayout>
  );
});

export default HomeScreen;
