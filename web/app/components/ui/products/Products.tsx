import { useContext, FC, memo } from "react";

import { RoleContext } from "@/app/providers/roleContextProvider";
import { IProduct } from "@/app/types/product.type";
import { productsData } from "./products.data";

import { Grid, Typography } from "@mui/material";
import ProductItemPlaceholder from "@/app/components/ui/productItem/ProductItemCreate";
import ProductItemCreate from "@/app/components/ui/productItem/ProductItemCreate";
import ProductItem from "@/app/components/ui/productItem/ProductItem";
import { ProductContext } from "@/app/providers/productContextProvider";
import { UrlSearchParamsContext } from "@/app/providers/urlSearchParamsProvider";
import { filterProduct } from "@/app/utils/productFilter";

const Products: FC = memo(() => {
  const { isAdmin } = useContext(RoleContext);

  const { products } = useContext(ProductContext);
  const { allParams } = useContext(UrlSearchParamsContext);

  return (
    <>
      {!!products && products?.length === 0 && (
        <Typography variant="h4" sx={{ textAlign: "center", mb: 1 }}>
          {productsData.empty}
        </Typography>
      )}
      {!!products && products?.length > 0 && (
        <Grid container spacing={2}>
          <>
            {isAdmin && <ProductItemCreate />}
            {filterProduct(products, allParams)?.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </>
        </Grid>
      )}
    </>
  );
});

Products.displayName = "Products";

export default Products;
