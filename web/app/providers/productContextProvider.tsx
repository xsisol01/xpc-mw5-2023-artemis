import {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  FC,
  memo,
} from "react";

import { IProduct } from "../types/product.type";

interface IContext {
  products: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
}

export const ProductContext = createContext<IContext>({} as IContext);

interface IProps {
  children: React.ReactNode;
}

const ProductContextProvider: FC<IProps> = memo(({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([] as IProduct[]);

  const value = useMemo(
    () => ({
      setProducts,
      products,
    }),
    [products]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
});

ProductContextProvider.displayName = "ProductContextProvider";

export default ProductContextProvider;
