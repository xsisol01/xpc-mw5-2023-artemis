import { FC, memo } from "react";

import { currencyFormatter } from "@/app/utils/currencyFormatter";
import Rating from "@/app/components/shared/rating/Rating";

import Dropdown from "@/app/components/shared/dropdown/Dropdown";

import { productPageData } from "./productPage.data";

import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { IProduct } from "@/app/types/product.type";
import {
  Box,
  capitalize,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { globalStyles } from "@/app/assets/styles/global.styles";

const ProductInfo: FC<IProduct> = memo(
  ({
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
    const { manufacturers } = useGetAllManufacturers();
    const { categories } = useGetAllCategories();

    const isInStock = stockQuantity > 0;

    return (
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item md={6} xs={12}>
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            style={{ maxHeight: "500px" }}
          />
        </Grid>
        <Grid item md={6} xs={12} sx={globalStyles.fullScroll}>
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

          <Box>
            <Dropdown
              contentHeight={0}
              wrapperHeight={0}
              wrapperWidth={0}
              title={productPageData.reviews}
            >
              {reviews.map((review) => (
                <Card key={review.id} sx={{ mb: 1 }}>
                  <CardHeader title={review.title} sx={{ pb: 1 }} />
                  <CardContent sx={{ pt: 1 }}>
                    <Box sx={{ mb: 2 }}>
                      <Rating rate={review.stars} />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {capitalize(review.description)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Dropdown>
          </Box>
        </Grid>
      </Grid>
    );
  }
);

export default ProductInfo;
