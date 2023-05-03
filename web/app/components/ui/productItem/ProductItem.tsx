import { FC, memo, useContext } from "react";

import { IProduct } from "@/app/types/product.type";

import Link from "next/link";
import Rating from "@/app/components/shared/rating/Rating";
import StockChecker from "@/app/components/shared/inStockChecker/StockChecker";
import DeleteButton from "@/app/components/shared/button/deleteButton/DeleteButton";
import { FaTimes } from "react-icons/fa";
import {
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { RoleContext } from "@/app/providers/roleContextProvider";

import styles from "./productItem.module.scss";

const ProductItem: FC<IProduct> = memo(
  ({ id, name, imageUrl, price, averageRating, stockQuantity }) => {
    const { isAdmin } = useContext(RoleContext);
    const isInStock = stockQuantity > 0;

    return (
      <Grid item xs={12} md={3} sm={6}>
        <Link
            href={{
              pathname: "/product/[pid]",
              query: { pid: id },
            }}
            className={styles.productItem}
          >
        <Card sx={{ height: "100%", position: "relative" }}>
            <CardMedia
              component="img"
              height="140"
              image={imageUrl || '/imagePlaceholder.png'}
              alt={''}
              sx={{
                backgroundImage: `url(/imagePlaceholder.png)`,
                minHeight: '140px'
              }}
            />
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="body1" component="h4">
              {capitalize(name)}
            </Typography>

            <Typography
              variant="subtitle1"
              component="h3"
              sx={{ fontWeight: 700 }}
            >
              {price?.toLocaleString("cs-CZ", {
                style: "currency",
                currency: "CZK",
              })}
            </Typography>
          </CardContent>

          <CardActions>
            <Rating rate={averageRating} size="small" />
          </CardActions>

          {isAdmin ? (
            <DeleteButton
              id={id}
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                border: "none",
              }}
              elementType="product"
            >
              <FaTimes className={styles.productItem__deleteIcon} />
            </DeleteButton>
          ) : (
            <StockChecker
              isInStock={isInStock}
              className={styles.productItem__stockChecker}
            />
          )}
        </Card>
        </Link>
      </Grid>
    );
  }
);

ProductItem.displayName = "ProductItem";

export default ProductItem;
