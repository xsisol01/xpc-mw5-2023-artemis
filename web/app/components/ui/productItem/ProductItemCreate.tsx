import { FC, memo } from "react";

import classNames from "classnames";

import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import { Card, Grid } from "@mui/material";

import styles from "./productItem.module.scss";

interface IProps {
  manufacturer?: string;
}

type THref = {
  pathname: string;
  query?: {
    manufacturer: string;
  };
};

const ProductItemCreate: FC<IProps> = memo(({ manufacturer }) => {
  let href: THref = {
    pathname: "/product/new",
  };

  if (manufacturer) {
    href = { ...href, query: { manufacturer } };
  }

  return (
    <Grid item xs={12} md={3} sm={6}>
      <Card sx={{ height: "100%" }}>
        <Link
          href={href}
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
