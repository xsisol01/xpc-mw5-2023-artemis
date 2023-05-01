import { FC, memo } from "react";

import { Container, Grid } from "@mui/material";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import FilterProduct from "@/app/components/ui/filterProduct/FilterProduct";
import Products from "@/app/components/ui/products/Products";

import { globalStyles } from "@/app/assets/styles/global.styles";
import SearchProduct from "@/app/components/ui/searchProduct/SearchProduct";

const HomeScreen: FC = memo(() => {
  return (
    <HeaderLayout>
        <Grid container spacing={2} sx={{
          '& > .MuiGrid-item': {
            px: 1,
            mx: 0
          }
        }}>
          <Grid item xs={3} sx={globalStyles.fullScroll}>
            <FilterProduct />
          </Grid>
          <Grid item xs={9} sx={globalStyles.fullScroll}>
            <SearchProduct />
            <Products />
          </Grid>
        </Grid>
    </HeaderLayout>
  );
});

HomeScreen.displayName = "HomeScreen";

export default HomeScreen;
