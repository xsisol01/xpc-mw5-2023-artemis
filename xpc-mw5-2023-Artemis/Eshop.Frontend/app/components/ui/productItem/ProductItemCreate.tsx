import { FC, memo } from "react";

import classNames from "classnames";

import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import { Card, Grid } from "@mui/material";

import styles from "./productItem.module.scss";
import { routes } from "@/app/data/routes";

const ProductItemCreate: FC = memo(() => {
  return (
    <Grid item xs={12} md={3} sm={6}>
      <Card sx={{ height: "100%" }}>
        <Link
          href={`${routes.product}/new`}
          className={classNames({
            [styles.productItem__placeholder]: true,
          })}
        >
          <TiPlus className={styles.productItem__placeholderIcon} />
        </Link>
      </Card>
    </Grid>
  );
});

ProductItemCreate.displayName = "ProductItemCreate";

export default ProductItemCreate;
