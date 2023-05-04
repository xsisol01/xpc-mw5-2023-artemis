import {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  FC,
  memo,
} from "react";
import { ICategory } from "@/app/types/category.type";

interface IContext {
  categories: ICategory[];
  setCategories: Dispatch<SetStateAction<ICategory[]>>;
}

export const CategoryContext = createContext<IContext>({} as IContext);

interface IProps {
  children: React.ReactNode;
}

const CategoryContextProvider: FC<IProps> = memo(({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[]);

  const value = useMemo(
    () => ({
      setCategories,
      categories,
    }),
    [categories]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
});

CategoryContextProvider.displayName = "CategoryContextProvider";

export default CategoryContextProvider;
