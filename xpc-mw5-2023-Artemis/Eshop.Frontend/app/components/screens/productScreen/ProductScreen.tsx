import { FC, memo, useContext } from "react";

import { RoleContext } from "@/app/providers/roleContextProvider";

import AdminProductInfo from "@/app/components/pages/productPage/AdminProductInfo";
import ProductInfo from "@/app/components/pages/productPage/ProductInfo";
import { IProduct } from "@/app/types/product.type";

interface IProps {
  product: IProduct;
}

const ProductScreen: FC<IProps> = memo(({ product }) => {
  const { isAdmin } = useContext(RoleContext);

  return isAdmin ? (
    <AdminProductInfo {...product} />
  ) : (
    <ProductInfo {...product} />
  );
});

ProductScreen.displayName = "ProductScreen";

export default ProductScreen;
