import { FC, memo, useContext } from "react";

import { currencyFormatter } from "@/app/utils/currencyFormatter";
import { IProduct } from "@/app/types/product.type";
import { productPageData } from "./productPage.data";

import Rating from "@/app/components/shared/rating/Rating";
import { Box, capitalize, Grid, Typography } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { globalStyles } from "@/app/assets/styles/global.styles";
import Reviews from "@/app/components/ui/reviews/Reviews";
import Image from "@/app/components/ui/image/Image";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import { CategoryContext } from "@/app/providers/categoryContextProvider";

const ProductInfo: FC<IProduct> = memo(
  ({
    id,
    name,
    price,
    description,
    categoryId,
    reviews,
    imageUrl,
    averageRating,
    manufacturerId,
    weight,
    stockQuantity,
  }) => {
    const { manufacturers } = useContext(ManufacturerContext);
    const { categories } = useContext(CategoryContext);

    const isInStock = stockQuantity > 0;

    return (
      <Grid container spacing={2} sx={{ mt: 1, ...globalStyles.fullScroll }}>
        <Grid item md={6} xs={12}>
          <Image src={imageUrl} alt={name} width={370} height={300} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              {name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 400, p: 1, mr: 2 }}>
                {capitalize(
                  manufacturers?.find((p) => p.id === manufacturerId)?.name ??
                    ""
                )}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                  backgroundColor: "#000",
                  color: "#fff",
                  p: 1,
                  textAlign: "center",
                }}
              >
                {capitalize(
                  categories?.find((p) => p.id === categoryId)?.name ?? ""
                )}
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ mb: 2 }}>
              {currencyFormatter(price)}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Rating rate={averageRating} />
            </Box>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>
              {weight} kg
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              {capitalize(description)}
            </Typography>

            {isInStock ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckIcon sx={{ fontSize: 50, color: "green", mr: 2 }} />
                <Typography sx={{ fontSize: 24, color: "green" }}>
                  {productPageData.inStock}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ClearIcon sx={{ fontSize: 50, color: "red", mr: 2 }} />
                <Typography sx={{ fontSize: 30, color: "red" }}>
                  {productPageData.notInStock}
                </Typography>
              </Box>
            )}
          </Box>

          <Reviews reviews={reviews ?? []} productId={id} />
        </Grid>
      </Grid>
    );
  }
);

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;
