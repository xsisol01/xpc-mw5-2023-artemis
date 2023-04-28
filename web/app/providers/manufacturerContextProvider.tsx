import {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  FC,
  memo,
} from "react";
import { IManufacturer } from "../types/manufacturer.type";

interface IContext {
  manufacturers: IManufacturer[];
  setManufacturers: Dispatch<SetStateAction<IManufacturer[]>>;
}

export const ManufacturerContext = createContext<IContext>({} as IContext);

interface IProps {
  children: React.ReactNode;
}

const ManufacturerContextProvider: FC<IProps> = memo(({ children }) => {
  const [manufacturers, setManufacturers] = useState<IManufacturer[]>([] as IManufacturer[]);

  const value = useMemo(
    () => ({
      setManufacturers,
      manufacturers,
    }),
    [manufacturers]
  );

  return (
    <ManufacturerContext.Provider value={value}>
      {children}
    </ManufacturerContext.Provider>
  );
});

ManufacturerContextProvider.displayName = "ManufacturerContextProvider";

export default ManufacturerContextProvider;
